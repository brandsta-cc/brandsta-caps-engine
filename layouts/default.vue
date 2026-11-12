<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-[#0068fe] selection:text-white flex flex-col">
    
    <!-- Header (Locked 93px height for 0.000 CLS) -->
    <header class="sticky top-0 bg-[#030712] border-b border-slate-800/80 px-4 sm:px-6 py-4 z-50 shadow-2xl overflow-hidden">
      
      <!-- Brand Gradient Hairline -->
      <div class="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-500 via-slate-800 to-[#0068fe] opacity-80"></div>
      
      <div class="w-full flex justify-between items-center">
        
        <!-- Left: CAPS Logo -->
        <NuxtLink to="/" aria-label="Return to Engine Hub" class="flex justify-start relative group focus:outline-none">
          <div class="absolute top-1/2 left-6 -translate-y-1/2 w-20 h-20 bg-amber-500/15 group-hover:bg-amber-500/25 group-active:bg-amber-500/30 blur-2xl rounded-full pointer-events-none transition-opacity"></div>
          <img 
            src="/images/caps-solid-logo.png" 
            width="180"
            height="160"
            alt="Hotel CAPS"
            fetchpriority="high" 
            class="h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)] transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.98]" 
          />
        </NuxtLink>
        
        <!-- Center: Hub Return Link & Dynamic Route Subtitle -->
        <NuxtLink 
          to="/" 
          class="group flex flex-col items-center justify-center text-center relative z-10 focus:outline-none"
        >
          <h1 class="text-base md:text-2xl font-semibold tracking-[0.15em] text-white group-hover:text-amber-200 group-active:text-amber-300 uppercase drop-shadow-md transition-colors">
            CAPS - BRANDSTA
          </h1>
          <p class="text-xs sm:text-sm md:text-base font-semibold text-slate-400 tracking-[0.26em] uppercase mt-1 transition-colors group-hover:text-slate-200">
            {{ moduleLabel }}
          </p>
        </NuxtLink>
        
        <!-- Right: Brandsta Logo -->
        <NuxtLink to="/" aria-label="Brandsta Hub" class="flex justify-end relative group focus:outline-none">
          <div class="absolute top-1/2 right-6 -translate-y-1/2 w-20 h-20 bg-[#0068fe]/20 group-hover:bg-[#0068fe]/30 group-active:bg-[#0068fe]/35 blur-2xl rounded-full pointer-events-none transition-opacity"></div>
          <img 
            src="/images/brandsta-logo.png" 
            width="180"
            height="186"
            alt="Brandsta" 
            fetchpriority="high"
            class="h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(0,104,254,0.3)] transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.98]" 
          />
        </NuxtLink>
        
      </div>
    </header>

    <!-- Page Content Injection -->
    <main class="grow relative z-10">
      <slot />
    </main>
    
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const moduleLabel = computed(() => {
  if (route.path.startsWith('/quotation')) return 'Quotation Studio'
  if (route.path.startsWith('/specials')) return 'Live Specials'
  return 'Digital Hub'
})
</script>