<!-- components/EngineHeader.vue -->
<template>
  <div class="py-3 md:py-4 bg-[#030712] sticky top-22 z-40">
    <div class="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
      
      <!-- MASTER FLEX CONTAINER (Controls Desktop/Mobile Layout Without Duplicates) -->
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-3">
        
        <!-- 1. Title (Mobile: Row 1 Left | Desktop: Left Side) -->
        <h2 class="order-1 lg:order-1 mr-auto lg:mr-0 text-sm sm:text-lg font-bold text-white tracking-wide whitespace-nowrap">
          Hotel CAPS Specials
        </h2>
  
        <!-- 2A. Post Live (Mobile: Row 1 Right | Desktop: Left Cluster) -->
        <button
          type="button"
          :disabled="isLoading"
          @click="$emit('post')"
          class="order-2 lg:order-2 flex-none min-w-23 sm:min-w-25 bg-[#0068fe] hover:bg-blue-600 active:scale-[0.98] disabled:opacity-60 text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <span v-if="isLoading" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'Posting...' : 'Post Live' }}</span>
        </button>

        <!-- 2B. Last Updated Calendar Icon + Popover (lg:mr-auto pushes right cluster on Desktop) -->
        <div 
          ref="syncPopoverRef" 
          class="order-2 lg:order-2 lg:mr-auto relative flex items-center"
          @mouseenter="onHoverSync(true)"
          @mouseleave="onHoverSync(false)"
        >
          <button
            type="button"
            @click.stop="toggleSyncPopover"
            aria-label="View Last Live Sync Time"
            :aria-expanded="showSyncInfo"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#030712] hover:bg-slate-800 active:scale-95 text-slate-300 hover:text-white border border-slate-700/80 hover:border-emerald-500/50 flex items-center justify-center transition-all cursor-pointer relative"
          >
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span 
              v-if="lastUpdated" 
              class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#030712]"
            ></span>
          </button>

          <!-- Floating Timestamp Popover -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div 
              v-if="showSyncInfo"
              class="absolute right-0 lg:left-0 lg:right-auto top-full mt-2 w-60 rounded-xl bg-slate-950/95 border border-slate-700/90 p-3 shadow-2xl backdrop-blur-md z-50 text-left"
            >
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Last Posted Live
                </span>
                <span v-if="relativeSyncText" class="text-[10px] font-semibold text-slate-400">
                  {{ relativeSyncText }}
                </span>
              </div>
              <p class="text-xs font-semibold text-white">
                {{ formattedSyncDate }}
              </p>
            </div>
          </Transition>
        </div>

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
              placeholder="Limited Time Favourites" 
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  username: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  itemCount: { type: Number, default: 0 },
  hasCapsCategory: { type: Boolean, default: false },
  capsTitle: { type: String, default: 'SEASONAL SPECIALS' },
  capsDate: { type: String, default: 'LIMITED TIME FAVOURITES' },
  lastUpdated: { type: [String, Number, Date], default: null }
})

defineEmits(['post', 'logout', 'open-preview', 'open-import', 'open-guide', 'update:capsTitle', 'update:capsDate', 'add-new'])

const showSyncInfo = ref(false)
const syncPopoverRef = ref(null)
const nowTick = ref(Date.now())

const toggleSyncPopover = () => {
  nowTick.value = Date.now()
  showSyncInfo.value = !showSyncInfo.value
}

const onHoverSync = (state) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    if (state) nowTick.value = Date.now()
    showSyncInfo.value = state
  }
}

const formattedSyncDate = computed(() => {
  if (!props.lastUpdated) return 'No sync recorded yet'
  const d = new Date(props.lastUpdated)
  if (Number.isNaN(d.getTime())) return 'No sync recorded yet'
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(d)
})

const relativeSyncText = computed(() => {
  if (!props.lastUpdated) return ''
  const d = new Date(props.lastUpdated)
  if (Number.isNaN(d.getTime())) return ''
  const diffSec = Math.max(0, Math.floor((nowTick.value - d.getTime()) / 1000))
  if (diffSec < 60) return 'Just now'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`
  return `${Math.floor(diffSec / 86400)}d ago`
})

const handleOutsideClick = (e) => {
  if (showSyncInfo.value && syncPopoverRef.value && !syncPopoverRef.value.contains(e.target)) {
    showSyncInfo.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))
</script>