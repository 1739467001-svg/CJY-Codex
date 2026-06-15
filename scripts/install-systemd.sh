#!/usr/bin/env bash
#
# Install/refresh the CJY portfolio as a persistent systemd service.
# Usage: bash scripts/install-systemd.sh [PORT]   (needs passwordless sudo)
#
set -euo pipefail

PORT="${1:-8092}"
DIR="${CJY_DIR:-$HOME/CJY-Codex}"
USER_NAME="$(whoami)"
NODE_BIN="$(command -v node)"

sudo tee /etc/systemd/system/cjy-site.service >/dev/null <<EOF
[Unit]
Description=CJY Portfolio
After=network.target

[Service]
WorkingDirectory=$DIR
Environment=PORT=$PORT
Environment=HOST=0.0.0.0
ExecStart=$NODE_BIN server.js
Restart=always
RestartSec=2
User=$USER_NAME

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable cjy-site
sudo systemctl restart cjy-site

# Open the host firewall if ufw is active (cloud security group is separate).
if sudo ufw status 2>/dev/null | grep -q "Status: active"; then
  sudo ufw allow "${PORT}/tcp" || true
fi

sleep 2
echo "cjy-site active: $(systemctl is-active cjy-site)"
