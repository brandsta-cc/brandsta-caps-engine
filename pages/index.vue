<!-- pages/index.vue -->
<template>
  <div class="min-h-[calc(100vh-93px)] flex flex-col items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden">
    
    <!-- Subtle GPU-safe Ambient Glows -->
    <div class="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/8 blur-3xl rounded-full"></div>
    <div class="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-[#0068fe]/10 blur-3xl rounded-full"></div>

    <div class="max-w-4xl w-full relative z-10">
      <!-- Intro Header -->
      <div class="text-center mb-8 sm:mb-10">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3">
          Select Workspace Module
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Hotel CAPS<br />Digital Operations Hub
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Generate official A4 event quotations instantaneously or manage live website specials.
        </p>
      </div>

      <!-- Dual Action Blocks -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        <!-- Left Block: Quotation Maker (/quotation - Zero Auth) -->
        <NuxtLink
          to="/quotation"
          class="group relative rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/60 active:border-amber-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-500/12 via-transparent to-transparent opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between gap-3 mb-6">
              <div class="w-13 h-13 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                Instant • No Login
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 group-active:text-amber-200 transition-colors">
              Quotation Maker
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed mt-2">
              Draft official A4 banquet & catering quotations on branded Hotel CAPS stationery with instant PDF, JPG, and WhatsApp sharing.
            </p>
          </div>

          <div class="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-amber-400">
            <span>Open Quotation Studio</span>
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5 group-active:translate-x-2" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </NuxtLink>

        <!-- Right Block: Live Specials (/specials - Auth Protected) -->
        <NuxtLink
          to="/specials"
          class="group relative rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-[#0068fe]/70 active:border-blue-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0068fe]"
        >
          <div class="pointer-events-none absolute inset-0 bg-linear-to-bl from-[#0068fe]/14 via-transparent to-transparent opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between gap-3 mb-6">
              <div class="w-13 h-13 rounded-xl bg-[#0068fe]/15 border border-[#0068fe]/35 flex items-center justify-center text-[#3b8aff] group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="px-2.5 py-1 rounded-md bg-[#0068fe]/12 border border-[#0068fe]/35 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                Auth Protected
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 group-active:text-blue-200 transition-colors">
              Live Specials Engine
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed mt-2">
              Authenticate with WordPress to sync live restaurant specials, manage outlet categories, and export 9:16 daily story posters.
            </p>
          </div>

          <div class="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-[#3b8aff]">
            <span>Launch Specials Engine</span>
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5 group-active:translate-x-2" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup>
const pageTitle = 'Digital Operations Hub - Hotel CAPS - Brandsta'
const pageDesc = 'Digital Operations Hub for Hotel CAPS powered by Brandsta Interactive.'
const canonicalUrl = 'https://caps.brandsta.cc/'
const ogImage = 'https://caps.brandsta.cc/images/caps-brandsta-og-image.jpg'

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
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