<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-teal-500 selection:text-white">
    
    <!-- Boilerplate Header -->
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-50 relative shadow-sm">
      <div class="flex items-center gap-4">
        <!-- Brandsta Logo Placeholder -->
        <div class="w-10 h-10 bg-teal-500 text-white flex items-center justify-center font-black rounded-lg shadow-md text-xl">
          B
        </div>
        <div>
          <h1 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Brandsta Interactive</h1>
          <p class="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Data Engine</p>
        </div>
      </div>
      
      <!-- Theme Toggle -->
      <button 
        @click="toggleTheme" 
        class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-sm transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center gap-2 shadow-sm"
      >
        <span v-if="isDark">☀️ Light Mode</span>
        <span v-else>🌙 Dark Mode</span>
      </button>
    </header>

    <!-- Page Content Injection -->
    <slot />
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  // Initialize dark mode by default to match your preferred aesthetic
  document.documentElement.classList.add('dark')
})
</script>