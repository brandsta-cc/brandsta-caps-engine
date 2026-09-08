<!-- components/AuthGate.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-93px)] p-4">
    <div class="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl shadow-2xl max-w-md w-full transition-colors backdrop-blur-sm">
      <h2 class="text-2xl font-extrabold text-white mb-2 text-center">Engine Authentication</h2>
      <p class="text-slate-400 text-sm text-center mb-6">Enter your WP Application Password.</p>
      
      <div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Username</label>
          <input 
            v-model="internalAuth.username" 
            type="text" 
            :disabled="isLoading"
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0068fe] transition-colors disabled:opacity-50" 
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">App Password</label>
          <div class="relative">
            <input 
              v-model="internalAuth.password" 
              :type="showPassword ? 'text' : 'password'" 
              :disabled="isLoading"
              @keyup.enter="triggerLogin" 
              class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#0068fe] transition-colors disabled:opacity-50" 
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors focus:outline-none"
              tabindex="-1"
            >
              <!-- Eye Icon -->
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <!-- Eye Slash Icon -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>
        <button 
          @click="triggerLogin" 
          :disabled="isLoading"
          class="w-full bg-[#0068fe] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Authenticating...' : 'Secure Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

const showPassword = ref(false)

const triggerLogin = () => {
  if (!props.isLoading) emit('login')
}
</script>