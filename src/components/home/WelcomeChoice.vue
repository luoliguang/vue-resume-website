<template>
  <section class="welcome">
    <div class="container">
      <div class="header">
        <h1>欢迎来到罗力广的作品集</h1>
        <p class="sub">连接服装生产与数字创新。请选择您偏好的浏览方式。</p>
      </div>
      <div class="options">
        <div class="option" @click="$emit('enterSite')">
          <div class="icon">📄</div>
          <div class="title">浏览在线简历</div>
          <div class="desc">通过沉浸式体验深入了解我的技能和项目。</div>
        </div>
        <a class="option" href="/pdf.html">
          <div class="icon">🧾</div>
          <div class="title">快速浏览精简简历（PDF样式）</div>
          <div class="desc">获取网页版精简简历，方便快速阅览。</div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// 无额外逻辑
</script>

<style scoped>
.welcome { padding: 80px 20px; background: #f7f9fc; }
.container { max-width: 1100px; margin: 0 auto; }
.header { text-align: center; margin-bottom: 28px; }
.header h1 { font-size: 36px; color: #1f2d3d; margin: 0 0 8px; }
.sub { color: #5c6b77; margin: 0; }
.options { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.option { background: #fff; border: 1px solid #e6ecf2; border-radius: 14px; padding: 28px; text-decoration: none; color: inherit; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; display: block; }
.option:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.06); }
.icon { font-size: 28px; line-height: 1; margin-bottom: 8px; }
.title { font-size: 18px; font-weight: 700; color: #263445; margin-bottom: 6px; }
.desc { color: #667784; font-size: 14px; }

@media (max-width: 768px) {
  .welcome { padding: 56px 16px; }
  .header h1 { font-size: 28px; }
  .options { grid-template-columns: 1fr; }
}
</style>


