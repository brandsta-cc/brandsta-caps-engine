<!-- pages/quotation.vue -->
<template>
  <div class="px-2.5 sm:px-5 md:px-6 pt-0 pb-4 lg:py-5 min-h-[calc(100vh-93px)] lg:h-[calc(100vh-93px)] lg:min-h-0 flex flex-col gap-3.5 lg:gap-5">
    
    <!-- Sticky Mobile / Static Desktop Unified Studio Command Dock -->
    <div class="sticky top-22 lg:static z-30 bg-[#030712] pt-2.5 pb-1.5 lg:py-0 shrink-0">
      <section class="bg-slate-900/85 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3.5 lg:p-4 backdrop-blur-md shadow-xl">
        
        <!-- Single-DOM Flex Engine (2 Compact Rows on Mobile • 1 Row on Desktop) -->
        <div class="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          
          <!-- 1. Hub Return + Title (Mobile: Row 1 Left | Desktop: Left Side) -->
          <div class="order-1 mr-auto flex items-center gap-2.5 sm:gap-3">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.97] border border-slate-700/80 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Hub</span>
            </NuxtLink>

            <div class="hidden sm:flex flex-col">
              <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-white" style="font-family: 'Faculty Glyphic', serif;">
                A4 Banquet Quotation
              </span>
              <span class="text-[11px] text-slate-400">
                {{ totalItemsCount }}/{{ MAX_TOTAL_ITEMS }} dishes • {{ scaleBadgeText }}
              </span>
            </div>
          </div>

          <!-- 2. Utility Cluster: Import + AI Guide + Reset (Mobile: Row 1 Right | Desktop: Right Side Leading) -->
          <div class="order-2 flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              @click="openJsonModal('import')"
              class="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 lg:py-2.5 rounded-xl bg-[#030712] hover:bg-slate-800 active:scale-[0.97] border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              title="Import Quotation JSON"
            >
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0068fe] shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Import</span>
            </button>

            <button
              type="button"
              @click="openJsonModal('guide')"
              aria-label="AI Prompt Guide"
              title="AI Prompt Guide & JSON Schema"
              class="w-8.5 h-8.5 lg:w-9.5 lg:h-9.5 rounded-xl bg-[#030712] hover:bg-[#0068fe]/20 active:scale-95 text-slate-300 hover:text-[#0068fe] border border-slate-700/80 hover:border-[#0068fe]/50 font-serif italic font-bold text-xs lg:text-sm inline-flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              i
            </button>

            <button
              type="button"
              @click="resetToSample"
              class="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-2 lg:py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 active:scale-[0.97] border border-slate-700/60 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              title="Load sample quotation"
            >
              Reset
            </button>
          </div>

          <!-- 3. Mobile Force Row Break -->
          <div class="order-3 w-full h-0 lg:hidden"></div>

          <!-- 4. Download JPG (Mobile: Row 2 Flex Pill | Desktop: Right Cluster) -->
          <button
            type="button"
            :disabled="isExporting"
            @click="downloadJpg"
            class="order-4 flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 lg:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.97] border border-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            title="Download JPG"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>JPG</span>
          </button>

          <!-- 5. Download PDF -->
          <button
            type="button"
            :disabled="isExporting"
            @click="downloadPdf"
            class="order-5 flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 lg:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.97] text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/15 transition-all cursor-pointer disabled:opacity-50"
            title="Download A4 PDF"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>PDF</span>
          </button>

          <!-- 6. Native OS Share (Icon + Format Pill on Mobile | Icon + 'Share' + Format Pill on Desktop) -->
          <div class="order-6 flex-[1.15] sm:flex-1 lg:flex-none inline-flex items-center justify-between rounded-xl bg-[#0068fe] p-0.5 shadow-lg shadow-[#0068fe]/20">
            <button
              type="button"
              :disabled="isExporting"
              @click="shareNativeFile"
              aria-label="Share Quotation File"
              class="grow inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 lg:py-2 rounded-lg hover:bg-white/10 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span class="hidden sm:inline">Share</span>
            </button>
            <button
              type="button"
              @click="shareFormat = shareFormat === 'pdf' ? 'jpg' : 'pdf'"
              class="px-2 py-1.5 lg:py-2 rounded-lg bg-slate-950/35 hover:bg-slate-950/55 text-[10px] font-extrabold uppercase tracking-wider text-blue-100 transition-colors cursor-pointer shrink-0"
              title="Switch Native Share format between PDF and JPG"
            >
              {{ shareFormat }}
            </button>
          </div>

          <!-- 7. WhatsApp Direct Share -->
          <button
            type="button"
            @click="shareWhatsApp"
            aria-label="Send Text Summary via WhatsApp"
            class="order-7 flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 lg:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5.016L2 22l5.156-1.359c1.484.813 3.156 1.234 4.875 1.234 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.828 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.953-.125-.453-.141-1.047-.344-1.797-.672-3.156-1.359-5.219-4.547-5.375-4.766-.156-.203-1.281-1.703-1.281-3.25s.813-2.313 1.094-2.625c.297-.313.641-.391.859-.391.219 0 .422.016.609.016.188 0 .453-.078.703.531.266.625.891 2.172.969 2.328.078.156.125.344.031.547-.109.219-.156.344-.313.531-.156.188-.328.406-.469.547-.156.156-.328.328-.141.641.188.313.828 1.375 1.781 2.219 1.219 1.094 2.25 1.438 2.578 1.594.313.156.5.125.688-.078.188-.219.797-.922 1.016-1.234.203-.313.422-.266.703-.156.297.109 1.875.891 2.188 1.047.328.156.531.234.609.375.078.141.078.797-.172 1.5z"/>
            </svg>
            <span class="sm:hidden">WA</span>
            <span class="hidden sm:inline">WhatsApp</span>
          </button>

        </div>

        <!-- Integrated 50/50 Mobile Mode Switcher -->
        <div class="lg:hidden mt-2 pt-2 border-t border-slate-800/80">
          <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#030712] border border-slate-800/90">
            <button
              type="button"
              @click="mobileTab = 'editor'"
              :class="mobileTab === 'editor' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-slate-200 font-semibold'"
              class="py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Edit Details ({{ totalItemsCount }})
            </button>
            <button
              type="button"
              @click="mobileTab = 'preview'"
              :class="mobileTab === 'preview' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-slate-200 font-semibold'"
              class="py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Live A4 Sheet
            </button>
          </div>
        </div>

      </section>
    </div>

    <!-- Split Studio Workspace (min-h-0 enables independent vertical scrolling on both panes) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 grow lg:min-h-0">
      
      <!-- LEFT PANE: Breathable, Fully-Labeled Quotation Builder -->
      <section 
        :class="mobileTab === 'editor' ? 'block' : 'hidden lg:block'"
        class="lg:col-span-7 lg:min-h-0 lg:overflow-y-auto lg:pr-2 space-y-6 pb-8 custom-scrollbar"
      >
        
        <!-- Block 1: Letterhead Reference & Event Summary -->
        <div class="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3.5">
            <h2 class="text-sm font-bold uppercase tracking-wider text-amber-400">
              1. Header & Event Summary
            </h2>
            <span class="text-[11px] font-medium text-slate-400">Auto-Uppercase • Text Only</span>
          </div>

          <!-- Letterhead Ref No. + Quotation Issue Date -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-ref-no">Quotation Ref No.</label>
                <span :class="getCounterClass(form.refNo, LIMITS.refNo)">{{ form.refNo.length }}/{{ LIMITS.refNo }}</span>
              </div>
              <input
                id="q-ref-no"
                name="refNo"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.refNo, form.refNo.length)"
                :value="form.refNo"
                @input="onUpperInput('refNo', $event)"
                placeholder="CAPS/QTN/2026/..."
                :class="form.refNo.length > LIMITS.refNo ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-quote-date">Quotation Issue Date</label>
                <span :class="getCounterClass(form.quoteDate, LIMITS.quoteDate)">{{ form.quoteDate.length }}/{{ LIMITS.quoteDate }}</span>
              </div>
              <input
                id="q-quote-date"
                name="quoteDate"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.quoteDate, form.quoteDate.length)"
                :value="form.quoteDate"
                @input="onUpperInput('quoteDate', $event)"
                placeholder="DD/MM/YYYY"
                :class="form.quoteDate.length > LIMITS.quoteDate ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Client Name + Phone + Guaranteed Pax -->
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
            <div class="sm:col-span-6">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-client-name">Order To / Client</label>
                <span :class="getCounterClass(form.clientName, LIMITS.clientName)">{{ form.clientName.length }}/{{ LIMITS.clientName }}</span>
              </div>
              <input
                id="q-client-name"
                name="clientName"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.clientName, form.clientName.length)"
                :value="form.clientName"
                @input="onUpperInput('clientName', $event)"
                placeholder="Enter Name & Details"
                :class="form.clientName.length > LIMITS.clientName ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div class="sm:col-span-3">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-client-phone">Phone</label>
                <span :class="getCounterClass(form.clientPhone, LIMITS.clientPhone)">{{ form.clientPhone.length }}/{{ LIMITS.clientPhone }}</span>
              </div>
              <input
                id="q-client-phone"
                name="clientPhone"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.clientPhone, form.clientPhone.length)"
                :value="form.clientPhone"
                @input="onUpperInput('clientPhone', $event)"
                placeholder="Eg: 9207517064"
                :class="form.clientPhone.length > LIMITS.clientPhone ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div class="sm:col-span-3">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-guaranteed-pax">Pax</label>
                <span :class="getCounterClass(form.guaranteedPax, LIMITS.guaranteedPax)">{{ form.guaranteedPax.length }}/{{ LIMITS.guaranteedPax }}</span>
              </div>
              <input
                id="q-guaranteed-pax"
                name="guaranteedPax"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.guaranteedPax, form.guaranteedPax.length)"
                :value="form.guaranteedPax"
                @input="onUpperInput('guaranteedPax', $event)"
                placeholder="Number of Expected Guests"
                :class="form.guaranteedPax.length > LIMITS.guaranteedPax ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Event Date & Time + Venue & Program -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-date-time">Event Date & Time</label>
                <span :class="getCounterClass(form.dateTime, LIMITS.dateTime)">{{ form.dateTime.length }}/{{ LIMITS.dateTime }}</span>
              </div>
              <input
                id="q-date-time"
                name="dateTime"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.dateTime, form.dateTime.length)"
                :value="form.dateTime"
                @input="onUpperInput('dateTime', $event)"
                placeholder="DD/MM/YYYY • HH:MM AM/PM TO HH:MM AM/PM"
                :class="form.dateTime.length > LIMITS.dateTime ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-venue-program">Venue & Program</label>
                <span :class="getCounterClass(form.venueProgram, LIMITS.venueProgram)">{{ form.venueProgram.length }}/{{ LIMITS.venueProgram }}</span>
              </div>
              <input
                id="q-venue-program"
                name="venueProgram"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.venueProgram, form.venueProgram.length)"
                :value="form.venueProgram"
                @input="onUpperInput('venueProgram', $event)"
                placeholder="EVENT NAME AND VENUE"
                :class="form.venueProgram.length > LIMITS.venueProgram ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Price Details -->
          <div>
            <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              <div class="flex items-center gap-2">
                <label for="q-price-details">Price Details</label>
                <button
                  type="button"
                  @click="insertRupeeSymbol"
                  class="px-2 py-0.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 active:scale-95 text-amber-300 text-[10px] font-extrabold cursor-pointer transition-all"
                  title="Insert Rupee Symbol"
                >
                  + ₹
                </button>
              </div>
              <span :class="getCounterClass(form.priceDetails, LIMITS.priceDetails)">{{ form.priceDetails.length }}/{{ LIMITS.priceDetails }}</span>
            </div>
            <input
              id="q-price-details"
              ref="priceInputRef"
              name="priceDetails"
              type="text"
              autocomplete="off"
              :maxlength="Math.max(LIMITS.priceDetails, form.priceDetails.length)"
              :value="form.priceDetails"
              @input="onUpperInput('priceDetails', $event)"
              placeholder="₹XXX/- PAX + ₹XXXX/HOUR AC & ELECTRICAL CHARGES"
              :class="form.priceDetails.length > LIMITS.priceDetails ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
              class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Service Menu Title + 3-Line Centered Optional Notes -->
          <div class="space-y-4 pt-1">
            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-service-heading">Service Menu Title (Uppercase)</label>
                <span :class="getCounterClass(form.serviceHeading, LIMITS.serviceHeading)">{{ form.serviceHeading.length }}/{{ LIMITS.serviceHeading }}</span>
              </div>
              <input
                id="q-service-heading"
                name="serviceHeading"
                type="text"
                autocomplete="off"
                :maxlength="Math.max(LIMITS.serviceHeading, form.serviceHeading.length)"
                :value="form.serviceHeading"
                @input="onUpperInput('serviceHeading', $event)"
                placeholder="BUFFET SERVICE MENU"
                :class="form.serviceHeading.length > LIMITS.serviceHeading ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                class="w-full bg-[#030712] border rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div class="bg-[#030712]/50 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Optional Bottom Notes ({{ isTwoColumnLayout ? 'Centered' : 'Left-Aligned' }} • Up to 3 Lines)
                </span>
                <span class="text-[10px] font-semibold text-slate-500">Auto-Capitalize</span>
              </div>

              <div v-for="(_, nIdx) in 3" :key="'footer-note-' + nIdx">
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  <label :for="'q-footer-note-' + nIdx">Note Line #{{ nIdx + 1 }}</label>
                  <span :class="getCounterClass(form.footerNotes[nIdx], LIMITS.footerNote)">{{ form.footerNotes[nIdx].length }}/{{ LIMITS.footerNote }}</span>
                </div>
                <input
                  :id="'q-footer-note-' + nIdx"
                  :name="'footerNote_' + nIdx"
                  type="text"
                  autocomplete="off"
                  :maxlength="Math.max(LIMITS.footerNote, form.footerNotes[nIdx].length)"
                  :value="form.footerNotes[nIdx]"
                  @input="onFooterNoteInput(nIdx, $event)"
                  :placeholder="nIdx === 0 ? 'Contact Us : 9633817064' : 'Optional additional note line...'"
                  :class="form.footerNotes[nIdx].length > LIMITS.footerNote ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                  class="w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-white capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Block 2: Dynamic Menu Courses -->
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <h2 class="text-sm font-bold uppercase tracking-wider text-amber-400">
                2. Menu Courses ({{ form.courses.length }}/{{ MAX_COURSES }})
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">
                Course headings render Uppercase • Dish names & sub-notes auto-Capitalize
              </p>
            </div>
            <button
              type="button"
              :disabled="form.courses.length >= MAX_COURSES"
              @click="addCourse"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/15"
            >
              + Add Course
            </button>
          </div>

          <div 
            v-for="(course, cIdx) in form.courses" 
            :key="course.id"
            class="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-4"
          >
            <!-- Course Header Controls -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end border-b border-slate-800/80 pb-4">
              <div class="sm:col-span-6">
                <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <label :for="'course-title-' + course.id">Course Heading #{{ cIdx + 1 }}</label>
                  <span :class="getCounterClass(course.title, LIMITS.courseTitle)">{{ course.title.length }}/{{ LIMITS.courseTitle }}</span>
                </div>
                <input
                  :id="'course-title-' + course.id"
                  :name="'courseTitle_' + cIdx"
                  type="text"
                  autocomplete="off"
                  :maxlength="Math.max(LIMITS.courseTitle, course.title.length)"
                  :value="course.title"
                  @input="onCourseUpperInput(course, 'title', $event)"
                  placeholder="WELCOME DRINK / MAIN COURSE"
                  :class="course.title.length > LIMITS.courseTitle ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                  class="w-full bg-[#030712] border rounded-xl px-4 py-2.5 text-sm font-semibold text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div class="sm:col-span-4">
                <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <label :for="'course-timing-' + course.id">Timing (Optional)</label>
                  <span :class="getCounterClass(course.timing, LIMITS.courseTiming)">{{ course.timing.length }}/{{ LIMITS.courseTiming }}</span>
                </div>
                <input
                  :id="'course-timing-' + course.id"
                  :name="'courseTiming_' + cIdx"
                  type="text"
                  autocomplete="off"
                  :maxlength="Math.max(LIMITS.courseTiming, course.timing.length)"
                  :value="course.timing"
                  @input="onCourseUpperInput(course, 'timing', $event)"
                  placeholder="@ 10:45 AM"
                  :class="course.timing.length > LIMITS.courseTiming ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-amber-500'"
                  class="w-full bg-[#030712] border rounded-xl px-3.5 py-2.5 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <!-- Course Reorder / Remove -->
              <div class="sm:col-span-2 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  :disabled="cIdx === 0"
                  @click="moveCourse(cIdx, cIdx - 1)"
                  class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 disabled:opacity-30 cursor-pointer transition-all"
                  title="Move course up"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                </button>
                <button
                  type="button"
                  :disabled="cIdx === form.courses.length - 1"
                  @click="moveCourse(cIdx, cIdx + 1)"
                  class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 disabled:opacity-30 cursor-pointer transition-all"
                  title="Move course down"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <button
                  type="button"
                  :disabled="form.courses.length <= 1"
                  @click="removeCourse(cIdx)"
                  class="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-red-400 disabled:opacity-30 cursor-pointer transition-all"
                  title="Delete course"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>

            <!-- Course Dishes List -->
            <div class="space-y-3">
              <div 
                v-for="(item, iIdx) in course.items" 
                :key="item.id"
                class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-[#030712]/70 border border-slate-800/80 rounded-xl p-3.5"
              >
                <div class="sm:col-span-6">
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <label :for="'dish-name-' + item.id">Dish #{{ iIdx + 1 }}</label>
                    <span :class="getCounterClass(item.name, LIMITS.itemName)">{{ item.name.length }}/{{ LIMITS.itemName }}</span>
                  </div>
                  <input
                    :id="'dish-name-' + item.id"
                    :name="'dishName_' + cIdx + '_' + iIdx"
                    type="text"
                    autocomplete="off"
                    :maxlength="Math.max(LIMITS.itemName, item.name.length)"
                    :value="item.name"
                    @input="onCapitalizeInput(item, 'name', $event)"
                    placeholder="Pineapple Mint Lime"
                    :class="item.name.length > LIMITS.itemName ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-[#0068fe]'"
                    class="w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-white capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div class="sm:col-span-4">
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <label :for="'dish-note-' + item.id">Sub-note (Optional)</label>
                    <span :class="getCounterClass(item.note, LIMITS.itemNote)">{{ item.note.length }}/{{ LIMITS.itemNote }}</span>
                  </div>
                  <input
                    :id="'dish-note-' + item.id"
                    :name="'dishNote_' + cIdx + '_' + iIdx"
                    type="text"
                    autocomplete="off"
                    :maxlength="Math.max(LIMITS.itemNote, item.note.length)"
                    :value="item.note"
                    @input="onCapitalizeInput(item, 'note', $event)"
                    placeholder="Raitha, Pickle"
                    :class="item.note.length > LIMITS.itemNote ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-[#0068fe]'"
                    class="w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-300 capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div class="sm:col-span-2 flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    :disabled="iIdx === 0"
                    @click="moveItem(course, iIdx, iIdx - 1)"
                    class="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-400 disabled:opacity-25 cursor-pointer"
                    title="Move dish up"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                  </button>
                  <button
                    type="button"
                    :disabled="iIdx === course.items.length - 1"
                    @click="moveItem(course, iIdx, iIdx + 1)"
                    class="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-400 disabled:opacity-25 cursor-pointer"
                    title="Move dish down"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <button
                    type="button"
                    :disabled="course.items.length <= 1"
                    @click="course.items.splice(iIdx, 1)"
                    class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-red-400 disabled:opacity-25 cursor-pointer"
                    title="Remove dish"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              :disabled="totalItemsCount >= MAX_TOTAL_ITEMS || course.items.length >= MAX_ITEMS_PER_COURSE"
              @click="addItem(course)"
              class="w-full py-2.5 rounded-xl border border-dashed border-slate-700 hover:border-amber-500/60 hover:bg-amber-500/5 active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-300 transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
            >
              + Add Dish to {{ course.title || 'Course' }}
            </button>
          </div>
        </div>

      </section>

      <!-- RIGHT PANE: Vertically Scrollable High-DPI A4 Sheet Preview -->
      <aside 
        :class="mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'"
        class="lg:col-span-5 lg:min-h-0 bg-slate-900/50 border border-slate-800/90 rounded-2xl flex-col overflow-hidden"
      >
        <!-- Subtle Preview Zoom Bar -->
        <div class="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/80 shrink-0">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Live A4 Stationery Preview (200 DPI)
          </span>
          <div class="inline-flex items-center gap-1 bg-[#030712] p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              @click="previewZoom = 'scroll'"
              :class="previewZoom === 'scroll' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'"
              class="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Scroll Width
            </button>
            <button
              type="button"
              @click="previewZoom = 'fit'"
              :class="previewZoom === 'fit' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'"
              class="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Fit Page
            </button>
          </div>
        </div>

        <!-- Dedicated Vertical Scroll Viewport (Supports 1 or Multi-Page A4 Stack) -->
        <div class="grow min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
          <div
            v-for="pageNum in pageCount"
            :key="'a4-sheet-' + pageNum"
            :class="previewZoom === 'scroll' ? 'w-full max-w-170' : 'w-full max-w-100'"
            class="mx-auto transition-all duration-200"
          >
            <div v-if="pageCount > 1" class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
              <span>Sheet {{ pageNum }} of {{ pageCount }}</span>
              <span>ISO A4 • 200 DPI</span>
            </div>
            <div class="aspect-1654/2339 shadow-[0_24px_60px_rgba(0,0,0,0.7)] rounded-sm overflow-hidden bg-white ring-1 ring-white/15">
              <canvas
                :ref="(el) => setPageCanvasRef(el, pageNum - 1)"
                width="1654"
                height="2339"
                class="w-full h-full block"
              ></canvas>
            </div>
          </div>
        </div>
      </aside>

    </div>
    <!-- AI Prompt & JSON Import Modal -->
    <QuotationJsonModal
      :is-open="isJsonModalOpen"
      :initial-tab="jsonModalTab"
      :is-dirty="isDirty"
      @close="isJsonModalOpen = false"
      @load-json="handleQuotationJsonLoaded"
    />
    <!-- Over-Limit Character Warning Popup (Flexbox • Appears Only When Imported JSON Exceeds Limits) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOverLimitModalOpen"
        @click.self="isOverLimitModalOpen = false"
        class="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm pt-25.5 md:pt-27 pb-4 px-3 sm:px-4"
      >
        <div class="bg-slate-900 border border-amber-400/50 rounded-2xl w-full max-w-lg max-h-[calc(100dvh-124px)] flex flex-col shadow-2xl overflow-hidden">
          
          <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <h3 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                Character Limit Notice ({{ overLimitWarnings.length }})
              </h3>
            </div>
            <button
              type="button"
              @click="isOverLimitModalOpen = false"
              aria-label="Close Warning"
              class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="min-h-0 flex-1 p-5 overflow-y-auto space-y-3.5 custom-scrollbar">
            <p class="text-xs leading-relaxed text-slate-300 bg-amber-500/10 border border-amber-500/25 rounded-xl p-3.5">
              Your quotation is ready. Some text exceeds the recommended character limits and has been shortened in the A4 preview.<br />The complete text is preserved in the editor if you'd like to adjust it.
            </p>

            <div class="flex flex-col gap-2">
              <button
                v-for="(warn, wIdx) in overLimitWarnings"
                :key="'over-limit-' + wIdx"
                type="button"
                @click="jumpToOverLimitField(warn.targetId)"
                class="w-full flex items-center justify-between gap-3 bg-[#030712] hover:bg-slate-800/80 border border-slate-800 hover:border-amber-400/50 rounded-xl px-3.5 py-2.5 text-left transition-all cursor-pointer"
              >
                <span class="min-w-0 flex-1 text-xs font-semibold text-slate-200 truncate">
                  {{ warn.label }}
                </span>
                <span class="shrink-0 px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 text-[11px] font-extrabold">
                  {{ warn.length }}/{{ warn.max }}
                </span>
              </button>
            </div>
          </div>

          <div class="px-5 py-3.5 border-t border-slate-800 flex justify-end shrink-0 bg-slate-950/50">
            <button
              type="button"
              @click="isOverLimitModalOpen = false"
              class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
            >
              Got It
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

// -- 1. CONSTANTS & CHARACTER LIMITS --
const CANVAS_W = 1654
const CANVAS_H = 2339
const MAX_COURSES = 12
const MAX_ITEMS_PER_COURSE = 28
const MAX_TOTAL_ITEMS = 80
const COURSE_UNBREAKABLE_MAX = 14

const LIMITS = {
  refNo: 24,
  quoteDate: 16,
  clientName: 32,
  clientPhone: 15,
  guaranteedPax: 14,
  dateTime: 42,
  venueProgram: 52,
  priceDetails: 78,
  serviceHeading: 34,
  courseTitle: 26,
  courseTiming: 16,
  itemName: 42,
  itemNote: 44,
  footerNote: 85
}

// -- 2. STATE, CASE FORMATTERS & UNSAVED CHANGES GUARD --
const mobileTab = ref('editor')
const previewZoom = ref('scroll')
const shareFormat = ref('pdf')
const isExporting = ref(false)
const pageCount = ref(1)
const isTwoColumnLayout = ref(false)
const isDirty = ref(false)
let isSuppressingDirty = false

const pageCanvasRefs = []
const setPageCanvasRef = (el, idx) => {
  if (el) pageCanvasRefs[idx] = el
}

const priceInputRef = ref(null)

const makeId = () => Math.random().toString(36).slice(2, 10)

const formatTodayDate = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

const createSampleState = () => ({
  refNo: `CAPS/QTN/${new Date().getFullYear()}/001`,
  quoteDate: formatTodayDate(),
  clientName: 'GUEST NAME',
  clientPhone: '9400653709',
  guaranteedPax: 'PAX : 100',
  dateTime: '01/01/2027 • 11:00 AM TO 02:00 PM',
  venueProgram: 'CAPS EVENT HALL - BIRTHDAY FUNCTION',
  priceDetails: '₹300/- PAX + ₹1000/HOUR AC & ELECTRICAL CHARGES',
  serviceHeading: 'BUFFET SERVICE MENU',
  footerNotes: ['Contact Us : 9633817064', '', ''],
  courses: [
    {
      id: makeId(),
      title: 'WELCOME DRINK',
      timing: '@ 10:45 AM',
      items: [
        { id: makeId(), name: 'Pineapple Mint Lime', note: '' },
        { id: makeId(), name: 'Grape Lime', note: '' }
      ]
    },
    {
      id: makeId(),
      title: 'MAIN COURSE',
      timing: '',
      items: [
        { id: makeId(), name: 'Caps Chicken Biriyani', note: 'Raitha, Pickle' }
      ]
    },
    {
      id: makeId(),
      title: 'DESSERTS',
      timing: '',
      items: [
        { id: makeId(), name: 'Vanilla Ice Cream', note: '' },
        { id: makeId(), name: 'Drinking Hot Water', note: '' }
      ]
    }
  ]
})

const form = reactive(createSampleState())

const clampText = (val, max) => String(val || '').slice(0, max).trim()

const getCounterClass = (val, max) => {
  const len = String(val || '').length
  if (len >= max) return 'text-red-400 font-extrabold'
  if (len >= Math.max(1, max - 5)) return 'text-orange-400 font-extrabold'
  return 'text-slate-400'
}

const toUpperClean = (val, max) => String(val || '').toUpperCase().slice(0, max)

const toUpperImported = (val) => String(val || '').trim().toUpperCase()

const toCapitalizeImported = (val) => {
  const trimmed = String(val || '').trim()
  if (!trimmed) return ''
  const base =
    /[A-Z]{4}/.test(trimmed) && !/[a-z]/.test(trimmed)
      ? trimmed.toLowerCase().replace(/\b(gst|cgst|sgst|igst|ac|a\/c|bbq|caps|pax|am|pm|vip|dj|led|ro|tv)\b/g, (m) => m.toUpperCase())
      : trimmed
  return base.replace(/(^|[\s([/-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase())
}

const onUpperInput = (key, e) => {
  const rawUpper = String(e.target.value || '').toUpperCase()
  const nextVal = applyLiveEditCap(rawUpper, form[key], LIMITS[key])
  form[key] = nextVal
  e.target.value = nextVal
}

const onCourseUpperInput = (course, key, e) => {
  const max = key === 'title' ? LIMITS.courseTitle : LIMITS.courseTiming
  const rawUpper = String(e.target.value || '').toUpperCase()
  const nextVal = applyLiveEditCap(rawUpper, course[key], max)
  course[key] = nextVal
  e.target.value = nextVal
}

const onCapitalizeInput = (target, key, e) => {
  const max = key === 'name' ? LIMITS.itemName : LIMITS.itemNote
  const rawCap = String(e.target.value || '').replace(/(^|[\s([/-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase())
  const nextVal = applyLiveEditCap(rawCap, target[key], max)
  target[key] = nextVal
  e.target.value = nextVal
}

const onFooterNoteInput = (idx, e) => {
  const rawCap = String(e.target.value || '').replace(/(^|[\s([/-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase())
  const nextVal = applyLiveEditCap(rawCap, form.footerNotes[idx], LIMITS.footerNote)
  form.footerNotes[idx] = nextVal
  e.target.value = nextVal
}

const insertRupeeSymbol = async () => {
  if (form.priceDetails.length >= LIMITS.priceDetails) return
  form.priceDetails = toUpperClean(form.priceDetails ? form.priceDetails + ' ₹' : '₹', LIMITS.priceDetails)
  await nextTick()
  priceInputRef.value?.focus()
}

const totalItemsCount = computed(() =>
  form.courses.reduce((sum, c) => sum + c.items.length, 0)
)

const scaleBadgeText = computed(() => {
  const colText = isTwoColumnLayout.value ? '2 Cols' : '1 Col'
  const pgText = `${pageCount.value} ${pageCount.value === 1 ? 'Page' : 'Pages'}`
  return `${colText} • ${pgText}${isDirty.value ? ' • Unsaved' : ''}`
})

const addCourse = async () => {
  if (form.courses.length >= MAX_COURSES) return
  const newId = makeId()
  form.courses.push({
    id: newId,
    title: 'STARTERS',
    timing: '',
    items: [{ id: makeId(), name: '', note: '' }]
  })
  await nextTick()
  const el = document.getElementById(`course-title-${newId}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (window.matchMedia('(min-width: 1024px)').matches) {
      el.focus({ preventScroll: true })
      el.select()
    }
  }
}

const removeCourse = (idx) => {
  if (form.courses.length > 1) form.courses.splice(idx, 1)
}

const moveCourse = (from, to) => {
  if (to < 0 || to >= form.courses.length) return
  const [moved] = form.courses.splice(from, 1)
  form.courses.splice(to, 0, moved)
}

const addItem = (course) => {
  if (totalItemsCount.value >= MAX_TOTAL_ITEMS || course.items.length >= MAX_ITEMS_PER_COURSE) return
  course.items.push({ id: makeId(), name: '', note: '' })
}

const moveItem = (course, from, to) => {
  if (to < 0 || to >= course.items.length) return
  const [moved] = course.items.splice(from, 1)
  course.items.splice(to, 0, moved)
}

const overLimitWarnings = ref([])
const isOverLimitModalOpen = ref(false)

const jumpToOverLimitField = async (targetId) => {
  isOverLimitModalOpen.value = false
  if (!targetId) return
  mobileTab.value = 'editor'
  await nextTick()
  const el = document.getElementById(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.focus({ preventScroll: true })
  }
}

const resetToSample = async () => {
  if (isDirty.value && !confirm('Discard unsaved quotation changes and reset to sample?')) {
    return
  }
  isSuppressingDirty = true
  overLimitWarnings.value = []
  isOverLimitModalOpen.value = false
  Object.assign(form, createSampleState())
  await nextTick()
  isDirty.value = false
  isSuppressingDirty = false
}

const isJsonModalOpen = ref(false)
const jsonModalTab = ref('import')

const openJsonModal = (tab = 'import') => {
  jsonModalTab.value = tab
  isJsonModalOpen.value = true
}

const handleQuotationJsonLoaded = ({ data, mode }) => {
  const warnings = []
  const checkWarn = (val, max, label, targetId) => {
    if (val.length > max) {
      warnings.push({ label, length: val.length, max, targetId })
    }
  }

  if (mode === 'full') {
    if (data.refNo) {
      form.refNo = toUpperImported(data.refNo)
      checkWarn(form.refNo, LIMITS.refNo, 'Quotation Ref No.', 'q-ref-no')
    }
    if (data.quoteDate) {
      form.quoteDate = toUpperImported(data.quoteDate)
      checkWarn(form.quoteDate, LIMITS.quoteDate, 'Quotation Issue Date', 'q-quote-date')
    }
    if (data.clientName !== undefined) {
      form.clientName = toUpperImported(data.clientName)
      checkWarn(form.clientName, LIMITS.clientName, 'Order To / Client', 'q-client-name')
    }
    if (data.clientPhone !== undefined) {
      form.clientPhone = toUpperImported(data.clientPhone)
      checkWarn(form.clientPhone, LIMITS.clientPhone, 'Phone', 'q-client-phone')
    }
    if (data.guaranteedPax !== undefined) {
      form.guaranteedPax = toUpperImported(data.guaranteedPax)
      checkWarn(form.guaranteedPax, LIMITS.guaranteedPax, 'Pax', 'q-guaranteed-pax')
    }
    if (data.dateTime !== undefined) {
      form.dateTime = toUpperImported(data.dateTime)
      checkWarn(form.dateTime, LIMITS.dateTime, 'Event Date & Time', 'q-date-time')
    }
    if (data.venueProgram !== undefined) {
      form.venueProgram = toUpperImported(data.venueProgram)
      checkWarn(form.venueProgram, LIMITS.venueProgram, 'Venue & Program', 'q-venue-program')
    }
    if (data.priceDetails !== undefined) {
      form.priceDetails = toUpperImported(data.priceDetails)
      checkWarn(form.priceDetails, LIMITS.priceDetails, 'Price Details', 'q-price-details')
    }
    if (data.serviceHeading) {
      form.serviceHeading = toUpperImported(data.serviceHeading)
      checkWarn(form.serviceHeading, LIMITS.serviceHeading, 'Service Menu Title', 'q-service-heading')
    }

    if (Array.isArray(data.footerNotes)) {
      form.footerNotes = [0, 1, 2].map((i) => {
        const val = toCapitalizeImported(data.footerNotes[i] || '')
        checkWarn(val, LIMITS.footerNote, `Note Line #${i + 1}`, `q-footer-note-${i}`)
        return val
      })
    } else if (data.footerNote !== undefined) {
      const val = toCapitalizeImported(data.footerNote)
      checkWarn(val, LIMITS.footerNote, 'Note Line #1', 'q-footer-note-0')
      form.footerNotes = [val, '', '']
    }
  }

  if (Array.isArray(data.courses) && data.courses.length > 0) {
    let budget = MAX_TOTAL_ITEMS
    const cleanCourses = []

    data.courses.slice(0, MAX_COURSES).forEach((rawCourse, cIdx) => {
      if (budget <= 0) return
      const courseId = makeId()
      const courseTitle = toUpperImported(rawCourse.title || 'COURSE')
      const courseTiming = toUpperImported(rawCourse.timing || '')
      checkWarn(courseTitle, LIMITS.courseTitle, `Course #${cIdx + 1} Heading`, `course-title-${courseId}`)
      checkWarn(courseTiming, LIMITS.courseTiming, `Course #${cIdx + 1} Timing`, `course-timing-${courseId}`)

      const rawItems = Array.isArray(rawCourse.items) ? rawCourse.items : []
      const allowedCount = Math.min(rawItems.length, MAX_ITEMS_PER_COURSE, budget)
      const mappedItems = rawItems.slice(0, allowedCount).map((it, iIdx) => {
        const itemId = makeId()
        const dName = toCapitalizeImported(typeof it === 'string' ? it : it?.name)
        const dNote = toCapitalizeImported(typeof it === 'object' ? it?.note : '')
        checkWarn(dName, LIMITS.itemName, `Course #${cIdx + 1} • Dish #${iIdx + 1}`, `dish-name-${itemId}`)
        checkWarn(dNote, LIMITS.itemNote, `Course #${cIdx + 1} • Dish #${iIdx + 1} Sub-note`, `dish-note-${itemId}`)
        return { id: itemId, name: dName, note: dNote }
      })

      budget -= mappedItems.length
      cleanCourses.push({
        id: courseId,
        title: courseTitle,
        timing: courseTiming,
        items: mappedItems.length ? mappedItems : [{ id: makeId(), name: '', note: '' }]
      })
    })

    if (cleanCourses.length > 0) {
      form.courses = cleanCourses
    }
  } else if (mode === 'full' && Array.isArray(data.courses) && data.courses.length === 0) {
    form.courses = [
      {
        id: makeId(),
        title: '',
        timing: '',
        items: [{ id: makeId(), name: '', note: '' }]
      }
    ]
  }

  overLimitWarnings.value = warnings
  isOverLimitModalOpen.value = warnings.length > 0
  isDirty.value = true
}

const handleBeforeUnload = (e) => {
  if (isDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onBeforeRouteLeave(() => {
  if (isDirty.value) {
    return confirm('You have unsaved changes to this quotation. Leave anyway and discard changes?')
  }
})

// -- 3. CANVAS VECTOR ICONS & TYPOGRAPHY HELPERS --
let logoImage = null
let illustrationImage = null
let rafId = null

const drawTrackedText = (ctx, text, x, y, trackingPx = 0, align = 'center') => {
  const str = String(text || '')
  if (!str) return 0
  if (!trackingPx) {
    ctx.textAlign = align
    ctx.fillText(str, x, y)
    return ctx.measureText(str).width
  }
  const chars = Array.from(str)
  const widths = chars.map((ch) => ctx.measureText(ch).width)
  const totalWidth = widths.reduce((a, b) => a + b, 0) + trackingPx * (chars.length - 1)
  let cursorX = align === 'center' ? x - totalWidth / 2 : align === 'right' ? x - totalWidth : x
  ctx.textAlign = 'left'
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cursorX, y)
    cursorX += widths[i] + trackingPx
  }
  return totalWidth
}

const wrapTextLines = (ctx, text, maxWidth) => {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const lines = []
  let current = words[0]
  for (let i = 1; i < words.length; i++) {
    const candidate = current + ' ' + words[i]
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate
    } else {
      lines.push(current)
      current = words[i]
    }
  }
  lines.push(current)
  return lines
}

// Summary Table Row Icons (Amber Vector Primitives)
const drawSummaryRowIcon = (ctx, type, cx, cy, color = '#EA8C1E') => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 2.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (type === 'user') {
    ctx.beginPath()
    ctx.arc(cx, cy - 6, 6.5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx, cy + 13, 12, Math.PI * 1.12, Math.PI * 1.88)
    ctx.closePath()
    ctx.stroke()
  } else if (type === 'calendar') {
    ctx.beginPath()
    ctx.roundRect(cx - 12, cy - 10, 24, 22, 4)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx - 12, cy - 3)
    ctx.lineTo(cx + 12, cy - 3)
    ctx.moveTo(cx - 6, cy - 14)
    ctx.lineTo(cx - 6, cy - 7)
    ctx.moveTo(cx + 6, cy - 14)
    ctx.lineTo(cx + 6, cy - 7)
    ctx.stroke()
    for (let gx = -6; gx <= 6; gx += 6) {
      for (let gy = 2; gy <= 7; gy += 5) {
        ctx.fillRect(cx + gx - 1.3, cy + gy - 1.3, 2.6, 2.6)
      }
    }
  } else if (type === 'pin') {
    ctx.beginPath()
    ctx.arc(cx, cy - 3, 9.5, Math.PI * 0.85, Math.PI * 0.15, false)
    ctx.lineTo(cx, cy + 14)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#FDF6EC'
    ctx.beginPath()
    ctx.arc(cx, cy - 3.5, 3.8, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === 'rupee') {
    ctx.font = '700 28px "Inter", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('₹', cx, cy + 1)
  }
  ctx.restore()
}

const drawPhoneIcon = (ctx, cx, cy, size, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const r = size / 2
  ctx.beginPath()
  ctx.moveTo(cx - r * 0.65, cy - r * 0.85)
  ctx.lineTo(cx - r * 0.2, cy - r * 0.85)
  ctx.lineTo(cx - r * 0.02, cy - r * 0.25)
  ctx.lineTo(cx - r * 0.35, cy + r * 0.02)
  ctx.quadraticCurveTo(cx - r * 0.05, cy + r * 0.45, cx + r * 0.35, cy + r * 0.65)
  ctx.lineTo(cx + r * 0.6, cy + r * 0.32)
  ctx.lineTo(cx + r * 0.95, cy + r * 0.52)
  ctx.lineTo(cx + r * 0.85, cy + r * 0.92)
  ctx.quadraticCurveTo(cx - r * 0.75, cy + r * 0.85, cx - r * 0.65, cy - r * 0.85)
  ctx.stroke()
  ctx.restore()
}

const drawGlobeIcon = (ctx, cx, cy, radius, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.4
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(cx, cy, radius * 0.48, radius, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx - radius, cy)
  ctx.lineTo(cx + radius, cy)
  ctx.moveTo(cx - radius * 0.84, cy - radius * 0.48)
  ctx.lineTo(cx + radius * 0.84, cy - radius * 0.48)
  ctx.moveTo(cx - radius * 0.84, cy + radius * 0.48)
  ctx.lineTo(cx + radius * 0.84, cy + radius * 0.48)
  ctx.stroke()
  ctx.restore()
}

const drawFacebookIcon = (ctx, cx, cy, radius, color) => {
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = `700 ${Math.round(radius * 1.45)}px "Inter", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('f', cx + 1, cy + 2)
  ctx.restore()
}

const drawInstagramIcon = (ctx, cx, cy, size, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.6
  const half = size / 2
  ctx.beginPath()
  ctx.roundRect(cx - half, cy - half, size, size, size * 0.28)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.24, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx + size * 0.27, cy - size * 0.27, 2.4, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// -- 4. MASTER A4 CANVAS RENDER ENGINE (EXECUTIVE LETTERHEAD EDITION) --
const renderSinglePageCanvas = (canvas, pageSlice, pageIdx, totalPages, isTwoColumnGlobal) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = CANVAS_W
  const H = CANVAS_H
  const marginX = 88
  const rightEdge = W - marginX

  ctx.clearRect(0, 0, W, H)

  // Pure Crisp Stationery Base
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, W, H)

  // -- SECTION A: EXECUTIVE SPLIT LETTERHEAD --
  const headerRuleY = 346

  // 1. Top-Right Architectural Watercolor (Drawn first so text stays razor-sharp)
  if (illustrationImage && illustrationImage.complete && illustrationImage.naturalWidth > 0) {
    const aspect = illustrationImage.naturalWidth / illustrationImage.naturalHeight
    let illW = 845
    let illH = illW / aspect
    if (illH > 304) {
      illH = 304
      illW = illH * aspect
    }
    const illX = rightEdge - illW + 10
    const illY = headerRuleY - illH - 2
    ctx.drawImage(illustrationImage, illX, illY, illW, illH)
  }

  // 2. Left Brand Lockup: Crest + HOTEL + CAPS
  const crestCenterX = 214
  if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
    const logoH = 118
    const logoW = logoH * (logoImage.naturalWidth / logoImage.naturalHeight)
    ctx.drawImage(logoImage, crestCenterX - logoW / 2, 52, logoW, logoH)
  }

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#0F172A'
  ctx.font = '700 29px "Faculty Glyphic", serif'
  drawTrackedText(ctx, 'HOTEL', crestCenterX, 206, 5.5, 'center')

  ctx.font = '700 54px "Faculty Glyphic", serif'
  drawTrackedText(ctx, 'CAPS', crestCenterX, 260, 3, 'center')

  // 3. Vertical Amber Divider + Hospitality Pillars
  ctx.strokeStyle = '#EA8C1E'
  ctx.lineWidth = 3.8
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(358, 76)
  ctx.lineTo(358, 232)
  ctx.stroke()

  ctx.fillStyle = '#0F172A'
  ctx.font = '700 22.5px "Inter", sans-serif'
  drawTrackedText(ctx, 'LUXURY ROOMS', 394, 112, 1.4, 'left')
  drawTrackedText(ctx, 'A/C FAMILY RESTAURANT', 394, 160, 1.4, 'left')
  drawTrackedText(ctx, 'EVENTS & CATERING', 394, 208, 1.4, 'left')

  // 4. Full-Width Amber Letterhead Rule
  ctx.strokeStyle = '#EA8C1E'
  ctx.lineWidth = 3.8
  ctx.beginPath()
  ctx.moveTo(marginX, headerRuleY)
  ctx.lineTo(rightEdge, headerRuleY)
  ctx.stroke()

  // -- SECTION B: QUOTATION TITLE & REFERENCE BAND --
  const titleBandBottomY = 486
  ctx.fillStyle = '#0F172A'
  ctx.font = '700 54px "Faculty Glyphic", serif'
  drawTrackedText(ctx, 'QUOTATION', marginX + 10, 436, 4.5, 'left')

  // Right Reference & Date Block
  const refBarX = 944
  ctx.strokeStyle = '#EA8C1E'
  ctx.lineWidth = 3.6
  ctx.beginPath()
  ctx.moveTo(refBarX, 374)
  ctx.lineTo(refBarX, 456)
  ctx.stroke()

  ctx.textAlign = 'left'
  ctx.fillStyle = '#1E293B'
  ctx.font = '600 22px "Inter", sans-serif'
  ctx.fillText('REF No.', refBarX + 28, 405)
  ctx.fillText(':', refBarX + 148, 405)
  ctx.fillText('DATE', refBarX + 28, 448)
  ctx.fillText(':', refBarX + 148, 448)

  ctx.fillStyle = '#0F172A'
  ctx.font = '700 22.5px "Inter", sans-serif'
  ctx.fillText(clampText(form.refNo, LIMITS.refNo) || '—', refBarX + 174, 405)
  ctx.fillText(clampText(form.quoteDate, LIMITS.quoteDate) || formatTodayDate(), refBarX + 174, 448)

  // Subtle Sub-Band Hairline
  ctx.strokeStyle = '#E2E8F0'
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.moveTo(marginX, titleBandBottomY)
  ctx.lineTo(rightEdge, titleBandBottomY)
  ctx.stroke()

  // -- SECTION C: ICON-ENHANCED EVENT SUMMARY CARD --
  const cardX = marginX
  const cardY = 514
  const cardW = rightEdge - marginX
  const labelColW = 436
  const valColX = cardX + labelColW
  const valMaxW = cardW - labelColW - 60

  const paxFormatted = (() => {
    const raw = clampText(form.guaranteedPax, LIMITS.guaranteedPax)
    if (!raw) return ''
    return raw.includes('PAX') ? raw : `PAX : ${raw}`
  })()

  const orderRowVal = [
    clampText(form.clientName, LIMITS.clientName),
    clampText(form.clientPhone, LIMITS.clientPhone),
    paxFormatted
  ].filter(Boolean).join('   •   ') || '—'

  ctx.font = '600 22.5px "Inter", sans-serif'
  const summaryRows = [
    { icon: 'user', label: 'ORDER TO', lines: wrapTextLines(ctx, orderRowVal, valMaxW).slice(0, 2) },
    { icon: 'calendar', label: 'DATE & TIME', lines: wrapTextLines(ctx, clampText(form.dateTime, LIMITS.dateTime) || '—', valMaxW).slice(0, 2) },
    { icon: 'pin', label: 'VENUE & PROGRAM', lines: wrapTextLines(ctx, clampText(form.venueProgram, LIMITS.venueProgram) || '—', valMaxW).slice(0, 2) },
    { icon: 'rupee', label: 'PRICE DETAILS', lines: wrapTextLines(ctx, clampText(form.priceDetails, LIMITS.priceDetails) || '—', valMaxW).slice(0, 2) }
  ]

  const rowHeights = summaryRows.map((r) => (r.lines.length > 1 ? 90 : 66))
  const totalCardH = rowHeights.reduce((a, b) => a + b, 0)

  ctx.save()
  ctx.beginPath()
  ctx.roundRect(cardX, cardY, cardW, totalCardH, 16)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.clip()

  // Cream Label Column Fill
  ctx.fillStyle = '#FDF6EC'
  ctx.fillRect(cardX, cardY, labelColW, totalCardH)

  let rowCursorY = cardY
  summaryRows.forEach((row, idx) => {
    const rH = rowHeights[idx]
    if (idx > 0) {
      ctx.strokeStyle = '#E2E8F0'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(cardX, rowCursorY)
      ctx.lineTo(cardX + cardW, rowCursorY)
      ctx.stroke()
    }

    const rowMidY = rowCursorY + rH / 2
    drawSummaryRowIcon(ctx, row.icon, cardX + 50, rowMidY, '#EA8C1E')

    ctx.fillStyle = '#0F172A'
    ctx.font = '700 20px "Inter", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(row.label, cardX + 92, rowMidY + 1)

    ctx.fillStyle = '#0F172A'
    ctx.font = '600 22.5px "Inter", sans-serif'
    const lines = row.lines.length ? row.lines : ['—']
    if (lines.length === 1) {
      ctx.fillText(lines[0], valColX + 30, rowMidY + 1)
    } else {
      ctx.fillText(lines[0], valColX + 30, rowMidY - 15)
      ctx.fillText(lines[1], valColX + 30, rowMidY + 16)
    }

    rowCursorY += rH
  })

  // Vertical Column Divider
  ctx.strokeStyle = '#E2E8F0'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(valColX, cardY)
  ctx.lineTo(valColX, cardY + totalCardH)
  ctx.stroke()
  ctx.restore()

  // Crisp Rounded Card Border
  ctx.strokeStyle = '#CBD5E1'
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.roundRect(cardX, cardY, cardW, totalCardH, 16)
  ctx.stroke()

  // -- SECTION D: 1-TO-2 COLUMN NUMBERED BANQUET MENU & CENTERED 3-LINE NOTES --
  const FOOTER_TOP_Y = 1924
  const activeNotes = form.footerNotes.map((n) => clampText(n, LIMITS.footerNote)).filter(Boolean)
  const notesReservedH = activeNotes.length > 0 ? 24 + activeNotes.length * 30 + 24 : 0
  const menuStartY = cardY + totalCardH + 46
  const menuMaxBottomY = FOOTER_TOP_Y - 26 - notesReservedH
  const scale = pageSlice.scale || 1

  let colTopY = menuStartY
  const headingStr = clampText(form.serviceHeading, LIMITS.serviceHeading)

  // 1. Service Menu Title Banner (Left on 1-Col; Globally Centered on 2-Col / Multi-Page)
  if (headingStr || totalPages > 1) {
    const headingSize = 30
    const lineY = menuStartY + headingSize + 13

    ctx.strokeStyle = '#E2E8F0'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(marginX + 8, lineY)
    ctx.lineTo(rightEdge - 8, lineY)
    ctx.stroke()

    if (headingStr) {
      ctx.font = `700 ${headingSize}px "Faculty Glyphic", serif`
      ctx.fillStyle = '#0F172A'
      ctx.textBaseline = 'alphabetic'

      if (isTwoColumnGlobal) {
        const hWidth = drawTrackedText(ctx, headingStr, W / 2, menuStartY + headingSize, 2.8, 'center')
        const barW = Math.min(hWidth + 44, 620)
        ctx.fillStyle = '#EA8C1E'
        ctx.fillRect(W / 2 - barW / 2, lineY - 1.5, barW, 3.8)
      } else {
        const hWidth = drawTrackedText(ctx, headingStr, marginX + 12, menuStartY + headingSize, 2.5, 'left')
        ctx.fillStyle = '#EA8C1E'
        ctx.fillRect(marginX + 12, lineY - 1.5, Math.min(hWidth + 24, 580), 3.8)
      }
    }

    // Subtle Page X of Y Badge on Service Menu Header Right (Only when > 1 Page)
    if (totalPages > 1) {
      const badgeLabel = `PAGE ${pageIdx + 1} OF ${totalPages}`
      ctx.font = '700 16px "Inter", sans-serif'
      const bTextW = ctx.measureText(badgeLabel).width
      const bPadX = 14
      const bW = bTextW + bPadX * 2
      const bH = 28
      const bX = rightEdge - 10 - bW
      const bY = lineY - bH - 8

      ctx.fillStyle = '#FFF7ED'
      ctx.strokeStyle = '#FDBA74'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.roundRect(bX, bY, bW, bH, 14)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#B45309'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(badgeLabel, bX + bW / 2, bY + bH / 2 + 1)
      ctx.textBaseline = 'alphabetic'
    }

    colTopY = menuStartY + 68
  }

  // 2. Render Column Slices (Numbered Courses & Numbered Dishes)
  const col1X = isTwoColumnGlobal ? marginX + 8 : marginX + 12
  const colW = isTwoColumnGlobal ? W / 2 - marginX - 40 : rightEdge - marginX - 24
  const col2X = W / 2 + 32

  const col1EndY = drawMenuColumnSlices(ctx, pageSlice.col1, col1X, colTopY, colW, scale)
  let col2EndY = colTopY

  if (isTwoColumnGlobal && pageSlice.col2.length > 0) {
    col2EndY = drawMenuColumnSlices(ctx, pageSlice.col2, col2X, colTopY, colW, scale)

    // Delicate Center Column Divider
    ctx.strokeStyle = '#E2E8F0'
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(W / 2, colTopY + 4)
    ctx.lineTo(W / 2, Math.min(Math.max(col1EndY, col2EndY) - 6, menuMaxBottomY))
    ctx.stroke()
  }

  // 3. Adaptive 3-Line Bottom Notes (Left on 1-Col Single Page; Centered on 2-Col / Multi-Page)
  if (activeNotes.length > 0) {
    const notesBlockTopY = FOOTER_TOP_Y - 24 - activeNotes.length * 30 - 16
    const maxNoteW = rightEdge - marginX - 24

    ctx.strokeStyle = '#F6C58E'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    if (isTwoColumnGlobal) {
      ctx.moveTo(W / 2 - 120, notesBlockTopY)
      ctx.lineTo(W / 2 + 120, notesBlockTopY)
    } else {
      ctx.moveTo(marginX + 12, notesBlockTopY)
      ctx.lineTo(marginX + 252, notesBlockTopY)
    }
    ctx.stroke()

    ctx.fillStyle = '#EA8C1E'
    if (isTwoColumnGlobal) {
      ctx.fillRect(W / 2 - 22, notesBlockTopY - 1.5, 44, 3)
    } else {
      ctx.fillRect(marginX + 12, notesBlockTopY - 1.5, 44, 3)
    }

    ctx.font = '600 20.5px "Inter", sans-serif'
    ctx.fillStyle = '#0F172A'
    ctx.textAlign = isTwoColumnGlobal ? 'center' : 'left'
    ctx.textBaseline = 'alphabetic'

    const noteAnchorX = isTwoColumnGlobal ? W / 2 : marginX + 12
    activeNotes.forEach((noteLine, idx) => {
      ctx.fillText(noteLine, noteAnchorX, notesBlockTopY + 30 + idx * 30, maxNoteW)
    })
  }

  // -- SECTION E: STATIONERY FOOTER --
  ctx.strokeStyle = '#EA8C1E'
  ctx.lineWidth = 3.8
  ctx.beginPath()
  ctx.moveTo(marginX, FOOTER_TOP_Y)
  ctx.lineTo(rightEdge, FOOTER_TOP_Y)
  ctx.stroke()

  const phoneCols = [
    { cx: 332, label: 'RESTAURANT & DELIVERY', num: '9207517064' },
    { cx: W / 2, label: 'EVENTS & CATERING', num: '8848369567' },
    { cx: W - 332, label: 'ROOMS BOOKING', num: '9048117064' }
  ]

  phoneCols.forEach((col) => {
    ctx.fillStyle = '#334155'
    ctx.font = '700 17px "Inter", sans-serif'
    ctx.textBaseline = 'alphabetic'
    drawTrackedText(ctx, col.label, col.cx, FOOTER_TOP_Y + 38, 1.3, 'center')

    drawPhoneIcon(ctx, col.cx - 118, FOOTER_TOP_Y + 76, 25, '#EA8C1E')
    ctx.fillStyle = '#0F172A'
    ctx.font = '700 32px "Inter", sans-serif'
    drawTrackedText(ctx, col.num, col.cx + 14, FOOTER_TOP_Y + 87, 1.2, 'center')
  })

  // Vertical Amber Phone Dividers
  ctx.strokeStyle = '#F39A3E'
  ctx.lineWidth = 2.2
  ;[578, W - 578].forEach((divX) => {
    ctx.beginPath()
    ctx.moveTo(divX, FOOTER_TOP_Y + 28)
    ctx.lineTo(divX, FOOTER_TOP_Y + 92)
    ctx.stroke()
  })

  // Soft Amber Hairline #1
  const rule2Y = FOOTER_TOP_Y + 114
  ctx.strokeStyle = '#F6C58E'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(marginX, rule2Y)
  ctx.lineTo(rightEdge, rule2Y)
  ctx.stroke()

  // Pittupeedika Address
  ctx.fillStyle = '#0F172A'
  ctx.font = '600 26px "Faculty Glyphic", serif'
  ctx.textAlign = 'center'
  ctx.fillText('Main Road, Pittupeedika, Koduvayur, Palakkad.', W / 2, rule2Y + 42)

  // Facility Highlights
  const drawPipeSeparatedLine = (items, yPos) => {
    ctx.font = '700 18.5px "Inter", sans-serif'
    const sep = '   |   '
    const fullStr = items.join(sep)
    let startX = W / 2 - ctx.measureText(fullStr).width / 2
    ctx.textAlign = 'left'
    items.forEach((part, idx) => {
      ctx.fillStyle = '#1E293B'
      ctx.fillText(part, startX, yPos)
      startX += ctx.measureText(part).width
      if (idx < items.length - 1) {
        ctx.fillStyle = '#EA8C1E'
        ctx.fillText(sep, startX, yPos)
        startX += ctx.measureText(sep).width
      }
    })
  }

  drawPipeSeparatedLine(['LUXURY ROOMS', 'MULTI-CUISINE RESTAURANT', 'EVENT HALL'], rule2Y + 82)
  drawPipeSeparatedLine(['OUTDOOR CATERING', 'FREE HOME DELIVERY', 'LIFT FACILITY', 'CAR PARKING'], rule2Y + 116)

  // Soft Amber Hairline #2
  const rule3Y = rule2Y + 144
  ctx.strokeStyle = '#F6C58E'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(marginX, rule3Y)
  ctx.lineTo(rightEdge, rule3Y)
  ctx.stroke()

  // Bottom Web, Motto & Grouped Socials Row
  const bottomY = rule3Y + 48
  drawGlobeIcon(ctx, marginX + 20, bottomY - 8, 19, '#0F172A')
  ctx.fillStyle = '#0F172A'
  ctx.font = '600 23.5px "Inter", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('www.capsfamily.in', marginX + 52, bottomY)

  const arrowX = marginX + 52 + ctx.measureText('www.capsfamily.in').width + 12
  ctx.strokeStyle = '#EA8C1E'
  ctx.lineWidth = 2.6
  ctx.beginPath()
  ctx.moveTo(arrowX, bottomY - 2)
  ctx.lineTo(arrowX + 14, bottomY - 16)
  ctx.moveTo(arrowX + 4, bottomY - 16)
  ctx.lineTo(arrowX + 14, bottomY - 16)
  ctx.lineTo(arrowX + 14, bottomY - 6)
  ctx.stroke()

  // Dividers flanking STAY. DINE. CELEBRATE.
  ctx.strokeStyle = '#F39A3E'
  ctx.lineWidth = 2.2
  ;[528, W - 528].forEach((dx) => {
    ctx.beginPath()
    ctx.moveTo(dx, bottomY - 26)
    ctx.lineTo(dx, bottomY + 10)
    ctx.stroke()
  })

  // Bold STAY. DINE. CELEBRATE.
  ctx.fillStyle = '#0F172A'
  ctx.font = '700 25px "Inter", sans-serif'
  drawTrackedText(ctx, 'STAY. DINE. CELEBRATE.', W / 2, bottomY, 2.2, 'center')

  // Tightly Grouped Right Social Lockup: [FB] hotelcapsfamily [IG]
  ctx.font = '600 23.5px "Inter", sans-serif'
  const handleStr = 'hotelcapsfamily'
  const handleW = ctx.measureText(handleStr).width
  const igSize = 33
  const fbRadius = 17.5
  const igCenterX = rightEdge - igSize / 2
  const handleX = igCenterX - igSize / 2 - 18 - handleW
  const fbCenterX = handleX - 14 - fbRadius

  drawFacebookIcon(ctx, fbCenterX, bottomY - 8, fbRadius, '#0F172A')
  ctx.fillStyle = '#0F172A'
  ctx.textAlign = 'left'
  ctx.fillText(handleStr, handleX, bottomY)
  drawInstagramIcon(ctx, igCenterX, bottomY - 8, igSize, '#0F172A')
}

// -- PIXEL-ACCURATE 2-COLUMN & MULTI-PAGE LAYOUT CALCULATOR --
let scratchCanvas = null
const getMeasureCtx = () => {
  if (!scratchCanvas) {
    scratchCanvas = document.createElement('canvas')
    scratchCanvas.width = 10
    scratchCanvas.height = 10
  }
  return scratchCanvas.getContext('2d')
}

const measureSummaryCardBottomY = (ctx) => {
  const cardW = CANVAS_W - 176
  const valMaxW = cardW - 436 - 60
  const rawPax = clampText(form.guaranteedPax, LIMITS.guaranteedPax)
  const paxFormatted = rawPax ? (rawPax.includes('PAX') ? rawPax : `PAX : ${rawPax}`) : ''
  const orderRowVal = [
    clampText(form.clientName, LIMITS.clientName),
    clampText(form.clientPhone, LIMITS.clientPhone),
    paxFormatted
  ].filter(Boolean).join('   •   ') || '—'

  ctx.font = '600 22.5px "Inter", sans-serif'
  const rows = [
    wrapTextLines(ctx, orderRowVal, valMaxW).slice(0, 2),
    wrapTextLines(ctx, clampText(form.dateTime, LIMITS.dateTime) || '—', valMaxW).slice(0, 2),
    wrapTextLines(ctx, clampText(form.venueProgram, LIMITS.venueProgram) || '—', valMaxW).slice(0, 2),
    wrapTextLines(ctx, clampText(form.priceDetails, LIMITS.priceDetails) || '—', valMaxW).slice(0, 2)
  ]
  const totalCardH = rows.reduce((sum, lines) => sum + (lines.length > 1 ? 90 : 66), 0)
  return 514 + totalCardH
}

const measureCourseHeaderH = (ctx, slice, colW, scale) => {
  const headerLabel = `${slice.courseNumber}. ${slice.title || 'COURSE'}`
  const courseFontSize = Math.round(24 * scale)
  ctx.font = `600 ${courseFontSize}px "Faculty Glyphic", serif`
  const cWidth = ctx.measureText(headerLabel).width

  if (!slice.timing) return { h: Math.round(50 * scale), timingInline: true, cWidth }

  const pillFont = Math.round(16.5 * scale)
  ctx.font = `700 ${pillFont}px "Inter", sans-serif`
  const pillW = ctx.measureText(slice.timing).width + Math.round(24 * scale)
  const timingInline = cWidth + Math.round(16 * scale) + pillW <= colW
  return {
    h: timingInline ? Math.round(50 * scale) : Math.round(82 * scale),
    timingInline,
    cWidth
  }
}

const measureDishItemH = (ctx, item, colW, scale) => {
  const dishIndentX = Math.round(48 * scale)
  const maxItemW = colW - dishIndentX - 8
  const itemFontSize = Math.round(22.5 * scale)
  const lineStep = Math.round(29 * scale)

  ctx.font = `600 ${itemFontSize}px "Inter", sans-serif`
  const dishLines = wrapTextLines(ctx, item.name, maxItemW)
  let h = Math.round(38 * scale) + Math.max(0, dishLines.length - 1) * lineStep

  if (item.note) {
    const noteSize = Math.round(18.5 * scale)
    ctx.font = `500 ${noteSize}px "Inter", sans-serif`
    const noteLines = wrapTextLines(ctx, item.note, maxItemW)
    h += Math.round(26 * scale) + Math.max(0, noteLines.length - 1) * Math.round(23 * scale)
  }
  return h
}

const measureSliceTotalH = (ctx, slice, colW, scale) => {
  let h = measureCourseHeaderH(ctx, slice, colW, scale).h
  for (const item of slice.items) {
    h += measureDishItemH(ctx, item, colW, scale)
  }
  return h + Math.round(18 * scale)
}

const drawMenuColumnSlices = (ctx, slices, colX, startY, colW, scale) => {
  let curY = startY
  const dishIndentX = Math.round(48 * scale)
  const maxItemW = colW - dishIndentX - 8

  slices.forEach((slice) => {
    const headerLabel = `${slice.courseNumber}. ${slice.title || 'COURSE'}`
    const courseFontSize = Math.round(24 * scale)
    const { timingInline } = measureCourseHeaderH(ctx, slice, colW, scale)

    ctx.font = `600 ${courseFontSize}px "Faculty Glyphic", serif`
    ctx.fillStyle = '#0F172A'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(headerLabel, colX, curY + courseFontSize)
    const cWidth = ctx.measureText(headerLabel).width

    ctx.fillStyle = '#F59E0B'
    ctx.fillRect(colX, curY + courseFontSize + 7, Math.min(cWidth, colW), 2.5)

    if (slice.timing) {
      const pillFont = Math.round(16.5 * scale)
      ctx.font = `700 ${pillFont}px "Inter", sans-serif`
      const tWidth = ctx.measureText(slice.timing).width
      const pillPadX = Math.round(12 * scale)
      const pillW = tWidth + pillPadX * 2
      const pillH = Math.round(27 * scale)
      const pillX = timingInline ? colX + cWidth + Math.round(16 * scale) : colX
      const pillY = timingInline ? curY + courseFontSize - pillH + 5 : curY + courseFontSize + 15

      ctx.fillStyle = '#FFF7ED'
      ctx.strokeStyle = '#FDBA74'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#C2410C'
      ctx.textBaseline = 'middle'
      ctx.fillText(slice.timing, pillX + pillPadX, pillY + pillH / 2 + 1)
      ctx.textBaseline = 'alphabetic'
    }

    curY += timingInline ? Math.round(50 * scale) : Math.round(82 * scale)

    slice.items.forEach((item) => {
      const itemFontSize = Math.round(22.5 * scale)
      const lineStep = Math.round(29 * scale)

      // Numbered Dish Prefix (1., 2., ... continuing cleanly across split columns)
      ctx.font = `700 ${Math.round(20 * scale)}px "Inter", sans-serif`
      ctx.fillStyle = '#EA8C1E'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(`${item.dishNumber}.`, colX + 6, curY + itemFontSize - 1)

      // Capitalized Dish Name
      ctx.font = `600 ${itemFontSize}px "Inter", sans-serif`
      ctx.fillStyle = '#1E293B'
      const dishLines = wrapTextLines(ctx, item.name, maxItemW)
      dishLines.forEach((line, lIdx) => {
        ctx.fillText(line, colX + dishIndentX, curY + itemFontSize + lIdx * lineStep)
      })
      curY += Math.round(38 * scale) + Math.max(0, dishLines.length - 1) * lineStep

      // Flush-Indented Accompaniment Sub-note
      if (item.note) {
        const noteSize = Math.round(18.5 * scale)
        const noteStep = Math.round(23 * scale)
        ctx.font = `500 ${noteSize}px "Inter", sans-serif`
        ctx.fillStyle = '#64748B'
        const noteLines = wrapTextLines(ctx, item.note, maxItemW)
        noteLines.forEach((nLine, nIdx) => {
          ctx.fillText(nLine, colX + dishIndentX, curY + noteSize - 4 + nIdx * noteStep)
        })
        curY += Math.round(26 * scale) + Math.max(0, noteLines.length - 1) * noteStep
      }
    })

    curY += Math.round(18 * scale)
  })

  return curY
}

const computeQuotationPages = (ctx) => {
  // Top of computeQuotationPages:
  const FOOTER_TOP_Y_INNER = 1924
  const marginX = 88
  const rightEdge = CANVAS_W - marginX
  const summaryBottomY = measureSummaryCardBottomY(ctx)
  const activeNotes = form.footerNotes.map((n) => clampText(n, LIMITS.footerNote)).filter(Boolean)
  const notesReservedH = activeNotes.length > 0 ? 24 + activeNotes.length * 30 + 24 : 0
  const menuStartY = summaryBottomY + 46
  const hasHeading = Boolean(clampText(form.serviceHeading, LIMITS.serviceHeading))
  const menuMaxBottomY = FOOTER_TOP_Y_INNER - 26 - notesReservedH

  const activeCourses = form.courses
    .map((c) => ({
      title: clampText(c.title, LIMITS.courseTitle),
      timing: clampText(c.timing, LIMITS.courseTiming),
      items: c.items
        .filter((it) => clampText(it.name, LIMITS.itemName))
        .map((it, idx) => ({
          dishNumber: idx + 1,
          name: clampText(it.name, LIMITS.itemName),
          note: clampText(it.note, LIMITS.itemNote)
        }))
    }))
    .filter((c) => c.title || c.items.length)
    .map((c, cIdx) => ({ ...c, courseNumber: cIdx + 1 }))

  if (!activeCourses.length) {
    return { isTwoColumnGlobal: false, pages: [{ col1: [], col2: [], scale: 1 }] }
  }

  // Pass 1: Test Single-Column Fit on Page 1
  const singleColTopY = hasHeading ? menuStartY + 68 : menuStartY
  const singleColAvailH = menuMaxBottomY - singleColTopY
  const singleColW = rightEdge - marginX - 24
  const totalSingleH = activeCourses.reduce((sum, c) => sum + measureSliceTotalH(ctx, c, singleColW, 1), 0)

  if (totalSingleH <= singleColAvailH) {
    return {
      isTwoColumnGlobal: false,
      pages: [{ col1: activeCourses, col2: [], scale: 1 }]
    }
  }

  // Pass 2: 2-Column Multi-Page Packing (Courses never split across pages)
  const twoColTopY = menuStartY + 68 // Reserves space for heading / Page X of Y
  const colAvailH = menuMaxBottomY - twoColTopY
  const twoColW = CANVAS_W / 2 - marginX - 40

  const trySplitCourseAcrossColumns = (course, remCol1H, remCol2H, scale) => {
    const headerH = measureCourseHeaderH(ctx, course, twoColW, scale).h
    const gapH = Math.round(18 * scale)
    if (remCol1H < headerH + gapH) return null

    let used1 = headerH
    let splitIdx = 0
    for (let i = 0; i < course.items.length; i++) {
      const dH = measureDishItemH(ctx, course.items[i], twoColW, scale)
      if (used1 + dH + gapH <= remCol1H) {
        used1 += dH
        splitIdx = i + 1
      } else {
        break
      }
    }

    if (splitIdx === 0) return null
    if (splitIdx === course.items.length) {
      return {
        slice1: course,
        used1: used1 + gapH,
        slice2: null,
        used2: 0
      }
    }

    const slice1 = { ...course, items: course.items.slice(0, splitIdx) }
    const slice2 = { ...course, items: course.items.slice(splitIdx) } // Repeats Course Header & continues numbering
    const used2 = measureSliceTotalH(ctx, slice2, twoColW, scale)

    if (used2 <= remCol2H) {
      return { slice1, used1: used1 + gapH, slice2, used2 }
    }
    return null
  }

  const pages = []
  let curPage = { col1: [], col2: [], scale: 1 }
  let inCol2 = false
  let col1Used = 0
  let col2Used = 0

  const pushAndResetPage = () => {
    if (curPage.col1.length || curPage.col2.length) pages.push(curPage)
    curPage = { col1: [], col2: [], scale: 1 }
    inCol2 = false
    col1Used = 0
    col2Used = 0
  }

  for (const course of activeCourses) {
    const fullH = measureSliceTotalH(ctx, course, twoColW, 1)
    const isUnbreakableCourse = course.items.length <= COURSE_UNBREAKABLE_MAX && fullH <= colAvailH

    if (isUnbreakableCourse) {
      if (!inCol2 && col1Used + fullH <= colAvailH) {
        curPage.col1.push(course)
        col1Used += fullH
      } else if (!inCol2 && fullH <= colAvailH) {
        inCol2 = true
        curPage.col2.push(course)
        col2Used += fullH
      } else if (inCol2 && col2Used + fullH <= colAvailH) {
        curPage.col2.push(course)
        col2Used += fullH
      } else {
        pushAndResetPage()
        curPage.col1.push(course)
        col1Used += fullH
      }
      continue
    }

    // Splittable Course (> 15 items, or taller than 1 column): can split Col1 -> Col2 on SAME page, NEVER across pages
    if (!inCol2) {
      const splitAttempt = trySplitCourseAcrossColumns(course, colAvailH - col1Used, colAvailH, 1)
      if (splitAttempt) {
        curPage.col1.push(splitAttempt.slice1)
        col1Used += splitAttempt.used1
        if (splitAttempt.slice2) {
          inCol2 = true
          curPage.col2.push(splitAttempt.slice2)
          col2Used += splitAttempt.used2
        }
        continue
      }
      // If Col1 had partial content and course fits wholly in empty Col2
      if (col1Used > 0 && fullH <= colAvailH) {
        inCol2 = true
        curPage.col2.push(course)
        col2Used += fullH
        continue
      }
    } else if (col2Used + fullH <= colAvailH) {
      curPage.col2.push(course)
      col2Used += fullH
      continue
    }

    // Move entire large course to a fresh page so it never splits across pages
    if (col1Used > 0 || col2Used > 0) pushAndResetPage()

    let chosenScale = 1
    let packed = null
    for (let s = 1; s >= 0.7; s = Math.round((s - 0.03) * 100) / 100) {
      const attempt = trySplitCourseAcrossColumns(course, colAvailH, colAvailH, s)
      if (attempt) {
        chosenScale = s
        packed = attempt
        break
      }
    }

    if (packed) {
      curPage.scale = Math.min(curPage.scale, chosenScale)
      curPage.col1.push(packed.slice1)
      col1Used += packed.used1
      if (packed.slice2) {
        inCol2 = true
        curPage.col2.push(packed.slice2)
        col2Used += packed.used2
      }
    } else {
      // Extreme manual-input fallback: slices across Col 1 -> Col 2 -> Next Page with zero clipping
      const safeScale = 0.74
      const takeFittingItems = (items, availH) => {
        const headerH = measureCourseHeaderH(ctx, course, twoColW, safeScale).h
        const gapH = Math.round(18 * safeScale)
        let used = headerH
        let count = 0
        for (let i = 0; i < items.length; i++) {
          const dH = measureDishItemH(ctx, items[i], twoColW, safeScale)
          if (used + dH + gapH <= availH || count === 0) {
            used += dH
            count++
          } else {
            break
          }
        }
        return {
          taken: items.slice(0, count),
          rest: items.slice(count),
          used: used + gapH
        }
      }

      let remaining = [...course.items]
      while (remaining.length > 0) {
        curPage.scale = Math.min(curPage.scale, safeScale)
        const c1 = takeFittingItems(remaining, colAvailH)
        curPage.col1.push({ ...course, items: c1.taken })
        col1Used = c1.used
        remaining = c1.rest

        if (remaining.length > 0) {
          const c2 = takeFittingItems(remaining, colAvailH)
          inCol2 = true
          curPage.col2.push({ ...course, items: c2.taken })
          col2Used = c2.used
          remaining = c2.rest
        }

        if (remaining.length > 0) {
          pushAndResetPage()
        }
      }
    }
  }

  if (curPage.col1.length || curPage.col2.length) pages.push(curPage)

  const isTwoColumnGlobal = pages.length > 1 || pages[0].col2.length > 0
  return { isTwoColumnGlobal, pages }
}

const renderAllPages = async () => {
  if (typeof window === 'undefined') return
  const mCtx = getMeasureCtx()
  const { isTwoColumnGlobal, pages } = computeQuotationPages(mCtx)

  isTwoColumnLayout.value = isTwoColumnGlobal
  if (pageCount.value !== pages.length) {
    pageCount.value = pages.length
    await nextTick()
  }
  pageCanvasRefs.length = pages.length

  pages.forEach((pageSlice, idx) => {
    renderSinglePageCanvas(pageCanvasRefs[idx], pageSlice, idx, pages.length, isTwoColumnGlobal)
  })
}

const scheduleRender = () => {
  if (typeof window === 'undefined') return
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    renderAllPages()
    rafId = null
  })
}

watch(
  form,
  () => {
    if (!isSuppressingDirty) isDirty.value = true
    scheduleRender()
  },
  { deep: true }
)

// -- 5. CONTINUOUS TIMESTAMP FILENAME & MULTI-PAGE EXPORTS --
const getContinuousTimestamp = () => {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return (
    String(now.getFullYear()) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  )
}

const buildSlugFilename = (ext, pageIndex = null, totalPages = 1, fixedTs = null) => {
  const cleanClient = (clampText(form.clientName, LIMITS.clientName) || 'Guest')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const ts = fixedTs || getContinuousTimestamp()
  const pageSuffix = totalPages > 1 && pageIndex !== null ? `-p${pageIndex + 1}` : ''
  return `CAPS-Quotation-${cleanClient || 'banquet'}-${ts}${pageSuffix}.${ext}`
}

const canvasPagesToJpegBlobs = async () => {
  await renderAllPages()
  const activeCanvases = pageCanvasRefs.slice(0, pageCount.value).filter(Boolean)
  return Promise.all(
    activeCanvases.map(
      (canvas) =>
        new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
            'image/jpeg',
            0.94
          )
        })
    )
  )
}

const buildA4PdfBlobFromJpegs = async (jpegBlobs) => {
  const jpegBuffers = await Promise.all(
    jpegBlobs.map(async (b) => new Uint8Array(await b.arrayBuffer()))
  )
  const enc = new TextEncoder()
  const numPages = jpegBuffers.length

  const chunks = []
  const offsets = [0] // index 0 reserved for PDF free object
  let byteCursor = 0

  const pushBytes = (bytes) => {
    chunks.push(bytes)
    byteCursor += bytes.byteLength
  }

  // Binary PDF 1.4 Header
  pushBytes(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xff, 0xff, 0xff, 0xff, 0x0a]))

  // 1 0 obj: Catalog
  offsets[1] = byteCursor
  pushBytes(enc.encode('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'))

  // 2 0 obj: Pages Root with all Page Kids
  const kidsRefs = jpegBuffers.map((_, idx) => `${3 + idx * 3} 0 R`).join(' ')
  offsets[2] = byteCursor
  pushBytes(enc.encode(`2 0 obj\n<< /Type /Pages /Kids [${kidsRefs}] /Count ${numPages} >>\nendobj\n`))

  const streamCmd = 'q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ'

  jpegBuffers.forEach((jpegBytes, idx) => {
    const pageObjId = 3 + idx * 3
    const imgObjId = 4 + idx * 3
    const contentObjId = 5 + idx * 3

    offsets[pageObjId] = byteCursor
    pushBytes(
      enc.encode(
        `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${imgObjId} 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`
      )
    )

    offsets[imgObjId] = byteCursor
    pushBytes(
      enc.encode(
        `${imgObjId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${CANVAS_W} /Height ${CANVAS_H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.byteLength} >>\nstream\n`
      )
    )
    pushBytes(jpegBytes)
    pushBytes(enc.encode('\nendstream\nendobj\n'))

    offsets[contentObjId] = byteCursor
    pushBytes(
      enc.encode(`${contentObjId} 0 obj\n<< /Length ${streamCmd.length} >>\nstream\n${streamCmd}\nendstream\nendobj\n`)
    )
  })

  const totalObjects = 3 + numPages * 3
  const xrefOff = byteCursor
  const pad10 = (n) => String(n).padStart(10, '0')

  let xrefStr = `xref\n0 ${totalObjects}\n0000000000 65535 f \n`
  for (let id = 1; id < totalObjects; id++) {
    xrefStr += `${pad10(offsets[id])} 00000 n \n`
  }
  xrefStr += `trailer\n<< /Size ${totalObjects} /Root 1 0 R >>\nstartxref\n${xrefOff}\n%%EOF`
  pushBytes(enc.encode(xrefStr))

  const pdfBuffer = new Uint8Array(byteCursor)
  let ptr = 0
  for (const chunk of chunks) {
    pdfBuffer.set(chunk, ptr)
    ptr += chunk.byteLength
  }

  return new Blob([pdfBuffer], { type: 'application/pdf' })
}

const triggerBlobDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

const downloadJpg = async () => {
  isExporting.value = true
  try {
    const blobs = await canvasPagesToJpegBlobs()
    const ts = getContinuousTimestamp()
    for (let i = 0; i < blobs.length; i++) {
      if (i > 0) await new Promise((r) => setTimeout(r, 220))
      triggerBlobDownload(blobs[i], buildSlugFilename('jpg', i, blobs.length, ts))
    }
    isDirty.value = false
  } finally {
    isExporting.value = false
  }
}

const downloadPdf = async () => {
  isExporting.value = true
  try {
    const jpgBlobs = await canvasPagesToJpegBlobs()
    const pdfBlob = await buildA4PdfBlobFromJpegs(jpgBlobs)
    triggerBlobDownload(pdfBlob, buildSlugFilename('pdf'))
    isDirty.value = false
  } finally {
    isExporting.value = false
  }
}

const buildWhatsAppMessage = () => {
  const lines = [
    '*HOTEL CAPS — EVENT QUOTATION*',
    form.refNo ? `Ref: ${form.refNo} | Date: ${form.quoteDate || formatTodayDate()}` : '',
    '--------------------------------',
    `*Order To:* ${form.clientName || 'Valued Guest'}${form.guaranteedPax ? ' (' + (form.guaranteedPax.includes('PAX') ? form.guaranteedPax : 'PAX: ' + form.guaranteedPax) + ')' : ''}`,
    form.dateTime ? `*Date & Time:* ${form.dateTime}` : '',
    form.venueProgram ? `*Venue:* ${form.venueProgram}` : '',
    form.priceDetails ? `*Price Details:* ${form.priceDetails}` : '',
    '',
    form.serviceHeading ? `*${form.serviceHeading}*` : '*MENU*'
  ].filter(Boolean)

  let activeIdx = 0
  form.courses.forEach((c) => {
    const validItems = c.items.filter((i) => i.name.trim())
    if (!c.title.trim() && !validItems.length) return
    activeIdx++
    lines.push(`\n*${activeIdx}. ${c.title.trim() || 'COURSE'}${c.timing.trim() ? ' ' + c.timing.trim() : ''}*`)
    validItems.forEach((it, dIdx) => {
      lines.push(`${dIdx + 1}. ${it.name.trim()}${it.note.trim() ? ' (' + it.note.trim() + ')' : ''}`)
    })
  })

  const activeNotes = form.footerNotes.map((n) => n.trim()).filter(Boolean)
  if (activeNotes.length) {
    lines.push('')
    activeNotes.forEach((n) => lines.push(`_${n}_`))
  }
  lines.push('\nwww.capsfamily.in | Events: 8848369567')
  return lines.join('\n')
}

const shareNativeFile = async () => {
  isExporting.value = true
  try {
    const isPdf = shareFormat.value === 'pdf'
    const jpgBlobs = await canvasPagesToJpegBlobs()
    const ts = getContinuousTimestamp()

    const files = isPdf
      ? [new File([await buildA4PdfBlobFromJpegs(jpgBlobs)], buildSlugFilename('pdf', null, 1, ts), { type: 'application/pdf' })]
      : jpgBlobs.map((blob, idx) => new File([blob], buildSlugFilename('jpg', idx, jpgBlobs.length, ts), { type: 'image/jpeg' }))

    if (navigator.canShare && navigator.canShare({ files })) {
      await navigator.share({
        files,
        title: `Hotel CAPS Quotation - ${form.clientName || 'Guest'}`,
        text: 'Official event quotation from Hotel CAPS, Koduvayur.'
      })
      isDirty.value = false
    } else {
      for (let i = 0; i < files.length; i++) {
        if (i > 0) await new Promise((r) => setTimeout(r, 220))
        triggerBlobDownload(files[i], files[i].name)
      }
      isDirty.value = false
    }
  } catch (err) {
    if (err?.name !== 'AbortError') console.error(err)
  } finally {
    isExporting.value = false
  }
}

const shareWhatsApp = () => {
  const digits = (form.clientPhone || '').replace(/\D/g, '')
  const targetPhone = digits.length === 10 ? `91${digits}` : digits.length >= 11 ? digits : ''
  const encoded = encodeURIComponent(buildWhatsAppMessage())
  const waUrl = targetPhone
    ? `https://wa.me/${targetPhone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`
  window.open(waUrl, '_blank', 'noopener,noreferrer')
}

// Off-DOM Canvas Font Warm-Up (Zero visible DOM elements)
const warmUpCanvasFonts = async () => {
  if (!document.fonts) return
  try {
    await Promise.all([
      document.fonts.load('400 26px "Faculty Glyphic"'),
      document.fonts.load('600 26px "Faculty Glyphic"'),
      document.fonts.load('700 54px "Faculty Glyphic"'),
      document.fonts.load('500 20px "Inter"'),
      document.fonts.load('600 24px "Inter"'),
      document.fonts.load('700 32px "Inter"')
    ])
    const sCtx = getMeasureCtx()
    ;[
      '400 20px "Faculty Glyphic"',
      '600 20px "Faculty Glyphic"',
      '700 20px "Faculty Glyphic"',
      '500 20px "Inter"',
      '600 20px "Inter"',
      '700 20px "Inter"'
    ].forEach((f) => {
      sCtx.font = f
      sCtx.fillText('CAPS', 0, 8)
    })
  } catch (e) {}
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)

  logoImage = new Image()
  logoImage.onload = () => scheduleRender()
  logoImage.src = '/images/caps-solid-logo.png'

  illustrationImage = new Image()
  illustrationImage.onload = () => scheduleRender()
  illustrationImage.src = '/images/caps-illustration.webp'

  await warmUpCanvasFonts()
  if (document.fonts) {
    document.fonts.ready.then(() => scheduleRender())
  }
  scheduleRender()
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  if (rafId) cancelAnimationFrame(rafId)
})

const pageTitle = 'Quotation Studio - Hotel CAPS | Brandsta'
const pageDesc = 'Instant A4 hospitality quotation generator for Hotel CAPS events, banquets, and outdoor catering.'
const canonicalUrl = 'https://caps.brandsta.cc/quotation'
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