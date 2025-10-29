<template>
  <div class="wrap">
    <div class="sheet">
      <header class="header">
        <div class="title">
          <h1 class="name">{{ tr({ zh: '罗洋洋', en: 'Luo Yangyang' }) }}</h1>
          <p class="role">{{ tr({ zh: '资深服装跟单', en: 'Senior Garment Merchandiser' }) }}</p>
        </div>
        <div class="right">
          <template v-if="langPosition === 'header'">
            <GlassToggle
              v-model="lang"
              :items="[
                { value: 'zh', label: '中文' },
                { value: 'en', label: 'English' }
              ]"
              :color="'#3498db'"
            />
          </template>
          <img class="avatar" src="/images/me.jpg" alt="avatar" @error="hideAvatar = true" v-show="!hideAvatar" />
        </div>
      </header>
      <!-- 移动端滚动问题已在弹窗容器上开启滚动处理，内容可完整浏览。若还想将悬浮切换器改回头部，传入 langPosition=\"header\" 即可。 -->
      <div v-if="langPosition === 'header'" class="floating-lang">
        <GlassToggle
          v-model="lang"
          :items="[
            { value: 'zh', label: '中文' },
            { value: 'en', label: 'English' }
          ]"
          :color="'#3498db'"
        />
      </div>

      <section class="grid">
        <div>
          <p class="lead">{{ tr({
            zh: '拥有近2年服装行业经验，精通 Excel 自动化流程提效 30% 以上，具备独立开发前端项目能力，擅长将技术与业务结合解决实际问题。',
            en: 'With nearly 2 years of apparel experience, proficient in Excel automation to improve efficiency by 30%+, capable of independent frontend development and combining tech with business to solve problems.'
          }) }}</p>
          <ul class="points">
            <li><span class="dot">✳</span><span>{{ tr({ zh: '利用 Excel 和 WPS 宏，将订单信息处理效率提升 70%+。', en: 'Used Excel & WPS macros to improve order processing efficiency by 70%+.' }) }}</span></li>
            <li><span class="dot">✳</span><span>{{ tr({ zh: '自学搭建公司素材门户网站，提升客户获取素材效率，好评反馈提升 60%+。', en: 'Built company material portal; improved retrieval efficiency and increased positive feedback by 60%+.' }) }}</span></li>
            <li><span class="dot">✳</span><span>{{ tr({ zh: '荣获国家励志奖学金及校级“三好学生”等荣誉。', en: 'Awarded National Scholarship and school-level Excellent Student honors.' }) }}</span></li>
          </ul>

          <div class="item" style="margin-top:14px">
            <div class="logo">司</div>
            <div>
              <div>{{ tr({ zh: '双月数码印花公司 — 服装跟单', en: 'Shuangyue Digital Printing — Merchandiser' }) }}</div>
              <div class="muted">{{ tr({ zh: '广东惠州 | 2024年4月 — 至今', en: 'Huizhou, Guangdong | Apr 2024 — Present' }) }}</div>
            </div>
          </div>

          <div class="item" style="margin-top:10px">
            <div class="logo">项</div>
            <div>
              <div>{{ tr({ zh: '服装实拍图网站', en: 'Apparel Real Photo Website' }) }}</div>
              <div class="muted">{{ tr({ zh: '2024年10月 — 至今', en: 'Oct 2024 — Present' }) }}</div>
            </div>
          </div>
        </div>

        <aside>
          <div class="card">
            <h3>{{ tr({ zh: '核心技能', en: 'Core Skills' }) }}</h3>
            <div class="chips">
              <span class="chip">{{ tr({ zh: '服装跟单流程', en: 'Merchandising' }) }}</span>
              <span class="chip">Excel & WPS</span>
              <span class="chip">HTML & CSS</span>
              <span class="chip">JavaScript</span>
              <span class="chip">Vue.js</span>
              <span class="chip">{{ tr({ zh: '沟通协调', en: 'Communication' }) }}</span>
              <span class="chip">{{ tr({ zh: '流程优化', en: 'Process Optimization' }) }}</span>
            </div>
          </div>

          <div class="card" style="margin-top:12px">
            <h3>{{ tr({ zh: '教育背景', en: 'Education' }) }}</h3>
            <div>{{ tr({ zh: '重庆电子工程职业大学', en: 'Chongqing Electronic Engineering Vocational University' }) }}</div>
            <div class="muted">{{ tr({ zh: '专科｜微电子技术', en: 'Associate | Microelectronics Technology' }) }}</div>
          </div>
        </aside>
      </section>

      <div class="cta">
        <AnimatedButton theme="primary" @click="$emit('learnMore')">{{ tr({ zh: '详细了解我', en: 'Learn More About Me' }) }}</AnimatedButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassToggle from '../ui/GlassToggle.vue'
import AnimatedButton from '../ui/AnimatedButton.vue'
import { currentLanguage, setLanguage } from '../../composables/useI18n.js'

// 与全站语言同步
const lang = computed({
  get: () => currentLanguage.value,
  set: (val) => setLanguage(val)
})
const hideAvatar = ref(false)

const tr = (dict) => dict[lang.value] || ''

const props = defineProps({
  langPosition: { type: String, default: 'floating' } // 'header' | 'floating'
})
</script>

<style scoped>
.wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 0; box-sizing: border-box; }
.sheet { background: #ffffff; border: 1px solid #e5e9ef; border-radius: 16px; padding: 24px 28px 20px; width: 100%; max-width: 980px; box-shadow: 0 6px 20px rgba(15,23,42,.06); display: flex; flex-direction: column; }
.header { display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; margin-bottom: 22px; }
.title { padding-top: 6px; }
.name { font-size: 40px; line-height: 1.15; margin: 0 0 8px; font-weight: 800; letter-spacing: .3px; }
.role { margin: 0; color: #5b677b; font-size: 18px; }
.right { display: flex; align-items: center; gap: 12px; }
.avatar { width: 100px; height: 100px; border-radius: 999px; object-fit: cover; border: 6px solid #eef2f7; box-shadow: 0 6px 18px rgba(15,23,42,.15); }

.grid { display: grid; grid-template-columns: 1.2fr .9fr; gap: 20px; }
.card { border: 1px solid #e5e9ef; border-radius: 14px; padding: 16px 16px 12px; background: #fbfcfe; }
.card h3 { margin: 0 0 12px; font-size: 16px; }
.lead { margin: 0 0 12px; color: #0f172a; line-height: 1.7; }
.points { margin: 0; padding: 0; list-style: none; }
.points li { display: flex; gap: 8px; margin: 10px 0; color: #0f172a; }
.points .dot { color: #16a34a; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { border: 1px solid #e5e9ef; padding: 6px 10px; border-radius: 999px; font-size: 12px; background: #fff; }
.item { display: flex; gap: 12px; align-items: center; border: 1px solid #e5e9ef; border-radius: 12px; padding: 12px; background: #fff; }
.item .logo { width: 36px; height: 36px; border-radius: 10px; background: #f2f5f8; display: grid; place-items: center; font-size: 14px; color: #64748b; }
.muted { color: #5b677b; font-size: 12px; }
.cta { display: flex; justify-content: center; gap: 12px; margin: 18px 0 8px; }

.floating-lang { position: absolute; top: 12px; left: 12px; z-index: 2; }

.wrap { position: relative; }

@media (max-width: 768px) {
  .name { font-size: 30px; }
  .grid { grid-template-columns: 1fr; }
  .avatar { width: 80px; height: 80px; }
  .sheet { padding: 20px 16px; }
  .wrap { align-items: flex-start; justify-content: flex-start; padding-top: 8px; }
}
</style>


