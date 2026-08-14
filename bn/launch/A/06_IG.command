#!/bin/zsh

set -u

readonly FSS_LAUNCH_DIR="${0:A:h}"
readonly FSS_ROOT="${FSS_LAUNCH_DIR:h:h:h}"
readonly FSS_HOST="127.0.0.1"
readonly FSS_PORT="4173"
readonly FSS_BASE_URL="http://${FSS_HOST}:${FSS_PORT}"
readonly FSS_VIEWER_PATH="/bn/launch/viewer.html"
readonly FSS_VIEWER_URL="${FSS_BASE_URL}${FSS_VIEWER_PATH}"
readonly FSS_A06_URL="${FSS_VIEWER_URL}?type=A&bn=06_IG"
readonly FSS_VIEWER_MARKER='data-fss-bn-viewer="true"'
readonly FSS_PYTHON="/usr/bin/python3"
readonly FSS_CURL="/usr/bin/curl"
readonly FSS_GREP="/usr/bin/grep"
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

viewer_is_ready() {
  "${FSS_CURL}" --silent --fail --max-time 1 "${FSS_VIEWER_URL}" 2>/dev/null |
    "${FSS_GREP}" --fixed-strings --quiet "${FSS_VIEWER_MARKER}"
}

open_a06_viewer() {
  if ! "${FSS_OPEN}" "${FSS_A06_URL}"; then
    echo "FSS BN Viewer 已啟動，但無法自動開啟瀏覽器。"
    echo "請開啟：${FSS_A06_URL}"
    return 1
  fi
}

trap stop_fss_server EXIT INT TERM HUP

if viewer_is_ready; then
  open_a06_viewer || pause_before_exit
  exit
fi

if "${FSS_CURL}" --silent --max-time 1 "${FSS_BASE_URL}/" >/dev/null 2>&1; then
  echo "Port 4173 已被其他程式占用，無法啟動 FSS BN Viewer。"
  pause_before_exit
  exit 1
fi

if [[ ! -x "${FSS_PYTHON}" ]]; then
  echo "找不到 macOS 的 Python 3，無法啟動 FSS BN Viewer。"
  pause_before_exit
  exit 1
fi

if ! cd "${FSS_ROOT}"; then
  echo "無法切換到 FSS Repository root。"
  pause_before_exit
  exit 1
fi

"${FSS_PYTHON}" -m http.server "${FSS_PORT}" --bind "${FSS_HOST}" &
fss_server_pid=$!

fss_server_ready=false
for _ in {1..50}; do
  if viewer_is_ready; then
    fss_server_ready=true
    break
  fi

  if ! kill -0 "${fss_server_pid}" 2>/dev/null; then
    break
  fi

  sleep 0.1
done

if [[ "${fss_server_ready}" != true ]]; then
  echo "Port 4173 已被其他程式占用，無法啟動 FSS BN Viewer。"
  pause_before_exit
  exit 1
fi

if ! open_a06_viewer; then
  pause_before_exit
  exit 1
fi

echo
echo "FSS BN Viewer 已啟動：${FSS_A06_URL}"
echo "按 Control-C 或關閉此視窗即可停止 Server。"
echo

wait "${fss_server_pid}"
