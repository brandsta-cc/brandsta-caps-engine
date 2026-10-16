<!-- components/EngineHeader.vue -->
<template>
  <div class="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      
      <!-- Title & Item Count -->
      <div class="flex items-center justify-between lg:justify-start gap-3">
        <h2 class="text-base sm:text-lg font-bold text-white tracking-wide">
          Hotel CAPS Specials
        </h2>
        <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {{ itemCount }} {{ itemCount === 1 ? 'Item' : 'Items' }}
        </span>
      </div>

      <!-- Action Buttons (Responsive 320px+ Grid/Flex) -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Post Live (Primary) -->
        <button
          type="button"
          :disabled="isLoading"
          @click="$emit('post')"
          class="flex-1 sm:flex-none min-w-[115px] bg-[#0068fe] hover:bg-blue-600 disabled:opacity-60 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'Posting...' : 'Post Live' }}</span>
        </button>

        <!-- Preview / Save Posters -->
        <button
          type="button"
          @click="$emit('open-preview')"
          class="flex-1 sm:flex-none min-w-[125px] bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm py-2.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          title="Preview & Download Social Posters"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Preview / Save</span>
        </button>

        <!-- Import JSON + Info Guide Group -->
        <div class="flex items-center gap-1.5">
          <button
            type="button"
            @click="$emit('open-import')"
            class="bg-[#030712] hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            title="Paste or Import JSON"
          >
            <svg class="w-4 h-4 text-[#0068fe] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Import</span>
          </button>

          <!-- "i" Help / AI Prompt Guide Button -->
          <button
            type="button"
            @click="$emit('open-guide')"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#030712] hover:bg-[#0068fe]/20 text-slate-300 hover:text-[#0068fe] border border-slate-700/80 hover:border-[#0068fe]/50 font-serif italic font-bold text-sm flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="JSON Schema & AI Prompt Guide"
            aria-label="JSON Schema & AI Prompt Guide"
          >
            i
          </button>
        </div>

        <!-- Log Out -->
        <button
          type="button"
          @click="$emit('logout')"
          class="bg-slate-800/80 hover:bg-red-500/15 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 font-semibold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors cursor-pointer ml-auto sm:ml-0"
        >
          Log Out
        </button>
      </div>
    </div>

    <!-- CAPS Campaign Control Block (Only displays if CAPS is present) -->
    <div v-if="hasCapsCategory" class="mt-4 pt-4 border-t border-slate-800 flex flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
      
      <!-- CAPS Custom Title -->
      <div class="w-1/2 relative">
        <label for="caps-global-title" class="block text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1 text-center">
          Event Title
        </label>
        <div class="relative">
          <input 
            id="caps-global-title"
            name="capsGlobalTitle"
            :value="capsTitle"
            @input="$emit('update:capsTitle', $event.target.value)"
            type="text" 
            maxlength="20"
            placeholder="SEASONAL SPECIALS" 
            class="w-full bg-[#030712] border border-slate-700 rounded-lg px-2 sm:px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors uppercase font-mono text-center pr-10" 
          />
          <span 
            class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] font-mono select-none transition-colors"
            :class="(capsTitle?.length || 0) >= 18 ? 'text-red-400' : 'text-slate-500'"
            aria-hidden="true"
          >
            {{ capsTitle?.length || 0 }}/20
          </span>
        </div>
      </div>

      <!-- CAPS Custom Date -->
      <div class="w-1/2 relative">
        <label for="caps-global-date" class="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 text-center">
          Campaign Date
        </label>
        <div class="relative">
          <input 
            id="caps-global-date"
            name="capsGlobalDate"
            :value="capsDate"
            @input="$emit('update:capsDate', $event.target.value)"
            type="text" 
            maxlength="30"
            placeholder="ALL SEASON" 
            class="w-full bg-[#030712] border border-slate-700 rounded-lg px-2 sm:px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors uppercase font-mono text-center pr-10" 
          />
          <span 
            class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] font-mono select-none transition-colors"
            :class="(capsDate?.length || 0) >= 27 ? 'text-red-400' : 'text-slate-500'"
            aria-hidden="true"
          >
            {{ capsDate?.length || 0 }}/30
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  username: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  itemCount: { type: Number, default: 0 },
  hasCapsCategory: { type: Boolean, default: false },
  capsTitle: { type: String, default: 'SEASONAL SPECIALS' },
  capsDate: { type: String, default: 'ALL SEASON' }
})

defineEmits(['post', 'logout', 'open-preview', 'open-import', 'open-guide', 'update:capsTitle', 'update:capsDate'])
</script>