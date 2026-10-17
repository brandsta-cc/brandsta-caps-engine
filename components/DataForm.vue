<!-- components/DataForm.vue -->
<template>
  <div
    :draggable="isDraggable"
    class="data-form-card bg-slate-900/60 border p-2 sm:p-4 rounded-xl shadow-lg relative group transition-all"
    :data-index="index"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOver"
    @dragenter.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop="onDrop"
    @dragend="onDragEnd"
    :class="[
      (isDragging || isTouchDragging) ? 'opacity-40 scale-[0.99] border-[#0068fe] z-50 relative' : 'border-slate-800 hover:border-slate-700',
      isDragOver ? 'border-amber-500 ring-1 ring-amber-500/40' : ''
    ]"
  >
    <!-- TOP CONTROL BAR -->
    <div class="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-slate-800/80">
      <div class="flex items-center gap-2 min-w-0">
        <!-- DRAG GRIP HANDLE (Supports Mouse & Touch) -->
        <button
          type="button"
          @mouseenter="isDraggable = true"
          @mouseleave="isDraggable = false"
          @touchstart="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
          class="w-8 h-8 rounded-lg bg-[#030712] border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 transition-colors touch-none"
          title="Drag to reorder"
          aria-label="Drag to reorder"
        >
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5.5" cy="3.5" r="1.2" />
            <circle cx="10.5" cy="3.5" r="1.2" />
            <circle cx="5.5" cy="8" r="1.2" />
            <circle cx="10.5" cy="8" r="1.2" />
            <circle cx="5.5" cy="12.5" r="1.2" />
            <circle cx="10.5" cy="12.5" r="1.2" />
          </svg>
        </button>

        <span class="text-xs font-mono font-bold tracking-wider uppercase px-2 py-1 rounded bg-slate-800/80 text-slate-300 shrink-0">
          #{{ index + 1 }}
        </span>

        <span v-if="item.name" class="text-xs text-slate-400 truncate hidden sm:inline capitalize">
          {{ item.name }}
        </span>
      </div>

      <!-- Right Controls: Up / Down / Delete -->
      <div class="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          :disabled="index === 0"
          @click="$emit('move-up')"
          class="w-8 h-8 rounded-lg bg-[#030712] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
          title="Move Up"
          aria-label="Move item up"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>

        <button
          type="button"
          :disabled="index === total - 1"
          @click="$emit('move-down')"
          class="w-8 h-8 rounded-lg bg-[#030712] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
          title="Move Down"
          aria-label="Move item down"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <button
          type="button"
          @click="$emit('remove')"
          class="w-8 h-8 rounded-lg bg-[#030712] border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
          title="Delete Item"
          aria-label="Delete item"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- CATEGORY -->
    <fieldset class="mb-4 sm:mb-5">
      <legend class="block text-xs font-bold text-white uppercase tracking-wider mb-2">Category *</legend>
      <div class="flex flex-wrap gap-1.5 sm:gap-2">
        <label v-for="(cat, catIdx) in categories" :key="cat" :for="'cat-' + index + '-' + catIdx" class="cursor-pointer">
          <input 
            :id="'cat-' + index + '-' + catIdx"
            type="radio" 
            :value="cat" 
            v-model="item.category" 
            class="hidden peer"
            :name="'categoryName-' + index" 
          />
          <div 
            class="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#030712] border border-slate-800 rounded-lg text-xs sm:text-sm text-slate-400 transition-colors font-medium"
            :class="[
              cat.toLowerCase() === 'caps' ? 'peer-checked:bg-amber-500/10 peer-checked:border-amber-500 peer-checked:text-amber-400' : '',
              cat.toLowerCase() === 'multi-cuisine restaurant' ? 'peer-checked:bg-emerald-500/10 peer-checked:border-emerald-600 peer-checked:text-emerald-500' : '',
              cat.toLowerCase() === 'chill n chai' ? 'peer-checked:bg-[#d4a373]/10 peer-checked:border-[#d4a373] peer-checked:text-[#d4a373]' : '',
              cat.toLowerCase() === 'arabic corner' ? 'peer-checked:bg-[#8b5a2b]/10 peer-checked:border-[#ab7a4b] peer-checked:text-[#ab7a4b]' : ''
            ]"
          >
            {{ cat }}
          </div>
        </label>
      </div>
    </fieldset>

    <!-- ITEM NAME & PRICE -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-4">
      <div class="md:col-span-2">
        <label :for="'itemName-' + index" class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Item Name *</label>
        <div class="relative w-full">
          <input 
            :id="'itemName-' + index"
            v-model="item.name" 
            :name="'itemName-' + index"
            type="text" 
            maxlength="40" 
            placeholder="e.g. Ghee Roast Dosa" 
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-3.5 sm:px-4 py-2.5 pr-14 text-sm sm:text-base text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600 capitalize" 
          />
          <span 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono select-none transition-colors"
            :class="(item.name?.length || 0) >= 35 ? 'text-amber-500' : 'text-slate-500'"
          >
            {{ item.name?.length || 0 }}/40
          </span>
        </div>
      </div>
      <div>
        <label :for="'itemPrice-' + index" class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Price (Optional)</label>
        <div class="relative w-full">
          <input 
            :id="'itemPrice-' + index"
            v-model="item.price" 
            :name="'itemPrice-' + index"
            type="text" 
            maxlength="4"
            placeholder="e.g. 250 or Free" 
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-3.5 sm:px-4 py-2.5 pr-14 text-sm sm:text-base text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600 capitalize" 
          />
          <span 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono select-none transition-colors"
            :class="(item.price ? String(item.price).length : 0) >= 3 ? 'text-amber-500' : 'text-slate-500'"
          >
            {{ item.price ? String(item.price).length : 0 }}/4
          </span>
        </div>
      </div>
    </div>

    <!-- DIETARY TYPE & OFFERS / DETAILS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
      <div>
        <label :for="'isVegSelect-' + index" class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Dietary Type *</label>
        <select 
          :id="'isVegSelect-' + index"
          v-model="item.isVeg" 
          :name="'isVegSelect-' + index"
          class="w-full bg-[#030712] border border-slate-800 rounded-lg px-3.5 sm:px-4 py-2.5 text-sm sm:text-base text-white focus:outline-none focus:border-[#0068fe] transition-colors appearance-none"
        >
          <option :value="true">Vegetarian</option>
          <option :value="false">Non-Vegetarian</option>
        </select>
      </div>
      <div class="md:col-span-2">
        <label :for="'itemDescription-' + index" class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Offers / Details (Optional)</label>
        <div class="relative w-full">
          <input 
            :id="'itemDescription-' + index"
            v-model="item.description" 
            :name="'itemDescription-' + index"
            type="text" 
            maxlength="40" 
            placeholder="Offers / Details..." 
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-3.5 sm:px-4 py-2.5 pr-14 text-sm sm:text-base text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600 uppercase" 
          />
          <span 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono select-none transition-colors"
            :class="(item.description?.length || 0) >= 35 ? 'text-amber-500' : 'text-slate-500'"
          >
            {{ item.description?.length || 0 }}/40
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  authHeader: { type: String, required: true },
  index: { type: Number, default: 0 },
  total: { type: Number, default: 1 }
})

const emit = defineEmits(['remove', 'move-up', 'move-down', 'drag-reorder'])

const categories = ['CAPS', 'Multi-Cuisine Restaurant', 'Chill N Chai', 'Arabic Corner']

// Desktop HTML5 Drag State
const isDraggable = ref(false)
const isDragging = ref(false)
const isDragOver = ref(false)

// Mobile Touch State
const isTouchDragging = ref(false)
let lastSwapTime = 0

// --- DESKTOP DRAG & DROP ENGINE ---
const onDragStart = (e) => {
  isDragging.value = true
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', String(props.index))
}
const onDragOver = (e) => { e.dataTransfer.dropEffect = 'move' }
const onDrop = (e) => {
  isDragOver.value = false
  const fromIndex = Number(e.dataTransfer.getData('text/plain'))
  if (!Number.isNaN(fromIndex) && fromIndex !== props.index) {
    emit('drag-reorder', { from: fromIndex, to: props.index })
  }
}
const onDragEnd = () => {
  isDragging.value = false
  isDragOver.value = false
  isDraggable.value = false
}

// --- MOBILE TOUCH DRAG ENGINE ---
const onTouchStart = () => {
  isTouchDragging.value = true
}

const onTouchMove = (e) => {
  if (!isTouchDragging.value) return
  const touch = e.touches[0]
  const y = touch.clientY

  // 1. Mobile Edge Scrolling (Push the window if finger nears the top/bottom)
  if (y < 120) {
    window.scrollBy({ top: -18, behavior: 'auto' })
  } else if (y > window.innerHeight - 120) {
    window.scrollBy({ top: 18, behavior: 'auto' })
  }

  // 2. Element Swap Detection
  const targetEl = document.elementFromPoint(touch.clientX, y)
  const card = targetEl?.closest('.data-form-card')
  
  if (card) {
    const toIndex = Number(card.dataset.index)
    if (!isNaN(toIndex) && toIndex !== props.index) {
      const now = Date.now()
      // Throttle to prevent wild bouncing while scrolling
      if (now - lastSwapTime > 250) { 
        emit('drag-reorder', { from: props.index, to: toIndex })
        lastSwapTime = now
      }
    }
  }
}

const onTouchEnd = () => {
  isTouchDragging.value = false
}
</script>