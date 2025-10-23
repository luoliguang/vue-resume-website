# Vue 3 单页滚动简历网站

这是一个使用 Vue 3 + Vite 构建的单页滚动简历网站，采用组件化开发方式。

## 项目结构

```
resume/
├── index.html              # 入口HTML文件
├── package.json            # 项目配置文件
├── vite.config.js         # Vite配置文件
├── src/
│   ├── main.js            # 应用入口文件
│   ├── App.vue             # 主应用组件
│   └── components/         # 组件目录
│       ├── Navbar.vue      # 导航栏组件
│       ├── AboutSection.vue    # 关于我组件
│       ├── SkillsSection.vue   # 核心能力组件
│       ├── ProjectsSection.vue  # 项目经验组件
│       └── ContactSection.vue  # 联系方式组件
└── README.md              # 项目说明文档
```

## 功能特性

- ✅ Vue 3 Composition API (`<script setup>` 语法)
- ✅ 组件化开发，每个section独立组件
- ✅ 固定导航栏，支持平滑滚动
- ✅ 响应式设计，移动端友好
- ✅ 现代化UI设计
- ✅ 表单处理功能
- ✅ **滚动触发动画** - 自定义指令实现淡入上浮效果
- ✅ **项目演示视频** - 支持自动播放的演示视频
- ✅ **左右两栏布局** - 项目展示采用文字+视频的布局方式

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 组件说明

### Navbar.vue
- 固定顶部导航栏
- 移动端汉堡菜单
- 平滑滚动锚点链接

### AboutSection.vue
- 个人介绍区域
- 头像占位符
- 响应式布局

### SkillsSection.vue
- 技能标签展示
- 分类展示（前端技术、开发工具、其他技能）
- 网格布局

### ProjectsSection.vue
- **左右两栏布局** - 文字描述(40%) + 视频演示(60%)
- **滚动触发动画** - 使用自定义指令 `v-scroll-fade-in`
- **视频演示** - 支持自动播放、循环、静音的演示视频
- **响应式设计** - 移动端自动切换为上下堆叠布局
- **项目详情** - 挑战、方案、成果的结构化展示

### ContactSection.vue
- 联系信息展示
- 联系表单
- 表单验证和提交

## 自定义内容

您可以根据需要修改以下内容：

1. **个人信息**: 在 `AboutSection.vue` 中修改个人介绍
2. **技能标签**: 在 `SkillsSection.vue` 中修改技能列表
3. **项目信息**: 在 `ProjectsSection.vue` 中修改项目内容
4. **联系方式**: 在 `ContactSection.vue` 中修改联系信息
5. **样式主题**: 在各个组件中修改CSS变量和颜色
6. **演示视频**: 在 `public/videos/` 目录中添加项目演示视频
7. **动画效果**: 在 `src/directives/scrollFadeIn.js` 中自定义滚动动画

## 技术栈

- Vue 3.3.4
- Vite 4.4.9
- CSS3 (Grid, Flexbox, 响应式设计)
- JavaScript ES6+

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器
