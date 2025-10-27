<template>
  <div class="glass-toggle" :style="{ '--item-count': items.length }">
    <button 
      v-for="(item, index) in items" 
      :key="item.value"
      class="glass-option"
      :class="{ active: modelValue === item.value }"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
      <span v-if="item.count !== undefined" class="count">({{ item.count }})</span>
    </button>
    <div 
      class="glass-glider"
      :style="{ 
        transform: `translateX(${getActiveIndex() * 100}%)`,
        width: `calc((100% - ${items.length * 8}px) / ${items.length})`,
        marginLeft: `${4 + getActiveIndex() * 8}px`
      }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item => 
        typeof item === 'object' && 
        'value' in item && 
        'label' in item
      )
    }
  },
  color: {
    type: String,
    default: '#3498db'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const getActiveIndex = () => {
  return props.items.findIndex(item => item.value === props.modelValue)
}

const handleClick = (value) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.glass-toggle {
  --bg: rgba(255, 255, 255, 0.15);
  --text: #4a5568;
  --active-color: v-bind(color);
  
  display: flex;
  position: relative;
  background: var(--bg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(16px);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  width: 100%;
  max-width: 600px;
}

.glass-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  font-size: 14px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--text);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease-in-out;
  background: transparent;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.glass-option:hover {
  color: var(--active-color);
}

.glass-option.active {
  color: var(--active-color);
  font-weight: 700;
}

.count {
  font-size: 0.8rem;
  opacity: 0.7;
  font-weight: 500;
}

.glass-glider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 0.9rem;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
  background: linear-gradient(135deg, 
    rgba(52, 152, 219, 0.25), 
    rgba(52, 152, 219, 0.35)
  );
  box-shadow:
    0 2px 8px rgba(52, 152, 219, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .glass-toggle {
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
  }
  
  .glass-option {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    min-width: 0;
  }
}

@media (max-width: 480px) {
  .glass-option {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    min-width: 0;
  }
  
  .count {
    font-size: 0.75rem;
  }
}
</style>
