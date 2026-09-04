<!-- components/AuthGate.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] p-4">
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl dark:shadow-2xl max-w-md w-full transition-colors">
      <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">Engine Authentication</h2>
      <p class="text-slate-500 dark:text-slate-400 text-sm text-center mb-6">Enter your WP Application Password.</p>
      
      <div v-if="error" class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-4">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Username</label>
          <input 
            v-model="internalAuth.username" 
            type="text" 
            :disabled="isLoading"
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition-colors disabled:opacity-50" 
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">App Password</label>
          <input 
            v-model="internalAuth.password" 
            type="password" 
            :disabled="isLoading"
            @keyup.enter="triggerLogin" 
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition-colors disabled:opacity-50" 
          />
        </div>
        <button 
          @click="triggerLogin" 
          :disabled="isLoading"
          class="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Authenticating...' : 'Secure Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  auth: { type: Object, required: true },
  error: { type: String, default: '' },
  isLoading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:auth', 'login'])

const internalAuth = computed({
  get: () => props.auth,
  set: (val) => emit('update:auth', val)
})

const triggerLogin = () => {
  if (!props.isLoading) emit('login')
}
</script>