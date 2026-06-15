#!/usr/bin/env bash
#
# Deploy the CJY portfolio on a Linux server as a zero-dependency static site.
# Usage:  bash scripts/deploy-server.sh [PORT]
# Default port: 8090 (auto-skips to the next free port in 8090-8099 if taken).
#
set -euo pipefail

REPO="https://github.com/1739467001-svg/CJY-Codex.git"
DIR="${CJY_DIR:-$HOME/CJY-Codex}"
START_PORT="${1:-8090}"

command -v node >/dev/null 2>&1 || {
  echo "Node.js not found. Install Node 18+ first, e.g.:"
  echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
  exit 1
}

# Find a free port (TCP connect test, no extra tooling required).
port_free() { ! (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null; }
PORT="$START_PORT"
for _ in $(seq 0 9); do
  port_free "$PORT" && break
  PORT=$((PORT + 1))
done

# Clone or update the repo.
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" pull --ff-only
else
  git clone "$REPO" "$DIR"
fi
cd "$DIR"

# Stop a previous instance started by this script, if any.
if [ -f "$DIR/.serverpid" ] && kill -0 "$(cat "$DIR/.serverpid")" 2>/dev/null; then
  kill "$(cat "$DIR/.serverpid")" 2>/dev/null || true
  sleep 1
fi

# Start detached so it survives logout.
nohup env PORT="$PORT" HOST=0.0.0.0 node server.js > "$DIR/site.log" 2>&1 &
echo $! > "$DIR/.serverpid"
echo "$PORT" > "$DIR/.serverport"
sleep 1

IP="$(curl -fsS --max-time 4 ifconfig.me 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}')"
echo "----------------------------------------------------------------"
echo "CJY portfolio is running."
echo "  port : $PORT"
echo "  pid  : $(cat "$DIR/.serverpid")"
echo "  log  : $DIR/site.log"
echo "  url  : http://${IP:-<server-ip>}:$PORT"
echo "Remember to open this port in your cloud security group / firewall."
echo "----------------------------------------------------------------"
