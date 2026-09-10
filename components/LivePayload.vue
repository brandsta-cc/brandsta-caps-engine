<!-- components/LivePayload.vue -->
<template>
  <section class="hidden lg:flex flex-col h-full bg-slate-900/50 border border-slate-800/80 rounded-xl shadow-2xl overflow-hidden relative transition-colors backdrop-blur-sm">
    
    <div class="bg-[#030712] border-b border-slate-800/80 px-6 py-4 flex justify-between items-center z-20">
      <h2 class="text-xs font-bold text-[#0068fe] uppercase tracking-wider flex items-center gap-2">
        <!-- Live indicator with Brandsta blue glow -->
        <span class="w-2 h-2 rounded-full bg-[#0068fe] animate-pulse shadow-[0_0_8px_#0068fe]"></span>
        Live JSON Payload
      </h2>
      <span class="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">Read-Only</span>
    </div>
    
    <div class="p-6 overflow-y-auto grow custom-scrollbar z-20">
      <pre class="text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">{{ formattedJson }}</pre>
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
    // image: item.image || null
  }))
  return JSON.stringify(cleanPayload, null, 2)
})
</script>