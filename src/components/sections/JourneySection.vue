<template>
  <section id="journey" class="journey-section">
    <div class="container">
      <h2 class="section-title">{{ t('journey.title') }}</h2>

      <!-- Desktop horizontal timeline -->
      <div class="timeline-horizontal">
        <div class="h-track">
          <!-- Background line sits behind everything -->
          <div class="h-line"></div>

          <div
            v-for="(milestone, index) in journeyMilestones"
            :key="milestone.id"
            class="h-node"
          >
            <!-- Top slot: filled for even indices -->
            <div class="h-slot h-slot--top">
              <div v-if="index % 2 === 0" class="h-card">
                <div :class="['h-icon', getStatusClass(milestone.status)]">
                  <component :is="getIconComponent(milestone.icon)" :size="16" />
                </div>
                <div class="h-year">{{ milestone.year }}</div>
                <div class="h-title">{{ milestone.title[isChinese ? 'zh' : 'en'] }}</div>
                <div class="h-desc">{{ milestone.description[isChinese ? 'zh' : 'en'] }}</div>
                <span :class="['h-badge', getStatusClass(milestone.status)]">{{ getStatusText(milestone.status) }}</span>
              </div>
            </div>

            <!-- Dot on the line -->
            <div :class="['h-dot', getStatusClass(milestone.status)]"></div>

            <!-- Bottom slot: filled for odd indices -->
            <div class="h-slot h-slot--bottom">
              <div v-if="index % 2 !== 0" class="h-card">
                <div :class="['h-icon', getStatusClass(milestone.status)]">
                  <component :is="getIconComponent(milestone.icon)" :size="16" />
                </div>
                <div class="h-year">{{ milestone.year }}</div>
                <div class="h-title">{{ milestone.title[isChinese ? 'zh' : 'en'] }}</div>
                <div class="h-desc">{{ milestone.description[isChinese ? 'zh' : 'en'] }}</div>
                <span :class="['h-badge', getStatusClass(milestone.status)]">{{ getStatusText(milestone.status) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile vertical timeline -->
      <div class="timeline-vertical">
        <div
          v-for="milestone in journeyMilestones"
          :key="milestone.id"
          class="v-item"
        >
          <div :class="['v-dot', getStatusClass(milestone.status)]"></div>
          <div class="v-card">
            <div class="v-header">
              <div :class="['v-icon', getStatusClass(milestone.status)]">
                <component :is="getIconComponent(milestone.icon)" :size="15" />
              </div>
              <span class="v-year">{{ milestone.year }}</span>
            </div>
            <div class="v-title">{{ milestone.title[isChinese ? 'zh' : 'en'] }}</div>
            <div class="v-desc">{{ milestone.description[isChinese ? 'zh' : 'en'] }}</div>
            <span :class="['v-badge', getStatusClass(milestone.status)]">{{ getStatusText(milestone.status) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { journeyMilestones } from '../../data/journey.js'
import { t, isChinese } from '../../composables/useI18n.js'
import { GraduationCap, Briefcase, Code, Rocket, Contact } from 'lucide-vue-next'

const getStatusClass = (status) => {
  return { completed: 'status-completed', 'in-progress': 'status-in-progress', 'not-started': 'status-not-started' }[status] ?? 'status-completed'
}

const getStatusText = (status) => {
  const map = isChinese.value
    ? { completed: '已完成', 'in-progress': '进行中', 'not-started': '未开始' }
    : { completed: 'Completed', 'in-progress': 'In Progress', 'not-started': 'Not Started' }
  return map[status] ?? (isChinese.value ? '已完成' : 'Completed')
}

const getIconComponent = (iconName) => {
  return { graduation: GraduationCap, briefcase: Briefcase, code: Code, rocket: Rocket, contact: Contact }[iconName] ?? Code
}
</script>

<style scoped>
/* ── Status tokens ─────────────────────────── */
.status-completed   { --sc: #34c759; --sb: rgba(52,199,89,.12); --sbo: rgba(52,199,89,.3); }
.status-in-progress { --sc: #ff9f0a; --sb: rgba(255,159,10,.12); --sbo: rgba(255,159,10,.3); }
.status-not-started { --sc: #86868b; --sb: rgba(134,134,139,.12); --sbo: rgba(134,134,139,.3); }

/* ── Section ───────────────────────────────── */
.journey-section {
  padding: 80px 20px;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  margin-bottom: 48px;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

/* ══════════════════════════════════════════════
   HORIZONTAL TIMELINE (desktop ≥ 769px)
══════════════════════════════════════════════ */
.timeline-horizontal { display: block; }
.timeline-vertical   { display: none; }

.h-track {
  position: relative;
  display: flex;
  align-items: stretch;      /* all nodes same height */
  gap: 0;
  min-height: 420px;
}

/* Central horizontal line */
.h-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  transform: translateY(-50%);
  background: var(--surface-border-dark-strong);
  pointer-events: none;
}

/* Each milestone column */
.h-node {
  flex: 1;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  /* top-slot | dot | bottom-slot */
  align-items: center;
  justify-items: center;
  position: relative;
}

/* Top / bottom card slots – equal height so line stays centred */
.h-slot {
  width: 100%;
  display: flex;
  padding: 0 6px;
}

.h-slot--top  { align-items: flex-end;   padding-bottom: 20px; }
.h-slot--bottom { align-items: flex-start; padding-top: 20px; }

/* Card */
.h-card {
  background: var(--surface-card-dark);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: var(--radius-standard);
  padding: 14px;
  width: 100%;
  transition: border-color .2s ease;
}

.h-card:hover {
  border-color: var(--text-on-dark-subtle);
}

/* Dot */
.h-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--sc);
  border: 2px solid var(--surface-page, #000);
  box-shadow: 0 0 0 3px var(--sc);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

/* Card internals */
.h-icon, .v-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sb);
  color: var(--sc);
  border: 1px solid var(--sbo);
  margin-bottom: 8px;
  flex-shrink: 0;
}

.h-year, .v-year {
  font-size: var(--text-caption);
  font-weight: 600;
  color: var(--text-on-dark-subtle);
  letter-spacing: var(--tracking-caption);
  margin-bottom: 4px;
}

.h-title, .v-title {
  font-size: var(--text-body-sm);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  letter-spacing: var(--tracking-body-sm);
  line-height: 1.35;
  margin-bottom: 6px;
}

.h-desc, .v-desc {
  font-size: var(--text-caption);
  color: var(--text-on-dark-muted);
  line-height: 1.5;
  letter-spacing: var(--tracking-caption);
  margin-bottom: 8px;
}

.h-badge, .v-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  background: var(--sb);
  color: var(--sc);
  border: 1px solid var(--sbo);
}

/* Tablet: make cards narrower but still horizontal */
@media (max-width: 900px) {
  .h-track { min-height: 380px; }
  .h-card  { padding: 10px; }
  .h-slot--top    { padding-bottom: 16px; }
  .h-slot--bottom { padding-top: 16px; }
}

/* ══════════════════════════════════════════════
   VERTICAL TIMELINE (mobile ≤ 768px)
══════════════════════════════════════════════ */
@media (max-width: 768px) {
  .journey-section { padding: 48px 16px; }
  .section-title   { margin-bottom: 36px; }

  .timeline-horizontal { display: none; }
  .timeline-vertical   {
    display: block;
    position: relative;
    padding-left: 28px;
  }

  /* Vertical guide line */
  .timeline-vertical::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: var(--surface-border-dark-strong);
  }

  .v-item {
    position: relative;
    margin-bottom: 16px;
  }
  .v-item:last-child { margin-bottom: 0; }

  /* Dot */
  .v-dot {
    position: absolute;
    left: -25px;
    top: 16px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--sc);
    border: 2px solid var(--surface-page, #000);
    box-shadow: 0 0 0 2px var(--sc);
    z-index: 1;
  }

  .v-card {
    background: var(--surface-card-dark);
    border: 1px solid var(--surface-border-dark-strong);
    border-radius: var(--radius-standard);
    padding: 14px 16px;
  }

  .v-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .v-icon { margin-bottom: 0; width: 26px; height: 26px; }

  .v-year { margin-bottom: 0; }
}

@media (max-width: 480px) {
  .journey-section { padding: 40px 12px; }
  .timeline-vertical { padding-left: 24px; }
  .v-dot { left: -21px; }
  .v-card { padding: 12px 14px; }
}
</style>
