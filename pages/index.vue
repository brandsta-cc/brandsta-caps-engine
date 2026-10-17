<!-- pages/index.vue -->
<template>
  <div class="relative">
    
    <!-- Authenticator -->
    <AuthGate 
      v-if="!isLoggedIn" 
      v-model:auth="auth" 
      :error="globalError"
      :is-loading="isLoading" 
      @login="authenticate" 
    />

    <!-- Main Dashboard -->
    <div v-else class="px-2 sm:px-3 md:px-6 py-0 min-h-[calc(100vh-93px)] lg:h-[calc(100vh-93px)] gap-0 flex flex-col">
      <EngineHeader 
        :username="auth.username"
        :isLoading="isLoading"
        :itemCount="specials.length"
        :hasCapsCategory="hasCapsCategory"
        v-model:capsTitle="capsTitle"
        v-model:capsDate="capsDate"
        @post="postToWordPress" 
        @logout="isLogoutModalOpen = true" 
        @open-preview="isPreviewOpen = true"
        @open-import="openImportModal('import')"
        @open-guide="openImportModal('guide')"
        @add-new="addNewSpecial"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 grow lg:overflow-hidden pb-4">
        
        <!-- Left Side: Reorderable Data Forms -->
        <section 
          id="scroll-container"
          @dragover.prevent="onContainerDragOver"
          class="lg:col-span-7 lg:overflow-y-auto lg:pr-2 space-y-4 sm:space-y-6 custom-scrollbar relative"
        >
          
          <TransitionGroup name="list" tag="div" class="space-y-4 sm:space-y-6">
            <DataForm 
              v-for="(item, index) in specials" 
              :key="item.id" 
              :id="'item-' + item.id"
              :item="item" 
              :index="index"
              :total="specials.length"
              :auth-header="authHeader" 
              @remove="removeSpecial(index)"
              @move-up="moveSpecial(index, index - 1)"
              @move-down="moveSpecial(index, index + 1)"
              @drag-reorder="({ from, to }) => moveSpecial(from, to)"
            />
          </TransitionGroup>

        </section>

        <!-- Right Side: Live Payload (Desktop Only) -->
        <LivePayload class="lg:col-span-5" :specials="specials" />
        
      </div>
    </div>

    <!-- JSON Import & AI Guide Modal -->
    <JsonImportModal
      :is-open="isImportOpen"
      :initial-tab="importModalTab"
      @close="isImportOpen = false"
      @load-json="handleJsonLoaded"
    />

    <!-- 9:16 Specials Poster Preview & Download Modal -->
    <SpecialsPreviewModal
      :is-open="isPreviewOpen"
      :specials="specials"
      v-model:capsTitle="capsTitle"
      v-model:capsDate="capsDate"
      @close="isPreviewOpen = false"
    />

    <!-- Logout Confirmation Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isLogoutModalOpen" 
        @click.self="isLogoutModalOpen = false"
        class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
          
          <!-- Warning Icon -->
          <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-2">Confirm Logout</h3>
          <p class="text-slate-400 text-sm mb-6 leading-relaxed">
            Are you sure you want to log out? Any unpublished changes to your menu items will be lost.
          </p>
          
          <!-- Action Buttons -->
          <div class="flex items-center gap-3 w-full">
            <button 
              @click="isLogoutModalOpen = false" 
              class="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              @click="executeLogout" 
              class="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
            >
              Log Out
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'


// Add these variables to store your global campaign logic
const capsTitle = ref('SEASONAL SPECIALS')
const capsDate = ref('LIMITED TIME FAVOURITES')

// This instantly detects if ANY item in the array is a CAPS item
const hasCapsCategory = computed(() => {
  return specials.value.some(item => item.category === 'CAPS')
})

// Update your livePayload computed property (or your save function) to inject the fields
const livePayload = computed(() => {
  return specials.value.map(item => {
    if (item.category === 'CAPS') {
      // Inject the global campaign data strictly into CAPS objects
      return { 
        ...item, 
        customTitle: capsTitle.value, 
        customDate: capsDate.value 
      }
    }
    return item
  })
})

// -- SAFE STORAGE WRAPPER (Only for WP App Password) --
const safeStorage = {
  get(key) {
    if (typeof window === 'undefined') return null
    try { return window.localStorage.getItem(key) }
    catch (e) { return null }
  },
  set(key, value) {
    if (typeof window === 'undefined') return
    try { window.localStorage.setItem(key, value) }
    catch (e) { console.warn('Storage disabled by browser settings. Proceeding in memory.') }
  },
  remove(key) {
    if (typeof window === 'undefined') return
    try { window.localStorage.removeItem(key) }
    catch (e) {}
  }
}

// -- STATE --
const isLoggedIn = ref(false)
const isLoading = ref(false)
const globalError = ref('')
const isDirty = ref(false)
const PAGE_ID = ref(null)

// Modal States
const isImportOpen = ref(false)
const importModalTab = ref('import')
const isPreviewOpen = ref(false)
const isLogoutModalOpen = ref(false)

const openImportModal = (tab = 'import') => {
  importModalTab.value = tab
  isImportOpen.value = true
}

const auth = ref({
  username: 'hotelcapsfamily',
  password: ''
})

const specials = ref([])
const authHeader = computed(() => btoa(`${auth.value.username}:${auth.value.password}`))

// -- AUTH & FETCH --
const checkLocalAuth = () => {
  const savedPass = safeStorage.get('caps_app_pass')
  if (savedPass) {
    auth.value.password = savedPass
    authenticate()
  }
}

const authenticate = async () => {
  isLoading.value = true
  globalError.value = ''
  
  if (auth.value.username !== 'hotelcapsfamily') {
    globalError.value = 'Unauthorized Account. Please use hotelcapsfamily.'
    isLoading.value = false
    return
  }

  try {
    await $fetch('/api/verify', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${authHeader.value}` }
    })
    
    const wpUrl = 'https://public-api.wordpress.com/wp/v2/sites/hotelcapsfamily.wordpress.com/pages?slug=specials-data'
    const response = await fetch(wpUrl)
    
    if (!response.ok) throw new Error('Failed to retrieve target page data.')
    
    const data = await response.json()
    
    if (data && Array.isArray(data) && data.length > 0) {
      PAGE_ID.value = data[0].id
      
      let rawString = data[0].content.rendered
      let cleanString = rawString.replace(/<[^>]*>?/gm, '')
      cleanString = cleanString
        .replace(/&#8220;|&#8221;|“|”/g, '"')
        .replace(/&#8216;|&#8217;|‘|’/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8211;|&#8212;/g, '-')
        .trim()
        
      const parsedData = JSON.parse(cleanString)
      
      specials.value = parsedData.map(item => ({
        ...item,
        id: Date.now() + Math.random(),
        price: item.price || null,
        description: item.description || null,
        image: item.image || null
      }))

      safeStorage.set('caps_app_pass', auth.value.password)
      isLoggedIn.value = true
      setTimeout(() => { isDirty.value = false }, 100)
    } else {
      throw new Error('Target page not found in WordPress.')
    }
  } catch (err) {
    globalError.value = err.data?.statusMessage || err.message
    executeLogout()
  } finally {
    isLoading.value = false
  }
}

const executeLogout = () => {
  safeStorage.remove('caps_app_pass')
  auth.value.password = ''
  isLoggedIn.value = false
  specials.value = []
  PAGE_ID.value = null 
  isDirty.value = false
  isLogoutModalOpen.value = false // Closes modal if it was open
}

// -- DATA MUTATIONS & ORDERING --
const addNewSpecial = async () => {
  const newId = Date.now() + Math.random()
  
  // 1. Push to bottom (preserves logical order)
  specials.value.push({
    id: newId,
    category: 'Multi-Cuisine Restaurant',
    name: '',
    price: null,
    isVeg: true,
    description: null,
    image: null
  })

  // 2. Await DOM update
  await nextTick()

  // 3. Buffer for layout shift, then glide and flash
  setTimeout(() => {
    const el = document.getElementById('item-' + newId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Highlight flash using emerald to match the button
      el.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-2', 'ring-offset-[#0B0D13]')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-2', 'ring-offset-[#0B0D13]')
      }, 850)
    }
  }, 50)
}

const removeSpecial = (index) => {
  if (confirm('Are you sure you want to delete this item?')) {
    specials.value.splice(index, 1)
  }
}

// -- NATIVE CENTERING ENGINE --
const moveSpecial = async (fromIndex, toIndex) => {
  if (toIndex < 0 || toIndex >= specials.value.length || fromIndex === toIndex) return
  
  const updated = [...specials.value]
  const [movedItem] = updated.splice(fromIndex, 1)
  updated.splice(toIndex, 0, movedItem)
  specials.value = updated

  // Wait for Vue's virtual DOM
  await nextTick()
  
  // 50ms buffer ensures mobile layout shifts settle before scrolling
  setTimeout(() => {
    const el = document.getElementById('item-' + movedItem.id)
    if (el) {
      // Native browser API perfectly centers the element on all devices
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Visual tracking flash
      el.classList.add('ring-2', 'ring-[#0068fe]', 'ring-offset-2', 'ring-offset-[#030712]')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#0068fe]', 'ring-offset-2', 'ring-offset-[#030712]')
      }, 850)
    }
  }, 50)
}

// -- 2. PROXIMITY SCROLL ENGINE (For Drag & Drop Edge Scrolling) --
const onContainerDragOver = (e) => {
  const container = document.getElementById('scroll-container')
  if (!container) return

  const rect = container.getBoundingClientRect()
  // Support both mouse and touch Y-coordinates
  const clientY = e.clientY || (e.touches && e.touches[0].clientY)
  if (!clientY) return

  const y = clientY - rect.top
  
  // The Activation Zone: If the cursor is within 120px of the top or bottom, force a scroll
  const threshold = 120 

  if (y < threshold) {
    container.scrollBy({ top: -14, behavior: 'auto' })
  } else if (y > rect.height - threshold) {
    // Scrolling Down
    container.scrollBy({ top: 14, behavior: 'auto' })
  }
}

const handleJsonLoaded = ({ items, mode }) => {
  if (mode === 'append') {
    specials.value.push(...items)
  } else {
    specials.value = items
  }
}

const toTitleCase = (str) => {
  if (!str) return '';
  return String(str).trim().toLowerCase().split(/\s+/).map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : '').join(' ');
}

// -- POST TO WORDPRESS (Via Nitro Server) --
const postToWordPress = async () => {
  for (let i = 0; i < specials.value.length; i++) {
    if (!specials.value[i].name.trim()) {
      alert(`Error: Item #${i + 1} is missing a mandatory Name.`)
      return
    }
  }

  isLoading.value = true
  try {
    await $fetch('/api/save', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${authHeader.value}` },
      body: { 
        pageId: PAGE_ID.value,
        payload: specials.value.map(item => ({
          category: item.category,
          name: toTitleCase(item.name),
          price: item.price || null,
          isVeg: item.isVeg,
          description: item.description || null
        }))
      }
    })
    
    alert('Successfully updated live website!')
    isDirty.value = false
  } catch (err) {
    alert(err.data?.statusMessage || err.message)
  } finally {
    isLoading.value = false
  }
}

// -- BROWSER SAFETY NET --
const handleBeforeUnload = (e) => {
  if (isDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

watch(specials, () => {
  if (isLoggedIn.value) isDirty.value = true
}, { deep: true })

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  checkLocalAuth()
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const pageTitle = 'Hotel CAPS Data Engine - Brandsta'
const pageDesc = 'Secure headless data engine for Hotel CAPS managed by Brandsta Interactive.'
const canonicalUrl = 'https://caps.brandsta.cc/'
const ogImage = 'https://caps.brandsta.cc/images/caps-brandsta-og-image.jpg'

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "CAPS Data Engine",
        "description": pageDesc,
        "url": canonicalUrl,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "provider": {
          "@type": "Organization",
          "name": "Brandsta Interactive",
          "url": "https://brandsta.in"
        }
      })
    }
  ]
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  robots: 'noindex, nofollow',
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>