# 组件结构说明

## 新的组件组织结构

项目已重新组织组件结构，按功能模块分类，便于维护和查找：

### 📁 components/
```
components/
├── layout/          # 布局相关组件
│   └── Navbar.vue   # 导航栏组件
├── sections/        # 页面区块组件
│   ├── AboutSection.vue      # 关于我区块
│   ├── ProjectsSection.vue   # 项目展示区块
│   ├── SkillsSection.vue     # 技能展示区块
│   └── ContactSection.vue     # 联系方式区块
├── ui/              # 通用UI组件
│   └── ProjectCard.vue        # 项目卡片组件
└── home/            # 首页专用组件
    └── HeroSection.vue       # 首页Hero区域
```

## 组件分类说明

### 🏗️ layout/ - 布局组件
- 负责整体页面布局的组件
- 如导航栏、侧边栏、页脚等

### 📄 sections/ - 页面区块
- 各个功能区块的主要组件
- 每个区块负责一个完整的功能模块

### 🎨 ui/ - 通用UI组件
- 可复用的UI组件
- 如按钮、卡片、表单等

### 🏠 home/ - 首页组件
- 首页专用的组件
- 如Hero区域、特色展示等

## 使用方式

在App.vue中导入组件时，使用新的路径：

```vue
<script setup>
import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/home/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
// ... 其他组件
</script>
```

## 优势

1. **清晰的分类**：按功能模块组织，便于查找
2. **易于维护**：相关组件集中管理
3. **可扩展性**：新增功能时容易确定放置位置
4. **团队协作**：不同开发者可以专注于不同模块
