#!/bin/zsh

set -u

readonly FSS_SCRIPT_DIR="${0:A:h}"
readonly FSS_HOST="127.0.0.1"
readonly FSS_PORT="4173"
readonly FSS_URL="http://${FSS_HOST}:${FSS_PORT}/"
readonly FSS_PYTHON="/usr/bin/python3"
readonly FSS_CURL="/usr/bin/curl"
readonly FSS_OPEN="/usr/bin/open"

fss_server_pid=""

stop_fss_server() {
  if [[ -n "${fss_server_pid}" ]] && kill -0 "${fss_server_pid}" 2>/dev/null; then
    kill "${fss_server_pid}" 2>/dev/null
    wait "${fss_server_pid}" 2>/dev/null
  fi
}

pause_before_exit() {
  echo
  read -r "?按 Enter 關閉視窗…"
}

trap stop_fss_server EXIT INT TERM HUP

if ! cd "${FSS_SCRIPT_DIR}"; then
  echo "無法切換到 FSS 根目錄。"
  pause_before_exit
  exit 1
fi

if [[ ! -x "${FSS_PYTHON}" ]]; then
  echo "找不到 macOS 的 Python 3，無法啟動本機 HTTP Server。"
  pause_before_exit
  exit 1
fi

"${FSS_PYTHON}" -m http.server "${FSS_PORT}" --bind "${FSS_HOST}" &
fss_server_pid=$!

fss_server_ready=false

for _ in {1..50}; do
  if "${FSS_CURL}" --silent --fail --max-time 1 "${FSS_URL}" >/dev/null 2>&1; then
    fss_server_ready=true
    break
  fi

  if ! kill -0 "${fss_server_pid}" 2>/dev/null; then
    break
  fi

  sleep 0.1
done

if [[ "${fss_server_ready}" != true ]]; then
  echo
  echo "無法啟動 FSS 本機 HTTP Server。請確認連接埠 ${FSS_PORT} 未被其他程式使用。"
  pause_before_exit
  exit 1
fi

if ! "${FSS_OPEN}" "${FSS_URL}"; then
  echo
  echo "Server 已啟動，但無法自動開啟預設瀏覽器。"
  echo "請手動開啟：${FSS_URL}"
fi

echo
echo "FSS 本機 HTTP Server 已啟動：${FSS_URL}"
echo "關閉此視窗或按 Control-C 即可停止 Server。"
echo

wait "${fss_server_pid}"
