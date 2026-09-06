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
    <div v-else class="p-4 md:p-8 h-[calc(100vh-73px)] flex flex-col">
      <EngineHeader 
        :username="auth.username" 
        :is-loading="isLoading"
        @post="postToWordPress" 
        @logout="logout" 
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 grow overflow-hidden pb-4 mt-6">
        
        <!-- Left Side: Data Forms -->
        <section class="lg:col-span-7 overflow-y-auto pr-2 space-y-6 pb-20 custom-scrollbar relative">
          <DataForm 
            v-for="(item, index) in specials" 
            :key="item.id" 
            :item="item" 
            :auth-header="authHeader" 
            @remove="removeSpecial(index)" 
          />

          <button 
            @click="addNewSpecial" 
            class="w-full py-4 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            + Add New Menu Item
          </button>
        </section>

        <!-- Right Side: Live Payload -->
        <LivePayload class="lg:col-span-5" :specials="specials" />
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

// -- STATE --
const isLoggedIn = ref(false)
const isLoading = ref(false)
const globalError = ref('')
const isDirty = ref(false)
const PAGE_ID = ref(null)

const auth = ref({
  username: 'hotelcapsfamily',
  password: ''
})

const specials = ref([])
const authHeader = computed(() => btoa(`${auth.value.username}:${auth.value.password}`))

// -- AUTH & FETCH (Public API Bypasses WAF for GET) --
const checkLocalAuth = () => {
  const savedPass = localStorage.getItem('caps_app_pass')
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
    const wpUrl = 'https://public-api.wordpress.com/wp/v2/sites/hotelcapsfamily.wordpress.com/pages?slug=specials-data'
    const response = await fetch(wpUrl, {
      headers: { 'Authorization': `Basic ${authHeader.value}` }
    })

    if (!response.ok) throw new Error('Invalid App Password or API Blocked.')
    
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

      localStorage.setItem('caps_app_pass', auth.value.password)
      isLoggedIn.value = true
      setTimeout(() => { isDirty.value = false }, 100)
    } else {
      throw new Error('Target page not found in WordPress.')
    }
  } catch (err) {
    globalError.value = err.message
    logout()
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('caps_app_pass')
  auth.value.password = ''
  isLoggedIn.value = false
  specials.value = []
  PAGE_ID.value = null 
  isDirty.value = false
}

// -- DATA MUTATIONS --
const addNewSpecial = () => {
  specials.value.push({
    id: Date.now(),
    category: 'Multi-Cuisine Restaurant',
    name: '',
    price: null,
    isVeg: true,
    description: null,
    image: null
  })
}

const removeSpecial = (index) => {
  if (confirm('Are you sure you want to delete this item?')) {
    specials.value.splice(index, 1)
  }
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
    const response = await $fetch('/api/save', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${authHeader.value}` },
      body: { 
        pageId: PAGE_ID.value,
        payload: specials.value.map(item => ({
          category: item.category,
          name: item.name,
          price: item.price || null,
          isVeg: item.isVeg,
          description: item.description || null,
          image: item.image || null
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

// 1. Core Meta Values
const pageTitle = 'Hotel CAPS Data Engine - Brandsta'
const pageDesc = 'Secure headless data engine for Hotel CAPS managed by Brandsta Interactive.'
const canonicalUrl = 'https://caps.brandsta.cc/'
const ogImage = 'https://caps.brandsta.cc/images/caps-brandsta-og-image.jpg'

// 2. Structured Link and Global Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
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

// 3. Nuxt 4 Composable mapping both Search Engines and Social Cards
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  robots: 'noindex, nofollow', // Double-locking privacy at the page level
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