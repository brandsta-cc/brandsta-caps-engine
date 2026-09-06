<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-[#0068fe] selection:text-white flex flex-col">
    
    <!-- Header -->
    <header class="relative bg-[#030712] border-b border-slate-800/80 px-6 py-4 z-50 shadow-2xl overflow-hidden">
      
      <!-- Subtle top border connecting the brand colors -->
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-slate-800 to-[#0068fe] opacity-80"></div>
      
      <div class="w-full flex justify-between items-center">
        
        <!-- Left: CAPS Logo with Amber Glow -->
        <div class="flex justify-start relative">
          <!-- Ambient backlight -->
          <div class="absolute top-1/2 left-6 -translate-y-1/2 w-20 h-20 bg-amber-500/15 blur-2xl rounded-full pointer-events-none"></div>
          <img 
            src="/images/caps-solid-logo.png" 
            alt="Hotel CAPS" 
            class="h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]" 
          />
        </div>
        
        <!-- Center: Typography -->
        <div class="flex flex-col items-center justify-center text-center relative z-10">
          <h1 class="text-base md:text-2xl font-semibold tracking-[0.15em] text-white uppercase drop-shadow-md">
            CAPS - BRANDSTA
          </h1>
          <p class="text-sm md:text-base font-semibold text-slate-400 tracking-[0.3em] uppercase mt-1">
            Data Engine
          </p>
        </div>
        
        <!-- Right: Brandsta Logo with Blue Glow -->
        <div class="flex justify-end relative">
          <!-- Ambient backlight -->
          <div class="absolute top-1/2 right-6 -translate-y-1/2 w-20 h-20 bg-[#0068fe]/20 blur-2xl rounded-full pointer-events-none"></div>
          <img 
            src="/images/brandsta-logo.png" 
            alt="Brandsta" 
            class="h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(0,104,254,0.3)]" 
          />
        </div>
        
      </div>
    </header>

    <!-- Page Content Injection -->
    <main class="flex-grow relative z-10">
      <slot />
    </main>
    
  </div>
</template>