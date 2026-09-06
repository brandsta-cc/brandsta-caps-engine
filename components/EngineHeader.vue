<!-- components/EngineHeader.vue -->
<template>
  <div class="flex flex-col md:flex-row justify-between items-center bg-[#030712] p-2 px-4 rounded-xl border border-slate-800/80 shadow-sm mb-2 gap-3 md:gap-0">
    
    <!-- Title: Centered on mobile, left-aligned on desktop -->
    <div class="text-center md:text-left w-full md:w-auto">
      <h2 class="text-base md:text-xl font-semibold text-white tracking-wide">Hotel CAPS Specials</h2>
    </div>
    
    <!-- Buttons: Flex row on mobile to save height, matching Brandsta blue -->
    <div class="flex gap-2 md:gap-3 w-full md:w-auto">
      <button 
        @click="$emit('post')" 
        :disabled="isLoading"
        class="flex-1 md:flex-none bg-[#0068fe] hover:bg-blue-600 text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg font-bold transition-colors shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ isLoading ? 'Publishing...' : 'Post Live' }}
      </button>
      
      <button 
        @click="$emit('logout')" 
        :disabled="isLoading"
        class="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 md:px-5 py-1.5 md:py-2 rounded-lg font-semibold transition-colors border border-slate-700 cursor-pointer disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
      >
        Log Out
      </button>
    </div>
    
  </div>
</template>

<script setup>
defineProps({
  isLoading: { type: Boolean, default: false }
})
// Removed the 'username' prop since we deleted the target account text
defineEmits(['post', 'logout'])
</script>