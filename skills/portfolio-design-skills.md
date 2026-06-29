# Portfolio & Product Showcase Website — Design Skills
## 来源：haoqi.design 深度解析
## 适用场景：个人作品集 / 产品展示类网站
---

## Skill 1: 语义化颜色 Token 系统

不直接使用颜色值，用"层级 + 透明度"描述语义。背景只需两三档，文字用 label
透明度从 100% 到 8% 形成完整层级，强调色只留一个高饱和对比色（acid green、电光蓝等）。
这套系统让深色/浅色主题切换只需替换一套变量，不改任何组件代码。

```css
:root {
  /* 背景 */
  --bg-base:     rgb(15, 17, 17);
  --bg-elevated: rgb(25, 27, 27);

  /* 文字层级 */
  --label-1: rgba(255, 255, 255, 1.00);   /* 主要文字 */
  --label-2: rgba(230, 232, 232, 0.60);   /* 次要文字 */
  --label-3: rgba(230, 232, 232, 0.32);   /* 三级/链接默认 */
  --label-4: rgba(230, 232, 232, 0.16);   /* 占位/disabled */

  /* 分割线 */
  --line:    rgba(230, 232, 232, 0.08);

  /* 唯一强调色 */
  --accent:  #d4f52a; /* acid green */
}
```

**设计原则**：背景用 rgb，文字用 rgba 透明度层叠，选中/强调色是唯一彩色，
其他所有颜色靠透明度推导，整体保持极度克制。

---

## Skill 2: 终端 UI 字体组合

用两套字体制造「内容」与「系统」的对比：主体用干净现代无衬线，所有 UI 标签
（导航、时间、坐标、badge）用像素感等宽字体。两者不混用，分工严格。

```css
:root {
  --font-body: "Inter", sans-serif;         /* 或 neue-haas / tiktok 等 */
  --font-ui:   "Berkeley Mono", monospace;  /* 或 tronica-mono / Geist Mono */
}

/* 应用规则 */
nav, .badge, .label, time, .coords { font-family: var(--font-ui); }
body, h1, h2, p                    { font-family: var(--font-body); }

/* 大标题永远 uppercase，去掉所有装饰性 */
h1, h2 {
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}
```

**字号规则**：大标题用 viewport 单位（svw），保证在所有屏幕比例上都自然撑满，
不用 rem 硬编码再逐断点覆盖。

---

## Skill 3: 签名缓动曲线

一条自定义 cubic-bezier 替代所有默认 ease。前段慢蓄力、后段快落下，
带有「精密机械」而非「有机弹簧」的质感。

```css
:root {
  --ease-snap:    cubic-bezier(0.66, 0, 0.01, 1); /* 主动画 — 蓄力后猛然到位 */
  --ease-out-std: cubic-bezier(0.00, 0, 0.20, 1); /* hover/颜色等短时过渡 */
}

/* 用法示例 */
.card          { transition: transform 600ms var(--ease-snap); }
.link          { transition: color 150ms var(--ease-out-std); }
.menu-line     { transition: all 1200ms var(--ease-snap); }
```

---

## Skill 4: 虚线边框 Hover 效果

按钮和可点击元素不用背景色 hover，改用 ::before 伪元素做虚线描边——
默认透明、hover 显现，不改变元素尺寸，不引起布局抖动，视觉上克制精准。

```css
.interactive {
  position: relative;
}

/* 只在有 hover 能力的设备上生效，防止移动端 sticky hover */
@media (hover: hover) {
  .interactive::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1.5px dotted transparent;
    pointer-events: none;
    transition: border-color 200ms var(--ease-out-std);
  }
  .interactive:hover::before {
    border-color: var(--label-1);
  }
}
```

---

## Skill 5: Underline 颜色过渡

链接下划线默认用极低透明度（几乎看不见），hover 时只做颜色过渡到全不透明。
比改变 text-decoration 属性更轻量、性能更好，视觉感更精致。

```css
.text-link {
  text-decoration: underline;
  text-underline-offset: 0.08em;
  text-decoration-color: var(--label-3);  /* 默认 32%，隐约存在 */
  transition: text-decoration-color 150ms var(--ease-out-std);
}

@media (hover: hover) {
  .text-link:hover {
    text-decoration-color: var(--label-1); /* hover 100%，明确出现 */
  }
}
```

---

## Skill 6: 响应式 Viewport 字号

大标题使用 svw（small viewport width）而非 rem 或 vw，
在所有屏幕比例上字号自动等比撑满，不需要手写断点覆盖。

```css
.hero-title {
  font-size: clamp(2.5rem, 7.2svw, 6rem);
  line-height: 1;
  text-transform: uppercase;
  font-weight: 700;
}

/* 多断点渐进缩小（Tailwind 写法参考） */
/* text-[7.2svw] sm:text-[6svw] lg:text-[5.6svw] xl:text-[5svw] 2xl:text-[4.5svw] */
```

---

## Skill 7: 12列不对称网格布局

全站用 12 列 CSS Grid，卡片用不等宽错位排列（8+5列、3+8列等），
制造「精心设计过的随意感」而非均等分割的机械感。

```css
.grid-layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding-inline: clamp(1rem, 3.5vw, 3.5rem);
}

/* 首屏大卡片：靠右，留出左侧呼吸 */
.card-hero { grid-column: span 12; }
@media (min-width: 1024px) {
  .card-hero { grid-column: 5 / span 8; }
}

/* 中等卡片对：不等宽 */
@media (min-width: 1024px) {
  .card-a { grid-column: 1 / span 6; }
  .card-b { grid-column: 7 / span 6; }
}

/* 小卡片三列：不从第一列开始 */
@media (min-width: 1024px) {
  .card-sm-a { grid-column: 1 / span 5; }
  .card-sm-b { grid-column: 6 / span 5; }
  /* 第三列留空：网格的「留白」是主动设计 */
}
```

---

## Skill 8: 非线性字符溶解动画（HSST）

用 scroll 驱动字符逐个淡出/淡入来切换标题文字。关键在于：
- 每个字符的延迟是**随机的**（不是顺序的）
- opacity 曲线是**非线性的**（keyframe 中间有顿挫）
效果是「电子屏烧像素」而非「逐字打字机」。

```css
@keyframes char-in {
  0%   { opacity: 0;    }
  32%  { opacity: 0.22; }
  62%  { opacity: 0.55; }
  100% { opacity: 1;    }
}

@keyframes char-out {
  0%   { opacity: 1;    }
  38%  { opacity: 0.62; }
  72%  { opacity: 0.28; }
  100% { opacity: 0;    }
}
```

```js
// 将文字拆解为单字符 span
function splitToChars(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`)
    .join('');
}

// 每个字符用随机延迟触发动画
function animateChars(element, direction = 'out') {
  const chars = element.querySelectorAll('.char');
  chars.forEach(char => {
    const delay = Math.random() * 0.45;          // 0 ~ 450ms 随机
    char.style.cssText = `
      animation-name: char-${direction};
      animation-duration: 0.23s;
      animation-delay: ${delay}s;
      animation-timing-function: linear;          /* timing 用 linear，非线性在 keyframe 里 */
      animation-fill-mode: forwards;
    `;
  });
}

// 使用示例
animateChars(titleEl, 'out');                    // 文字消散
setTimeout(() => {
  titleEl.textContent = nextText;
  splitToChars(titleEl);
  animateChars(titleEl, 'in');                   // 新文字出现
}, 500);
```

---

## Skill 9: Sticky 滚动叙事（Scroll Storytelling）

用一个全屏 sticky 容器锁住视口，滚动时后面的 spacer 撑开高度，
通过监听滚动进度切换内容（文字、颜色、3D 场景）。整页滚动变成时间轴。

```html
<!-- HTML 结构 -->
<div class="scroll-story">
  <div class="sticky-stage">
    <div class="stage-content" id="stageContent">
      <!-- 内容由 JS 根据 scrollProgress 更新 -->
    </div>
  </div>
</div>
```

```css
.scroll-story  {
  position: relative;
  height: 500vh;           /* 场景数 × 100vh，决定每段停留时长 */
}

.sticky-stage  {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
```

```js
const scenes = [
  { text: 'INNOVATE WITH PURPOSE',   bgColor: '#0A0E2A' },
  { text: 'INNOVATE WITH HUMANITY',  bgColor: '#0D1A3A' },
  { text: 'FUTURE-FIRST ALWAYS',     bgColor: '#0F1111' },
];

const story = document.querySelector('.scroll-story');

window.addEventListener('scroll', () => {
  const { top, height } = story.getBoundingClientRect();
  const scrollable = height - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -top / scrollable));
  const index = Math.min(
    Math.floor(progress * scenes.length),
    scenes.length - 1
  );
  updateScene(scenes[index]);
});
```

---

## Skill 10: HUD 网格线叠加层

一个固定在视口上的 SVG 画出均匀网格线和十字准星（crosshair），
用 mix-blend-difference 混合模式叠加。在深色背景上几乎不可见，
在亮色或彩色 WebGL 内容上产生颜色反转——制造「信息系统 HUD」的视觉语言。

```html
<div class="hud-overlay" aria-hidden="true">
  <svg viewBox="0 0 1440 900" preserveAspectRatio="none"
       width="100%" height="100%">

    <!-- 竖线（三等分） -->
    <line x1="360"  y1="0" x2="360"  y2="900"
          stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="720"  y1="0" x2="720"  y2="900"
          stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="1080" y1="0" x2="1080" y2="900"
          stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- 横线（三等分） -->
    <line x1="0" y1="300" x2="1440" y2="300"
          stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="0" y1="600" x2="1440" y2="600"
          stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- 十字准星（各交叉点）-->
    <!-- 左上 (360, 300) -->
    <line x1="360" y1="294" x2="360" y2="306"
          stroke="white" stroke-width="1" opacity="0.35"/>
    <line x1="354" y1="300" x2="366" y2="300"
          stroke="white" stroke-width="1" opacity="0.35"/>
    <!-- 中央 (720, 300) -->
    <line x1="720" y1="294" x2="720" y2="306"
          stroke="white" stroke-width="1" opacity="0.35"/>
    <line x1="714" y1="300" x2="726" y2="300"
          stroke="white" stroke-width="1" opacity="0.35"/>
    <!-- 更多交叉点按需添加 -->
  </svg>
</div>
```

```css
.hud-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 20;
  mix-blend-mode: difference;   /* 关键混合模式 */
}
```

---

## Skill 11: 鼠标坐标 + 环境数据状态栏

页面底部两端固定显示实时数据：鼠标坐标、当前时间、时区、温度。
打破「我在看一个网站」的感觉，进入「我在操作一个系统」的体验。

```html
<div class="hud-statusbar" aria-hidden="true">
  <span class="font-ui" id="envInfo">GMT+8 CN <time id="clock">00:00</time></span>
  <span class="font-ui" id="coords">0000 X 0000 Y</span>
</div>
```

```css
.hud-statusbar {
  position: fixed;
  bottom: 1.75rem;
  left: 0;
  right: 0;
  padding-inline: clamp(1rem, 3.5vw, 3.5rem);
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--label-2);
  pointer-events: none;
  z-index: 50;
}
```

```js
// 鼠标坐标实时追踪
const coordEl = document.getElementById('coords');
document.addEventListener('mousemove', (e) => {
  const x = String(Math.round(e.clientX)).padStart(4, '0');
  const y = String(Math.round(e.clientY)).padStart(4, '0');
  coordEl.textContent = `${x} X ${y} Y`;
});

// 时钟（每秒更新）
const clockEl = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}`;
}
updateClock();
setInterval(updateClock, 1000);
```

---

## Skill 12: Lenis 平滑滚动 + WebGL 固定层分离

让 DOM 内容层用 overflow: auto 滚动，WebGL canvas 固定在 position: fixed 不动，
通过监听 Lenis 的 scroll 事件驱动 Three.js 场景。canvas 永远全屏，不随内容抖动。

```html
<canvas class="webgl-canvas"></canvas>        <!-- WebGL，fixed 层 -->
<div class="scroll-wrapper">                  <!-- Lenis 滚动容器 -->
  <div class="scroll-content">
    <!-- 所有页面内容 -->
  </div>
</div>
```

```css
.webgl-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.scroll-wrapper {
  position: fixed;      /* 或 relative，取决于 Lenis 配置 */
  inset: 0;
  overflow-y: auto;
  scrollbar-width: none;      /* Firefox */
  -ms-overflow-style: none;   /* IE */
}
.scroll-wrapper::-webkit-scrollbar { display: none; }
```

```js
import Lenis from 'lenis';

const lenis = new Lenis({
  wrapper: document.querySelector('.scroll-wrapper'),
  content: document.querySelector('.scroll-content'),
  smoothWheel: true,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
});

// 通过 scroll 进度驱动 WebGL
lenis.on('scroll', ({ scroll, progress, velocity }) => {
  // 用 progress (0-1) 控制 Three.js 场景切换
  // 用 velocity 控制粒子速度（速度快时粒子加速）
  webglScene.update({ progress, velocity });
});

// RAF 循环
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

---

## 综合使用原则

这套 skill 的组合逻辑是：

**克制的 DOM 层 + 炸裂的 WebGL 层，两者通过滚动进度作为共同时间轴联动。**

DOM 层负责信息（文字、链接、卡片），所有交互极度克制，没有弹跳、没有大幅位移，
只有 opacity 和 color 的精确变化。

WebGL 层负责情绪（粒子、3D 形体、颜色氛围），随滚动进度切换场景。

两者叠加，产生「信息与感官」同步推进的体验。

---

## 技术栈参考

| 用途             | 选型                                 |
|------------------|--------------------------------------|
| 框架             | Next.js (App Router)                 |
| 样式             | Tailwind CSS v4                      |
| 平滑滚动         | Lenis v1.3+                          |
| 3D / WebGL       | Three.js r184+                       |
| 动画库（可选）   | Motion / GSAP ScrollTrigger          |
| 字体（UI）       | tronica-mono / Berkeley Mono         |
| 字体（主体）     | Inter / Neue Haas Grotesk            |
