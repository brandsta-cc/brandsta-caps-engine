<!-- components/SpecialsPreviewModal.vue -->
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden"
      @click.self="$emit('close')"
    >
      <!-- 1. TOP BAR: Slide Info, Editable Date & Close -->
      <div class="w-full max-w-4xl mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 z-20">
        
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {{ slides.length ? `${activeIndex + 1} / ${slides.length}` : '0 / 0' }}
          </span>
          <span v-if="currentSlide" class="text-xs sm:text-sm font-bold text-white truncate max-w-[160px] sm:max-w-none">
            {{ currentSlide.categoryLabel }}
            <span v-if="currentSlide.totalPages > 1" class="text-slate-400 font-normal">
              (Part {{ currentSlide.pageNumber }}/{{ currentSlide.totalPages }})
            </span>
          </span>
        </div>

        <!-- Editable Poster Date -->
        <div class="flex items-center gap-1.5 grow sm:grow-0 justify-end">
          <label :for="isCurrentSlideCaps ? 'campaignDateInput' : 'outletDateInput'" class="text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden md:inline">Date:</label>
          <!-- Conditional Title/Date Editor in Preview -->
          <div class="flex items-center gap-2 sm:gap-3 mr-2 sm:mr-4">            
            <!-- CAPS Campaign Date (Binds to the prop from parent) -->
            <input 
              v-if="isCurrentSlideCaps"
              :value="capsDate" 
              id="campaignDateInput"
              name="campaignDate"
              @input="$emit('update:capsDate', $event.target.value)"
              type="text"
              maxlength="30"
              aria-label="Campaign Date"
              class="bg-[#030712] border border-slate-800 rounded-md px-3 py-1 text-xs text-amber-50 focus:outline-none focus:border-[#0068fe] transition-colors font-mono uppercase text-center w-[160px] sm:w-[220px] h-7 sm:h-8"
            />
            
            <!-- Standard Outlet Date (Binds to your local customDateText) -->
            <input 
              v-else
              v-model="customDateText" 
              :placeholder="getFormattedToday()"
              id="outletDateInput"
              name="outletDate"
              maxlength="30"
              type="text"
              aria-label="Poster Date"
              class="bg-[#030712] border border-slate-800 rounded-md px-3 py-1 text-xs text-amber-50 focus:outline-none focus:border-[#0068fe] transition-colors font-mono uppercase text-center w-[160px] sm:w-[220px] h-7 sm:h-8"
            />
          </div>
          <button
            type="button"
            @click="$emit('close')"
            class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer ml-1 transition-colors"
            title="Close Preview"
            aria-label="Close Preview"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 2. CENTER STAGE: 9:16 Poster Slideshow (Clicking outside poster closes modal) -->
      <div
        class="relative grow flex items-center justify-center my-2 overflow-hidden"
        @click.self="$emit('close')"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div
          v-if="slides.length === 0"
          class="text-center text-slate-400 p-8 bg-slate-900/60 rounded-2xl border border-slate-800"
        >
          No valid menu items with a name yet. Add at least one item to generate posters.
        </div>

        <template v-else>
          <!-- Previous Slide Button (Larger SVG Chevron) -->
          <button
            v-if="slides.length > 1"
            type="button"
            @click.stop.prevent="prevSlide"
            class="absolute left-1 sm:left-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/85 hover:bg-amber-600 text-white border border-slate-700 hover:border-amber-500 flex items-center justify-center shadow-xl transition-all cursor-pointer"
            aria-label="Previous Poster"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7 -ml-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- Poster Viewport -->
          <div class="relative h-full max-h-[68vh] sm:max-h-[72vh] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black flex items-center justify-center">
            <div v-if="isRendering" class="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-2 z-10">
              <span class="w-7 h-7 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></span>
              <span class="text-xs text-amber-200 font-medium">Rendering 900×1600 JPEG...</span>
            </div>
            <img
              v-if="renderedObjectUrls[activeIndex]"
              :src="renderedObjectUrls[activeIndex]"
              :alt="currentSlide?.fileName || 'Specials Poster'"
              class="w-full h-full object-contain"
              draggable="false"
            />
          </div>

          <!-- Next Slide Button (Larger SVG Chevron) -->
          <button
            v-if="slides.length > 1"
            type="button"
            @click.stop.prevent="nextSlide"
            class="absolute right-1 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/85 hover:bg-amber-600 text-white border border-slate-700 hover:border-amber-500 flex items-center justify-center shadow-xl transition-all cursor-pointer"
            aria-label="Next Poster"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </template>
      </div>

      <!-- 3. BOTTOM BAR: Save All, Save This & Native Share Icon -->
      <div
        v-if="slides.length > 0"
        class="w-full max-w-lg mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl p-2.5 sm:p-3 z-20"
      >
        <div class="flex items-center gap-2">
          
          <!-- Save All Button -->
          <button
            type="button"
            :disabled="isRendering || isDownloading"
            @click.prevent="downloadAllPosters"
            class="flex-1 bg-[#0068fe] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span>Save All ({{ slides.length }})</span>
          </button>

          <!-- Save This Button -->
          <button
            type="button"
            :disabled="isRendering || isDownloading"
            @click.prevent="downloadCurrentPoster"
            class="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white border border-slate-700 font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Save This</span>
          </button>

          <!-- Share Icon Button (3-Circle Node Icon Only) -->
          <button
            type="button"
            :disabled="isRendering || !canShare"
            @click.prevent="shareCurrentPoster"
            class="w-11 sm:w-12 h-10 sm:h-11 bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 text-amber-300 border border-amber-500/40 rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
            title="Share Image"
            aria-label="Share Image"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  specials: { type: Array, required: true },
  capsTitle: { type: String, default: 'SEASONAL SPECIALS' },
  capsDate: { type: String, default: 'LIMITED TIME FAVOURITES' }
})

const emit = defineEmits(['close', 'update:capsTitle', 'update:capsDate'])

// This dynamically updates whenever activeIndex / currentSlide changes
const isCurrentSlideCaps = computed(() => {
  const thisSlide = currentSlide?.value || {}
  const rawCategory = thisSlide.category || thisSlide.categoryLabel || thisSlide.name || ''
  return String(rawCategory).trim().toUpperCase() === 'CAPS'
})

const toTitleCase = (str) => {
  if (!str) return '';
  // Converts "GHEE roast dosa" -> "Ghee Roast Dosa"
  return String(str).trim().toLowerCase().split(/\s+/).map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : '').join(' ');
}

// Strictly capped at 6 items per poster so font sizes never shrink below readable threshold
const MAX_ITEMS_PER_SLIDE = 6

const CATEGORY_CONFIG = [
  {
    key: 'CAPS',
    subtitle: 'HOTEL CAPS SPECIALS',
    slug: 'CAPS',
    bgSrc: '/images/bg-caps.png',
    fallbackGradient: ['#432818', '#1f1108'],
    cardBg: 'rgba(42, 24, 14, 0.84)',
    cardBorder: 'rgba(212, 163, 115, 0.45)',
    headingColor: '#1f2937',
    subtitleColor: '#292524',
    dateColor: '#292524',
    topLogoDarkText: true,
    accentColor: '#e6b86a'
  },
  {
    key: 'Multi-Cuisine Restaurant',
    subtitle: 'MULTI-CUISINE RESTAURANT',
    slug: 'Restaurant',
    bgSrc: '/images/bg-restaurant.png',
    fallbackGradient: ['#072a16', '#03140a'],
    cardBg: 'rgba(4, 24, 12, 0.73)',
    cardBorder: 'rgba(212, 175, 55, 0.34)',
    headingColor: '#f6e7c1',
    subtitleColor: '#f8fafc',
    dateColor: '#f1f5f9',
    topLogoDarkText: false,
    accentColor: '#d4af37'
  },
  {
    key: 'Chill N Chai',
    subtitle: "CHILL N' CHAI",
    slug: 'Chill-N-Chai',
    bgSrc: '/images/bg-chill-n-chai.png',
    fallbackGradient: ['#4a2511', '#1c0d06'],
    cardBg: 'rgba(38, 18, 9, 0.82)',
    cardBorder: 'rgba(218, 165, 105, 0.42)',
    headingColor: '#f6e7c1',
    subtitleColor: '#fffbeb',
    dateColor: '#fef3c7',
    topLogoDarkText: false,
    accentColor: '#e0a96d'
  },
  {
    key: 'Arabic Corner',
    subtitle: 'ARABIC CORNER',
    slug: 'Arabic-Corner',
    bgSrc: '/images/bg-arabic-corner.png',
    fallbackGradient: ['#361e10', '#140a04'],
    cardBg: 'rgba(32, 16, 8, 0.82)',
    cardBorder: 'rgba(212, 163, 89, 0.45)',
    headingColor: '#f6e7c1',
    subtitleColor: '#fef3c7',
    dateColor: '#f8fafc',
    topLogoDarkText: false,
    accentColor: '#d4a359'
  }
]

const getFormattedToday = () => {
  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const day = String(now.getDate()).padStart(2, '0')
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const year = now.getFullYear()
  return `${weekday} · ${day} ${month} ${year}`
}

const getFileDateStamp = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const customDateText = ref(getFormattedToday())
const activeIndex = ref(0)
const isRendering = ref(false)
const isDownloading = ref(false)

const renderedObjectUrls = ref([])
const renderedBlobs = ref([])
let touchStartX = 0

const slides = computed(() => {
  const validItems = props.specials.filter(item => item.name && item.name.trim().length > 0)
  const result = []
  const dateStamp = getFileDateStamp()

  CATEGORY_CONFIG.forEach((catConfig) => {
    const branchItems = validItems.filter(
      item => (item.category || '').toLowerCase() === catConfig.key.toLowerCase()
    )
    if (!branchItems.length) return

    const totalPages = Math.ceil(branchItems.length / MAX_ITEMS_PER_SLIDE)
    
    // Mathematical distribution engine
    const baseItemsPerPage = Math.floor(branchItems.length / totalPages)
    let remainder = branchItems.length % totalPages
    let currentIndex = 0

    for (let page = 0; page < totalPages; page++) {
      // Distribute remainder evenly across the first available pages
      const itemsForThisPage = baseItemsPerPage + (remainder > 0 ? 1 : 0)
      remainder--

      const chunk = branchItems.slice(currentIndex, currentIndex + itemsForThisPage)
      currentIndex += itemsForThisPage

      const suffix = totalPages > 1 ? `-${page + 1}` : ''
      result.push({
        categoryKey: catConfig.key,
        categoryLabel: catConfig.key,
        config: catConfig,
        items: chunk,
        pageNumber: page + 1,
        totalPages,
        fileName: `${dateStamp}-CAPS-${catConfig.slug}${suffix}.jpg`
      })
    }
  })
  return result
})

const currentSlide = computed(() => slides.value[activeIndex.value] || null)

const imageCache = new Map()
const loadImage = (src) => {
  if (imageCache.has(src)) return Promise.resolve(imageCache.get(src))
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageCache.set(src, img)
      resolve(img)
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// Center-aligned tracked text
const drawTrackedTextCenter = (ctx, text, centerX, y, trackingPx) => {
  const chars = String(text).split('')
  if (!chars.length) return
  const totalWidth = chars.reduce((acc, ch) => acc + ctx.measureText(ch).width, 0) + trackingPx * (chars.length - 1)
  let currentX = centerX - totalWidth / 2
  const prevAlign = ctx.textAlign
  ctx.textAlign = 'left'
  chars.forEach((ch) => {
    ctx.fillText(ch, currentX, y)
    currentX += ctx.measureText(ch).width + trackingPx
  })
  ctx.textAlign = prevAlign
}

// Left-aligned tracked text with optional max-width compression
const drawTrackedTextLeft = (ctx, text, leftX, y, trackingPx, maxWidth = null) => {
  const chars = String(text).split('')
  if (!chars.length) return 0
  const rawWidth = chars.reduce((acc, ch) => acc + ctx.measureText(ch).width, 0) + trackingPx * (chars.length - 1)
  const scaleX = maxWidth && rawWidth > maxWidth ? maxWidth / rawWidth : 1

  ctx.save()
  ctx.textAlign = 'left'
  if (scaleX < 1) {
    ctx.translate(leftX, 0)
    ctx.scale(scaleX, 1)
    let curX = 0
    chars.forEach((ch) => {
      ctx.fillText(ch, curX, y)
      curX += ctx.measureText(ch).width + trackingPx
    })
  } else {
    let curX = leftX
    chars.forEach((ch) => {
      ctx.fillText(ch, curX, y)
      curX += ctx.measureText(ch).width + trackingPx
    })
  }
  ctx.restore()
  return Math.min(rawWidth, maxWidth || rawWidth)
}

// Right-aligned tracked text
const drawTrackedTextRight = (ctx, text, rightX, y, trackingPx) => {
  const chars = String(text).split('')
  if (!chars.length) return 0
  const totalWidth = chars.reduce((acc, ch) => acc + ctx.measureText(ch).width, 0) + trackingPx * (chars.length - 1)
  let currentX = rightX - totalWidth
  const prevAlign = ctx.textAlign
  ctx.textAlign = 'left'
  chars.forEach((ch) => {
    ctx.fillText(ch, currentX, y)
    currentX += ctx.measureText(ch).width + trackingPx
  })
  ctx.textAlign = prevAlign
  return totalWidth
}

const drawOrnamentalLine = (ctx, centerX, y, width, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.moveTo(centerX - width / 2, y)
  ctx.lineTo(centerX - 18, y)
  ctx.moveTo(centerX + 18, y)
  ctx.lineTo(centerX + width / 2, y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(centerX, y - 6)
  ctx.lineTo(centerX + 8, y)
  ctx.lineTo(centerX, y + 6)
  ctx.lineTo(centerX - 8, y)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// --- CUSTOM VECTOR FOOTER ICONS ---
const drawGlobeIcon = (ctx, x, y, size, color) => {
  const r = size / 2
  const cx = x + r
  const cy = y + r
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1.9
  // Outer circle
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.stroke()
  // Inner meridian ellipse
  ctx.beginPath()
  ctx.ellipse(cx, cy, r * 0.48, r, 0, 0, Math.PI * 2)
  ctx.stroke()
  // Horizontal latitude lines
  ctx.beginPath()
  ctx.moveTo(cx - r * 0.92, cy - r * 0.35)
  ctx.lineTo(cx + r * 0.92, cy - r * 0.35)
  ctx.moveTo(cx - r * 0.92, cy + r * 0.35)
  ctx.lineTo(cx + r * 0.92, cy + r * 0.35)
  ctx.stroke()
  ctx.restore()
}

const drawPhoneIcon = (ctx, x, y, size, color) => {
  ctx.save()
  ctx.translate(x, y)
  const scale = size / 24
  ctx.scale(scale, scale)
  ctx.fillStyle = color
  const path = new Path2D(
    'M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z'
  )
  ctx.fill(path)
  ctx.restore()
}

const drawInstaIcon = (ctx, x, y, size, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = size * 0.085
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  roundRect(ctx, x, y, size, size, size * 0.26)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(x + size / 2, y + size / 2, size * 0.24, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(x + size * 0.76, y + size * 0.24, size * 0.055, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

const drawFbIcon = (ctx, x, y, size, color) => {
  ctx.save()
  ctx.beginPath()
  roundRect(ctx, x, y, size, size, size * 0.22)
  ctx.fillStyle = color
  ctx.fill()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.font = `800 ${size * 1}px "Inter", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('f', x + size * 0.58, y + size * 0.56)
  ctx.restore()
}

// --- CORE 900x1600 CANVAS RENDERER ---
const renderSlideToCanvas = async (slide) => {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 1600
  const ctx = canvas.getContext('2d')
  const cfg = slide.config

  // 1. Background
  const bgImg = await loadImage(cfg.bgSrc)
  if (bgImg) {
    ctx.drawImage(bgImg, 0, 0, 900, 1600)
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, 1600)
    grad.addColorStop(0, cfg.fallbackGradient[0])
    grad.addColorStop(1, cfg.fallbackGradient[1])
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 900, 1600)
  }

  // 2. Official Hotel CAPS Logo (~15% larger: 142px wide)
  const logoImg = await loadImage('/images/caps-solid-logo.png')
  if (logoImg) {
    const logoW = 146
    const logoH = Math.round(logoW * (267 / 300))
    ctx.drawImage(logoImg, (900 - logoW) / 2, 46, logoW, logoH)
  }

  // 3. "HOTEL" & "CAPS" in Faculty Glyphic (White on dark backgrounds)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = cfg.topLogoDarkText ? '#1e293b' : '#ffffff'

  ctx.font = '600 36px "Faculty Glyphic", serif'
  drawTrackedTextCenter(ctx, 'HOTEL', 450, 224, 9)

  ctx.font = '700 72px "Faculty Glyphic", serif'
  drawTrackedTextCenter(ctx, 'CAPS', 450, 300, 6)

  // 4. Outlet Subtitle (Inter, NO 1/2 page indicator)
  drawOrnamentalLine(ctx, 450, 328, 360, cfg.accentColor)
  ctx.fillStyle = cfg.subtitleColor
  ctx.font = '600 25px "Inter", sans-serif'
  drawTrackedTextCenter(ctx, cfg.subtitle, 450, 365, 6)
  drawOrnamentalLine(ctx, 450, 386, 360, cfg.accentColor)

  // 5. Dynamic Header (Uses Campaign Title for CAPS, defaults to TODAY'S SPECIALS)
  // Check the SPECIFIC slide being drawn, not the global active slide
  const rawCat = slide.category || slide.categoryLabel || slide.name || ''
  const isCapsSlide = String(rawCat).trim().toUpperCase() === 'CAPS'

  const headerText = isCapsSlide && props.capsTitle
    ? String(props.capsTitle).toUpperCase() 
    : "TODAY’S SPECIALS"

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.24)'
  ctx.shadowBlur = 12
  ctx.fillStyle = cfg.headingColor
  ctx.font = isCapsSlide ? '700 66px "Faculty Glyphic", serif' : '700 72px "Faculty Glyphic", serif'
  drawTrackedTextCenter(ctx, headerText, 450, 470, 0.35)
  ctx.restore()

  drawOrnamentalLine(ctx, 450, 500, 450, cfg.accentColor)

  // 6. Dynamic Date (Uses Campaign Date for CAPS, defaults to daily override/formatted date)
  const dateText = isCapsSlide && props.capsDate
    ? String(props.capsDate).toUpperCase()
    : (customDateText.value || getFormattedToday()).toUpperCase()

  ctx.fillStyle = cfg.dateColor
  ctx.font = '500 24px "Inter", sans-serif'
  drawTrackedTextCenter(ctx, dateText, 450, 540, 4)

  // 7. Menu Items Stage (Cases 1 to 6 — Bumped ~8-10% on Title & ~15% on Offer/Description)
  const items = slide.items
  const count = items.length

  const scaleConfig = {
    1: { rowH: 175, nameSize: 48, descSize: 24, priceSize: 46, iconSize: 38, padY: 47 },
    2: { rowH: 162, nameSize: 44, descSize: 23, priceSize: 43, iconSize: 36, padY: 40 },
    3: { rowH: 148, nameSize: 42, descSize: 22, priceSize: 41, iconSize: 34, padY: 34 },
    4: { rowH: 136, nameSize: 40, descSize: 21, priceSize: 39, iconSize: 32, padY: 30 },
    5: { rowH: 128, nameSize: 38, descSize: 20, priceSize: 38, iconSize: 31, padY: 26 },
    6: { rowH: 122, nameSize: 36, descSize: 19.5, priceSize: 36, iconSize: 30, padY: 24 }
  }[Math.min(6, Math.max(1, count))]

  const stageTop = 554
  const stageBottom = 1388
  const stageHeight = stageBottom - stageTop
  const cardH = Math.min(stageHeight, count * scaleConfig.rowH + scaleConfig.padY * 2)
  const cardY = stageTop + (stageHeight - cardH) / 2
  const cardX = 40
  const cardW = 900 - cardX * 2

  ctx.save()
  roundRect(ctx, cardX, cardY, cardW, cardH, 26)
  ctx.fillStyle = cfg.cardBg
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = cfg.cardBorder
  ctx.stroke()
  ctx.restore()

  items.forEach((item, idx) => {
    const rowTop = cardY + scaleConfig.padY + idx * scaleConfig.rowH
    const rowCenterY = rowTop + scaleConfig.rowH / 2
    const hasDesc = Boolean(item.description && String(item.description).trim())
    const hasPrice = Boolean(item.price && String(item.price).trim())

    // Veg / Non-Veg Badge
    const iconX = cardX + 28
    const iconS = scaleConfig.iconSize
    const iconY = rowCenterY - iconS / 2
    const badgeColor = item.isVeg ? '#22c55e' : '#ef4444'

    ctx.save()
    ctx.strokeStyle = badgeColor
    ctx.lineWidth = 2.6
    ctx.strokeRect(iconX, iconY, iconS, iconS)
    ctx.fillStyle = badgeColor
    ctx.beginPath()
    ctx.arc(iconX + iconS / 2, iconY + iconS / 2, iconS * 0.28, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    const textLeftX = iconX + iconS + 24
    const dividerX = cardX + cardW - 125 
    const maxTextW = hasPrice ? (dividerX - textLeftX - 18) : (cardX + cardW - 36 - textLeftX)

    // Dish Title & Offer Description
    const formattedName = toTitleCase(item.name)
    ctx.fillStyle = '#ffffff'
    ctx.font = `600 ${scaleConfig.nameSize}px "Faculty Glyphic", serif`

    if (hasDesc) {
      drawTrackedTextLeft(ctx, formattedName, textLeftX, rowCenterY - 6, 1.2, maxTextW)
      ctx.fillStyle = cfg.accentColor
      ctx.font = `600 ${scaleConfig.descSize}px "Inter", sans-serif`
      const formattedDesc = String(item.description).trim().toUpperCase()
      drawTrackedTextLeft(ctx, formattedDesc, textLeftX, rowCenterY + scaleConfig.descSize + 9, 1.5, maxTextW)
    } else {
      drawTrackedTextLeft(ctx, formattedName, textLeftX, rowCenterY + scaleConfig.nameSize * 0.34, 1.2, maxTextW)
    }

    // Price & Vertical Divider
    if (hasPrice) {
      
      // Strict check: if rawPrice contains ONLY numbers, it's numeric. 
      // If it has letters (like "Free" or "TBD"), it skips the currency symbol.
      const rawPrice = String(item.price).replace(/₹/g, '').trim()
      const isNumeric = /^\d+$/.test(rawPrice)
      const finalPriceText = isNumeric ? `₹${rawPrice}` : rawPrice

      // 1. Draw the Vertical Divider
      ctx.save()
      ctx.strokeStyle = cfg.accentColor
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(dividerX, rowCenterY - scaleConfig.rowH * 0.3)
      ctx.lineTo(dividerX, rowCenterY + scaleConfig.rowH * 0.3)
      ctx.stroke()
      ctx.restore()

      // 2. Setup Price Typography
      ctx.save()
      ctx.fillStyle = '#ffffff'
      ctx.font = `600 ${scaleConfig.priceSize}px "Faculty Glyphic", serif`

      const tracking = 1.5
      const priceAnchorX = cardX + cardW - 34
      const priceAnchorY = rowCenterY + scaleConfig.priceSize * 0.34
      
      // 3. Mathematical Shrink-to-Fit Engine
      // Max width = distance from divider to the right padding, minus a 16px safety gap
      const maxPriceW = (cardX + cardW - 34) - dividerX - 16
      
      // Measure raw width + tracking
      const rawWidth = ctx.measureText(finalPriceText).width + (finalPriceText.length * tracking)
      
      // If it exceeds the boundary, scale the context proportionately from the right anchor
      if (rawWidth > maxPriceW) {
        const shrinkScale = maxPriceW / rawWidth
        ctx.translate(priceAnchorX, priceAnchorY)
        ctx.scale(shrinkScale, shrinkScale)
        ctx.translate(-priceAnchorX, -priceAnchorY)
      }

      drawTrackedTextRight(ctx, finalPriceText, priceAnchorX, priceAnchorY, tracking)
      ctx.restore()
    }

    // Bottom Row Separator
    if (idx < count - 1) {
      const lineY = rowTop + scaleConfig.rowH
      drawOrnamentalLine(ctx, 450, lineY, cardW - 76, 'rgba(212, 175, 55, 0.38)')
    }
  })

  // 8. FOOTER ROW 1 (Scaled up ~15% | Y = 1496)
  const row1Y = 1476
  const iconSize = 28 // Increased from 24
  ctx.save()
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.font = '500 26px "Inter", sans-serif' // Increased from 22

  // Left: [Globe] capsfamily.in
  drawGlobeIcon(ctx, 48, row1Y - iconSize / 2, iconSize, '#ffffff')
  ctx.textAlign = 'left'
  ctx.fillText('capsfamily.in', 48 + iconSize + 12, row1Y)

  // Center: [Phone] +91 92075 17064
  drawPhoneIcon(ctx, 294, row1Y - iconSize / 2, iconSize, '#ffffff')
  ctx.textAlign = 'left'
  ctx.fillText('+91 92075 17064', 294 + iconSize + 6, row1Y)

  // Right: [FB] hotelcapsfamily [Insta]
  const rightEdge = 852
  const instaX = rightEdge - iconSize
  drawInstaIcon(ctx, instaX, row1Y - iconSize / 2, iconSize, '#ffffff')

  const handleText = 'hotelcapsfamily'
  ctx.font = '500 26px "Inter", sans-serif' // Increased from 20
  const handleWidth = ctx.measureText(handleText).width
  const handleRightX = instaX - 12
  ctx.textAlign = 'right'
  ctx.fillText(handleText, handleRightX, row1Y)

  const fbX = handleRightX - handleWidth - 12 - iconSize
  drawFbIcon(ctx, fbX, row1Y - iconSize / 2, iconSize, '#ffffff')
  ctx.restore()


  // 9. FOOTER ROW 2
  // We use an explicit baseline Y coordinate so the text and the flat bottom of the logo align perfectly.
  const row2BaselineY = 1550 
  ctx.save()
  ctx.textBaseline = 'alphabetic'

  // Left: STAY · DINE · CELEBRATE
  ctx.fillStyle = '#ffcc00'
  ctx.font = '700 26px "Inter", sans-serif'
  drawTrackedTextLeft(ctx, 'STAY · DINE · CELEBRATE', 48, row2BaselineY, 3.2)

  // Right: POWERED BY [Logo] BRANDSTA
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 24px "Inter", sans-serif'
  const brandstaW = drawTrackedTextRight(ctx, 'BRANDSTA', 852, row2BaselineY, 2.5)

  const brandstaLogo = await loadImage('/images/brandsta-logo.png')
  let logoOffset = 852 - brandstaW - 12
  
  if (brandstaLogo) {
    const bLogoH = 36 // Increased from 30
    const bLogoW = Math.round(bLogoH * ((brandstaLogo.width || 100) / (brandstaLogo.height || 100)))
    logoOffset -= bLogoW
    
    ctx.drawImage(brandstaLogo, logoOffset, row2BaselineY - bLogoH + 2, bLogoW, bLogoH)
    logoOffset -= 12
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.89)'
  ctx.font = '500 20px "Inter", sans-serif'
  drawTrackedTextRight(ctx, 'POWERED BY', logoOffset, row2BaselineY, 1.8)
  ctx.restore()
  
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92))
  const objectUrl = URL.createObjectURL(blob)

  return { objectUrl, blob }
}

const renderAllSlides = async () => {
  if (!props.isOpen || slides.value.length === 0) return
  isRendering.value = true
  
  try {
    // FORCE CANVAS FONT RESOLUTION
    if (typeof document !== 'undefined' && document.fonts) {
      await document.fonts.load('600 16px "Faculty Glyphic"')
      await document.fonts.load('500 16px "Inter"')
      await document.fonts.ready
    }
    
    renderedObjectUrls.value.forEach(url => URL.revokeObjectURL(url))

    const urls = []
    const blobs = []

    for (const slide of slides.value) {
      await new Promise(r => setTimeout(r, 40))
      const { objectUrl, blob } = await renderSlideToCanvas(slide)
      urls.push(objectUrl)
      blobs.push(blob)
    }

    renderedObjectUrls.value = urls
    renderedBlobs.value = blobs
    if (activeIndex.value >= slides.value.length) activeIndex.value = 0
  } finally {
    isRendering.value = false
  }
}

watch(() => [props.isOpen, customDateText.value, slides.value], () => {
  if (props.isOpen) renderAllSlides()
}, { deep: true })

onUnmounted(() => {
  renderedObjectUrls.value.forEach(url => URL.revokeObjectURL(url))
})

const nextSlide = () => {
  if (!slides.value.length) return
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}
const prevSlide = () => {
  if (!slides.value.length) return
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
}
const onTouchStart = (e) => {
  if (e.touches?.[0]) touchStartX = e.touches[0].clientX
}
const onTouchEnd = (e) => {
  if (!e.changedTouches?.[0]) return
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prevSlide()
}

// DOWNLOAD ENGINE
const triggerDownload = (objectUrl, fileName) => {
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadCurrentPoster = () => {
  const slide = currentSlide.value
  const url = renderedObjectUrls.value[activeIndex.value]
  if (!slide || !url) return
  triggerDownload(url, slide.fileName)
}

const downloadAllPosters = async () => {
  if (!slides.value.length) return
  isDownloading.value = true
  try {
    for (let i = 0; i < slides.value.length; i++) {
      triggerDownload(renderedObjectUrls.value[i], slides.value[i].fileName)
      await new Promise(r => setTimeout(r, 800))
    }
  } finally {
    isDownloading.value = false
  }
}

// NATIVE FILE SHARING ENGINE
const canShare = computed(() => {
  return typeof navigator !== 'undefined' && !!navigator.canShare
})

const shareCurrentPoster = async () => {
  const slide = currentSlide.value
  const blob = renderedBlobs.value[activeIndex.value]
  if (!slide || !blob) return

  const file = new File([blob], slide.fileName, { type: 'image/jpeg' })

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: slide.fileName
      })
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err)
    }
  } else {
    alert('Direct file sharing is not supported by your current browser. Please use the Save button.')
  }
}
</script>