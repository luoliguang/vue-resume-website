// 测试项目设置
console.log('🎯 Vue 3 简历网站项目设置检查');
console.log('================================');

// 检查必要文件
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'vite.config.js',
  'index.html',
  'src/main.js',
  'src/App.vue',
  'src/directives/scrollFadeIn.js',
  'src/components/Navbar.vue',
  'src/components/AboutSection.vue',
  'src/components/SkillsSection.vue',
  'src/components/ProjectsSection.vue',
  'src/components/ContactSection.vue'
];

console.log('📁 检查必要文件:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件缺失`);
  }
});

console.log('\n🎬 检查媒体文件夹:');
const mediaDirs = ['public/videos', 'public/images'];
mediaDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`⚠️  ${dir}/ - 目录不存在，将创建...`);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ ${dir}/ - 已创建`);
  }
});

console.log('\n🚀 项目设置完成！');
console.log('运行 "npm install" 然后 "npm run dev" 启动项目');
console.log('项目将在 http://localhost:3005 启动');
