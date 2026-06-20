import { ref } from 'vue'

const _cache = new Map()

async function _fetchContent(type) {
  if (_cache.has(type)) return _cache.get(type)
  const res = await fetch(`/api/${type}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const { data } = await res.json()
  _cache.set(type, data)
  return data
}

export function useContent(type) {
  const data = ref(null)
  const loading = ref(true)

  _fetchContent(type)
    .then(d => { data.value = d })
    .catch(e => console.warn(`[useContent] ${type} API 不可用，使用静态数据:`, e.message))
    .finally(() => { loading.value = false })

  return { data, loading }
}
