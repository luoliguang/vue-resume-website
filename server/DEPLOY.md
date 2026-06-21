# 服务器首次部署步骤

## 一、服务器准备（宝塔面板）

### 1. 安装必要软件
宝塔 → 软件商店：
- **Node.js 版本管理器** → 安装 Node 20
- **PM2 管理器** → 一键安装

### 2. 建立部署目录
SSH 进服务器执行：
```bash
mkdir -p /www/wwwroot/resume/{dist,admin,server}
```

### 3. 上传 .env 文件
将 server/.env 手动 SCP 或通过宝塔文件管理上传到服务器：
```
/www/wwwroot/resume/server/.env
```
内容参考：
```
PORT=3025
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=resume_cms
DB_USER=postgres
DB_PASSWORD=你的密码
ADMIN_PASSWORD=你的后台密码
JWT_SECRET=自定义随机字符串
```

### 4. 初始化数据库（只需一次）
```bash
cd /www/wwwroot/resume/server
npm install
npm run db:init   # 建表
npm run db:seed   # 导入前端静态数据
```

---

## 二、配置 Nginx（宝塔面板）

宝塔 → 网站 → 添加站点 → 根目录指向 `/www/wwwroot/resume/dist`

然后进入该站点的「配置文件」，将内容替换为 `nginx.conf.example` 的内容
（记得把 `your-domain.com` 改成你的域名或 IP）。

---

## 三、配置 GitHub Secrets

仓库 → Settings → Secrets and variables → Actions → New repository secret

| Secret 名称        | 示例值                              | 说明                          |
|--------------------|-------------------------------------|-------------------------------|
| `SERVER_HOST`      | `123.123.123.123`                   | 服务器公网 IP 或域名          |
| `SERVER_PORT`      | `22`                                | SSH 端口，查宝塔安全面板      |
| `SERVER_USER`      | `root`                              | SSH 用户名                    |
| `SSH_PRIVATE_KEY`  | `-----BEGIN OPENSSH...`             | 见下方「生成 SSH 密钥」步骤   |
| `SERVER_PATH`      | `/www/wwwroot/resume`               | 服务器部署根目录              |
| `SERVER_DOMAIN`    | `resume.example.com`                | 你的域名（或服务器 IP）       |
| `API_PORT`         | `3025`                              | Node.js 后端监听端口          |

> **Nginx 配置**：每次 deploy 会自动生成 `$SERVER_PATH/nginx.conf`，
> 第一次部署完成后，把该文件内容复制到宝塔的站点 Nginx 配置里保存即可，
> 后续路径变化时重新部署会自动更新这个文件。

### 生成 SSH 密钥（本机执行）
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy
```
- 公钥 `~/.ssh/github_deploy.pub` 的内容 → 追加到服务器的 `~/.ssh/authorized_keys`
- 私钥 `~/.ssh/github_deploy` 的内容 → 填入 GitHub Secret `SSH_PRIVATE_KEY`

---

## 四、触发部署

配置完成后，push 到 main 分支即自动部署：
```bash
git push origin main
```

或在 GitHub → Actions → Deploy to Server → Run workflow 手动触发。

---

## 五、验证

| 地址                        | 预期结果         |
|-----------------------------|------------------|
| `http://你的域名/`          | Vue 简历网站     |
| `http://你的域名/admin/`    | 后台登录页       |
| `http://你的域名/api/hero`  | JSON 数据响应    |
