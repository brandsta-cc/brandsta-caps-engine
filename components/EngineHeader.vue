<!-- components/EngineHeader.vue -->
<template>
  <div class="py-3 md:py-4 bg-[#030712] sticky top-22 z-40">
    <div class="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
      
      <!-- MASTER FLEX CONTAINER (Controls Desktop/Mobile Layout Without Duplicates) -->
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-3">
        
        <!-- 1. Title (Mobile: Row 1 Left | Desktop: Left Side) -->
        <h2 class="order-1 lg:order-1 mr-auto lg:mr-0 text-base sm:text-lg font-bold text-white tracking-wide whitespace-nowrap">
          Hotel CAPS Specials
        </h2>
  
        <!-- 2. Post Live (Mobile: Row 1 Right | Desktop: Left Side anchored) -->
        <!-- lg:mr-auto on Desktop pushes everything else to the far right -->
        <button
          type="button"
          :disabled="isLoading"
          @click="$emit('post')"
          class="order-2 lg:order-2 lg:mr-auto flex-none min-w-[100px] bg-[#0068fe] hover:bg-blue-600 disabled:opacity-60 text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <span v-if="isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'Posting...' : 'Post Live' }}</span>
        </button>
  
        <!-- FORCE ROW BREAK 1 (Mobile Only) -->
        <div class="order-3 w-full h-0 lg:hidden"></div>
  
        <!-- 4. Add New (Mobile: Row 2 Left 50% | Desktop: Right Side Cluster) -->
        <button
          type="button"
          @click="$emit('add-new')"
          class="order-4 lg:order-5 w-[calc(50%-5px)] sm:w-[calc(50%-6px)] lg:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          title="Add New Menu Item"
        >
          <svg class="w-4 h-4 shrink-0 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span class="whitespace-nowrap">Add New</span>
        </button>
  
        <!-- 5. Preview / Save (Mobile: Row 2 Right 50% | Desktop: Right Side Cluster) -->
        <button
          type="button"
          @click="$emit('open-preview')"
          class="order-5 lg:order-6 w-[calc(50%-5px)] sm:w-[calc(50%-6px)] lg:w-auto bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm py-2.5 px-2 sm:px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          title="Preview & Download Social Posters"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="whitespace-nowrap">Preview / Save</span>
        </button>
  
        <!-- FORCE ROW BREAK 2 (Mobile Only) -->
        <div class="order-6 w-full h-0 lg:hidden"></div>
  
        <!-- 7. Item Count (Mobile: Row 3 Left | Desktop: Right Side leading before Add New) -->
        <!-- mr-auto on Mobile pushes everything else in Row 3 to the far right -->
        <div class="order-7 lg:order-4 mr-auto lg:mr-0 flex items-center">
          <span class="text-sm md:text-md font-sans font-semibold px-3 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
            {{ itemCount }} {{ itemCount === 1 ? 'Item' : 'Items' }}
          </span>
        </div>
  
        <!-- 8. Import JSON + Info Guide Group (Mobile: Row 3 Right | Desktop: Right Side Cluster) -->
        <div class="order-8 lg:order-7 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            @click="$emit('open-import')"
            class="bg-[#030712] hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            title="Paste or Import JSON"
          >
            <svg class="w-4 h-4 text-[#0068fe] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="whitespace-nowrap">Import</span>
          </button>
  
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
  
        <!-- 9. Log Out (Mobile: Row 3 Far Right | Desktop: Right Side Anchor) -->
        <button
          type="button"
          @click="$emit('logout')"
          class="order-9 lg:order-8 bg-slate-800/80 hover:bg-red-500/15 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
        >
          Log Out
        </button>
  
      </div>
  
      <!-- CAPS Campaign Control Block -->
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

// Added 'add-new' to the emits array
defineEmits(['post', 'logout', 'open-preview', 'open-import', 'open-guide', 'update:capsTitle', 'update:capsDate', 'add-new'])
</script>