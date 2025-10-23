@echo off
echo 正在启动Vue 3简历网站项目...
echo.

echo 1. 安装依赖包...
call npm install

echo.
echo 2. 启动开发服务器...
echo 项目将在 http://localhost:3005 启动
echo.

call npm run dev

pause
