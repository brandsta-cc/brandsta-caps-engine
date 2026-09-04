<!-- components/EngineHeader.vue -->
<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-2">
    <div>
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">Hotel CAPS Specials</h2>
      <p class="text-teal-600 dark:text-teal-400 text-sm font-semibold mt-1">Target Account: {{ username }}</p>
    </div>
    
    <div class="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
      <button 
        @click="$emit('post')" 
        :disabled="isLoading"
        class="flex-1 md:flex-none bg-teal-600 hover:bg-teal-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ isLoading ? 'Publishing...' : 'Post to WordPress' }}
      </button>
      <button 
        @click="$emit('logout')" 
        :disabled="isLoading"
        class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-lg font-semibold transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer disabled:opacity-50"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: { type: String, required: true },
  isLoading: { type: Boolean, default: false }
})
defineEmits(['post', 'logout'])
</script>