#!/usr/bin/env bash
# 筑见装修咨询服务智能平台 —— 腾讯云轻量应用服务器环境初始化脚本
# 适用系统：Ubuntu 22.04 / 24.04 LTS（腾讯云轻量镜像选 Ubuntu 22.04 即可）
# 用法：把本文件传到服务器后执行  sudo bash install-server.sh
#
# 脚本做四件事：装 JDK17 → 装 MySQL8 并建库建账号 → 建目录和配置文件 → 写好 systemd 服务
# 脚本不负责上传 jar，上传完再 systemctl start（最后会打印提示）

set -uo pipefail

APP_NAME="zhujian"
APP_DIR="/opt/zhujian"
ENV_DIR="/etc/zhujian"
ENV_FILE="/etc/zhujian/zhujian.env"
DB_NAME="zhujian"
DB_USER="zhujian"
APP_PORT="8080"

GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { printf "\n${GREEN}[%s]${NC} %s\n" "$1" "$2"; }
warn() { printf "\n${YELLOW}[注意]${NC} %s\n" "$1"; }
die()  { printf "\n${RED}[错误]${NC} %s\n" "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "请用 root 运行：sudo bash install-server.sh"

# ---------------------------------------------------------------- 1. JDK
log "1/5" "安装 OpenJDK 17（约 1 分钟）"
apt-get update -y >/dev/null 2>&1
apt-get install -y openjdk-17-jdk-headless >/dev/null 2>&1 || die "JDK 安装失败，检查 apt 源或网络"
java -version 2>&1 | head -n 1

# ---------------------------------------------------------------- 2. MySQL
log "2/5" "安装并启动 MySQL 8"
apt-get install -y mysql-server >/dev/null 2>&1 || die "MySQL 安装失败"
systemctl enable --now mysql >/dev/null 2>&1
sleep 3
systemctl is-active --quiet mysql || die "MySQL 未启动，执行 systemctl status mysql 查看原因"
mysql --version

# 生成随机密码（已存在配置文件则复用旧密码，避免重跑脚本后密码不匹配）
DB_PASS="$(openssl rand -hex 12)"
if [ -f "$ENV_FILE" ]; then
  OLD_PASS="$(grep '^DB_PASSWORD=' "$ENV_FILE" 2>/dev/null | cut -d= -f2-)"
  [ -n "${OLD_PASS:-}" ] && DB_PASS="$OLD_PASS"
fi

log "3/5" "创建数据库 ${DB_NAME} 与专用账号 ${DB_USER}"
mysql -uroot <<SQL || die "建库失败"
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
ALTER USER '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL

# ---------------------------------------------------------------- 3. 目录与配置
log "4/5" "创建应用目录与配置文件"
mkdir -p "$APP_DIR" "$ENV_DIR"
chmod 700 "$ENV_DIR"

cat > "$ENV_FILE" <<ENV
# 筑见平台运行配置（本文件仅 root 可读，不要提交到 git）
SERVER_ADDRESS=0.0.0.0
SERVER_PORT=${APP_PORT}
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=${DB_NAME}
DB_USERNAME=${DB_USER}
DB_PASSWORD=${DB_PASS}
# 火山方舟 API Key：把下面替换成你自己的 key，然后 systemctl restart zhujian
ARK_API_KEY=
# 模型接入点（默认 DeepSeek-V4.1-Flash 经济版，按需修改）
ARK_MODEL=deepseek-v4-1-flash-economy-261017
ENV
chmod 600 "$ENV_FILE"

# ---------------------------------------------------------------- 4. systemd
log "5/5" "注册 systemd 服务 ${APP_NAME}"
cat > "/etc/systemd/system/${APP_NAME}.service" <<UNIT
[Unit]
Description=Zhujian Smart Renovate Service Hub
After=network.target mysql.service
Wants=mysql.service

[Service]
Type=simple
WorkingDirectory=${APP_DIR}
EnvironmentFile=${ENV_FILE}
ExecStart=/usr/bin/java -Xms256m -Xmx1024m -jar ${APP_DIR}/app.jar
Restart=always
RestartSec=10
StandardOutput=append:${APP_DIR}/app.log
StandardError=append:${APP_DIR}/app.log

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable "$APP_NAME" >/dev/null 2>&1

# ---------------------------------------------------------------- 收尾提示
URL_PORT="${APP_PORT}"
cat <<TIP

$(printf "${GREEN}环境准备完成。${NC}接下来手动做 3 件事：")

  1) 上传程序文件（在你自己电脑上执行，不是服务器上）：
     scp app.jar root@<服务器公网IP>:${APP_DIR}/app.jar
     scp -r "Smart Renovate Service Hub/web" root@<服务器公网IP>:${APP_DIR}/

  2) 填 API Key（服务器上执行）：
     nano ${ENV_FILE}
     把 ARK_API_KEY= 后面填上你的 key，Ctrl+O 保存，Ctrl+X 退出

  3) 启动服务（服务器上执行）：
     systemctl start ${APP_NAME}
     systemctl status ${APP_NAME}
     tail -f ${APP_DIR}/app.log

  健康检查：curl http://127.0.0.1:${URL_PORT}/api/health
  外网访问：http://<服务器公网IP>:${URL_PORT}  （需在腾讯云轻量「防火墙」放行 TCP ${URL_PORT}）

$(printf "${YELLOW}数据库密码${NC} 已写入 ${ENV_FILE}，别忘了备份这个文件。")

TIP
