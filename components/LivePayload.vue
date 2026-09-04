<!-- components/LivePayload.vue -->
<template>
  <section class="hidden lg:flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-2xl overflow-hidden relative transition-colors">
    
    <div class="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-20">
      <h2 class="text-xs font-bold text-teal-600 dark:text-teal-500 uppercase tracking-wider flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
        Live JSON Payload
      </h2>
      <span class="text-xs font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">Read-Only</span>
    </div>
    
    <div class="p-6 overflow-y-auto grow custom-scrollbar z-20">
      <pre class="text-slate-800 dark:text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">{{ formattedJson }}</pre>
    </div>

  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  specials: { type: Array, required: true }
})

const formattedJson = computed(() => {
  const cleanPayload = props.specials.map(item => ({
    category: item.category,
    name: item.name,
    price: item.price || null,
    isVeg: item.isVeg,
    description: item.description || null,
    image: item.image || null
  }))
  return JSON.stringify(cleanPayload, null, 2)
})
</script>