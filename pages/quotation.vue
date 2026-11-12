<!-- pages/quotation.vue -->
<template>
  <div class="px-3 sm:px-5 md:px-6 py-4 sm:py-5 min-h-[calc(100vh-93px)] lg:h-[calc(100vh-93px)] lg:min-h-0 flex flex-col gap-5">
    
    <!-- Unified Studio Command Dock -->
    <section class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 backdrop-blur-md shrink-0 shadow-xl space-y-3 lg:space-y-0">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
        
        <!-- Left Cluster: Hub Return + Title + Reset (Mobile) -->
        <div class="flex items-center justify-between lg:justify-start gap-3">
          <div class="flex items-center gap-3">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.97] border border-slate-700/80 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Hub
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

          <div class="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              @click="openJsonModal('import')"
              class="px-2.5 py-2 rounded-xl bg-[#030712] hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-[#0068fe]" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Import</span>
            </button>
            <button
              type="button"
              @click="openJsonModal('guide')"
              aria-label="AI Prompt Guide"
              class="w-8.5 h-8.5 rounded-xl bg-[#030712] hover:bg-[#0068fe]/20 text-slate-300 hover:text-[#0068fe] border border-slate-700/80 font-serif italic font-bold text-xs flex items-center justify-center cursor-pointer"
            >
              i
            </button>
            <button
              type="button"
              @click="resetToSample"
              class="px-2.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 border border-slate-700/60 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Right Cluster: Organized Export & Share Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-center gap-2 sm:gap-2.5">
          
          <button
            type="button"
            @click="openJsonModal('import')"
            class="hidden lg:inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#030712] hover:bg-slate-800 active:scale-[0.97] border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            title="Import Quotation JSON"
          >
            <svg class="w-4 h-4 text-[#0068fe] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Import</span>
          </button>

          <button
            type="button"
            @click="openJsonModal('guide')"
            aria-label="AI Prompt Guide"
            title="AI Prompt Guide & JSON Schema"
            class="hidden lg:inline-flex w-9.5 h-9.5 rounded-xl bg-[#030712] hover:bg-[#0068fe]/20 text-slate-300 hover:text-[#0068fe] border border-slate-700/80 hover:border-[#0068fe]/50 font-serif italic font-bold text-sm items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            i
          </button>

          <button
            type="button"
            @click="resetToSample"
            class="hidden lg:inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 active:scale-[0.97] border border-slate-700/60 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            title="Load sample quotation"
          >
            Reset
          </button>

          <!-- Download JPG -->
          <button
            type="button"
            :disabled="isExporting"
            @click="downloadJpg"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.97] border border-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
          >
            <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>JPG</span>
          </button>

          <!-- Download PDF -->
          <button
            type="button"
            :disabled="isExporting"
            @click="downloadPdf"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.97] text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/15 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>PDF</span>
          </button>

          <!-- Native OS Share (with format toggle) -->
          <div class="inline-flex items-center justify-between rounded-xl bg-[#0068fe] p-0.5 shadow-lg shadow-[#0068fe]/20">
            <button
              type="button"
              :disabled="isExporting"
              @click="shareNativeFile"
              class="grow inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
            <button
              type="button"
              @click="shareFormat = shareFormat === 'pdf' ? 'jpg' : 'pdf'"
              class="px-2 py-2 rounded-lg bg-slate-950/35 hover:bg-slate-950/55 text-[10px] font-extrabold uppercase tracking-wider text-blue-100 transition-colors cursor-pointer shrink-0"
              title="Switch Native Share format between PDF and JPG"
            >
              {{ shareFormat }}
            </button>
          </div>

          <!-- WhatsApp Direct Share -->
          <button
            type="button"
            @click="shareWhatsApp"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5.016L2 22l5.156-1.359c1.484.813 3.156 1.234 4.875 1.234 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.828 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.953-.125-.453-.141-1.047-.344-1.797-.672-3.156-1.359-5.219-4.547-5.375-4.766-.156-.203-1.281-1.703-1.281-3.25s.813-2.313 1.094-2.625c.297-.313.641-.391.859-.391.219 0 .422.016.609.016.188 0 .453-.078.703.531.266.625.891 2.172.969 2.328.078.156.125.344.031.547-.109.219-.156.344-.313.531-.156.188-.328.406-.469.547-.156.156-.328.328-.141.641.188.313.828 1.375 1.781 2.219 1.219 1.094 2.25 1.438 2.578 1.594.313.156.5.125.688-.078.188-.219.797-.922 1.016-1.234.203-.313.422-.266.703-.156.297.109 1.875.891 2.188 1.047.328.156.531.234.609.375.078.141.078.797-.172 1.5z"/>
            </svg>
            <span>WhatsApp</span>
          </button>

        </div>
      </div>

      <!-- Integrated Compact Mobile Mode Switcher (Merged Inside Dock) -->
      <div class="lg:hidden pt-3 border-t border-slate-800/80">
        <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#030712] border border-slate-800/90">
          <button
            type="button"
            @click="mobileTab = 'editor'"
            :class="mobileTab === 'editor' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-slate-200 font-semibold'"
            class="py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Edit Details ({{ totalItemsCount }})
          </button>
          <button
            type="button"
            @click="mobileTab = 'preview'"
            :class="mobileTab === 'preview' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-slate-200 font-semibold'"
            class="py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Live A4 Sheet
          </button>
        </div>
      </div>
    </section>

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
                <span>{{ form.refNo.length }}/{{ LIMITS.refNo }}</span>
              </div>
              <input
                id="q-ref-no"
                name="refNo"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.refNo"
                :value="form.refNo"
                @input="onUpperInput('refNo', $event)"
                placeholder="CAPS/QTN/2026/..."
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-quote-date">Quotation Issue Date</label>
                <span>{{ form.quoteDate.length }}/{{ LIMITS.quoteDate }}</span>
              </div>
              <input
                id="q-quote-date"
                name="quoteDate"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.quoteDate"
                :value="form.quoteDate"
                @input="onUpperInput('quoteDate', $event)"
                placeholder="DD/MM/YYYY"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Client Name + Phone + Guaranteed Pax -->
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
            <div class="sm:col-span-6">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-client-name">Order To / Client</label>
                <span>{{ form.clientName.length }}/{{ LIMITS.clientName }}</span>
              </div>
              <input
                id="q-client-name"
                name="clientName"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.clientName"
                :value="form.clientName"
                @input="onUpperInput('clientName', $event)"
                placeholder="Enter Name & Details"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div class="sm:col-span-3">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-client-phone">Phone</label>
                <span>{{ form.clientPhone.length }}/{{ LIMITS.clientPhone }}</span>
              </div>
              <input
                id="q-client-phone"
                name="clientPhone"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.clientPhone"
                :value="form.clientPhone"
                @input="onUpperInput('clientPhone', $event)"
                placeholder="Eg: 9207517064"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div class="sm:col-span-3">
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-guaranteed-pax">Pax</label>
                <span>{{ form.guaranteedPax.length }}/{{ LIMITS.guaranteedPax }}</span>
              </div>
              <input
                id="q-guaranteed-pax"
                name="guaranteedPax"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.guaranteedPax"
                :value="form.guaranteedPax"
                @input="onUpperInput('guaranteedPax', $event)"
                placeholder="Number of Expected Guests"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Event Date & Time + Venue & Program -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-date-time">Event Date & Time</label>
                <span>{{ form.dateTime.length }}/{{ LIMITS.dateTime }}</span>
              </div>
              <input
                id="q-date-time"
                name="dateTime"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.dateTime"
                :value="form.dateTime"
                @input="onUpperInput('dateTime', $event)"
                placeholder="DD/MM/YYYY • HH:MM AM/PM TO HH:MM AM/PM"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-venue-program">Venue & Program</label>
                <span>{{ form.venueProgram.length }}/{{ LIMITS.venueProgram }}</span>
              </div>
              <input
                id="q-venue-program"
                name="venueProgram"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.venueProgram"
                :value="form.venueProgram"
                @input="onUpperInput('venueProgram', $event)"
                placeholder="EVENT NAME AND VENUE"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
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
              <span>{{ form.priceDetails.length }}/{{ LIMITS.priceDetails }}</span>
            </div>
            <input
              id="q-price-details"
              ref="priceInputRef"
              name="priceDetails"
              type="text"
              autocomplete="off"
              :maxlength="LIMITS.priceDetails"
              :value="form.priceDetails"
              @input="onUpperInput('priceDetails', $event)"
              placeholder="₹XXX/- PAX + ₹XXXX/HOUR AC & ELECTRICAL CHARGES"
              class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Service Menu Title + Optional Footer Note -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-service-heading">Service Menu Title (Uppercase)</label>
                <span>{{ form.serviceHeading.length }}/{{ LIMITS.serviceHeading }}</span>
              </div>
              <input
                id="q-service-heading"
                name="serviceHeading"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.serviceHeading"
                :value="form.serviceHeading"
                @input="onUpperInput('serviceHeading', $event)"
                placeholder="BUFFET SERVICE MENU"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <label for="q-footer-note">Optional Note (Capitalized)</label>
                <span>{{ form.footerNote.length }}/{{ LIMITS.footerNote }}</span>
              </div>
              <input
                id="q-footer-note"
                name="footerNote"
                type="text"
                autocomplete="off"
                :maxlength="LIMITS.footerNote"
                :value="form.footerNote"
                @input="onCapitalizeInput(form, 'footerNote', $event)"
                placeholder="Contact Us : 9633817064"
                class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
              />
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
                  <span>{{ course.title.length }}/{{ LIMITS.courseTitle }}</span>
                </div>
                <input
                  :id="'course-title-' + course.id"
                  :name="'courseTitle_' + cIdx"
                  type="text"
                  autocomplete="off"
                  :maxlength="LIMITS.courseTitle"
                  :value="course.title"
                  @input="onCourseUpperInput(course, 'title', $event)"
                  placeholder="WELCOME DRINK / MAIN COURSE"
                  class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm font-semibold text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div class="sm:col-span-4">
                <div class="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <label :for="'course-timing-' + course.id">Timing (Optional)</label>
                  <span>{{ course.timing.length }}/{{ LIMITS.courseTiming }}</span>
                </div>
                <input
                  :id="'course-timing-' + course.id"
                  :name="'courseTiming_' + cIdx"
                  type="text"
                  autocomplete="off"
                  :maxlength="LIMITS.courseTiming"
                  :value="course.timing"
                  @input="onCourseUpperInput(course, 'timing', $event)"
                  placeholder="@ 10:45 AM"
                  class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white uppercase placeholder:text-slate-600 focus:outline-none transition-colors"
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
                    <span>{{ item.name.length }}/{{ LIMITS.itemName }}</span>
                  </div>
                  <input
                    :id="'dish-name-' + item.id"
                    :name="'dishName_' + cIdx + '_' + iIdx"
                    type="text"
                    autocomplete="off"
                    :maxlength="LIMITS.itemName"
                    :value="item.name"
                    @input="onCapitalizeInput(item, 'name', $event)"
                    placeholder="Pineapple Mint Lime"
                    class="w-full bg-slate-950 border border-slate-800 focus:border-[#0068fe] rounded-lg px-3.5 py-2.5 text-sm text-white capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div class="sm:col-span-4">
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <label :for="'dish-note-' + item.id">Sub-note (Optional)</label>
                    <span>{{ item.note.length }}/{{ LIMITS.itemNote }}</span>
                  </div>
                  <input
                    :id="'dish-note-' + item.id"
                    :name="'dishNote_' + cIdx + '_' + iIdx"
                    type="text"
                    autocomplete="off"
                    :maxlength="LIMITS.itemNote"
                    :value="item.note"
                    @input="onCapitalizeInput(item, 'note', $event)"
                    placeholder="Raitha, Pickle"
                    class="w-full bg-slate-950 border border-slate-800 focus:border-[#0068fe] rounded-lg px-3.5 py-2.5 text-sm text-slate-300 capitalize placeholder:text-slate-600 focus:outline-none transition-colors"
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

        <!-- Dedicated Vertical Scroll Viewport -->
        <div class="grow min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6">
          <div 
            :class="previewZoom === 'scroll' ? 'w-full max-w-170' : 'w-full max-w-100'"
            class="mx-auto aspect-1654/2339 shadow-[0_24px_60px_rgba(0,0,0,0.7)] rounded-sm overflow-hidden bg-white ring-1 ring-white/15 transition-all duration-200"
          >
            <canvas 
              ref="a4CanvasRef" 
              width="1654" 
              height="2339" 
              class="w-full h-full block"
            ></canvas>
          </div>
        </div>
      </aside>

    </div>
    <!-- AI Prompt & JSON Import Modal -->
    <QuotationJsonModal
      :is-open="isJsonModalOpen"
      :initial-tab="jsonModalTab"
      @close="isJsonModalOpen = false"
      @load-json="handleQuotationJsonLoaded"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

// -- 1. CONSTANTS & CHARACTER LIMITS --
const CANVAS_W = 1654
const CANVAS_H = 2339
const MAX_COURSES = 6
const MAX_ITEMS_PER_COURSE = 12
const MAX_TOTAL_ITEMS = 22

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
  footerNote: 64
}

// -- 2. STATE & CASE FORMATTERS --
const mobileTab = ref('editor')
const previewZoom = ref('scroll')
const shareFormat = ref('pdf')
const isExporting = ref(false)
const a4CanvasRef = ref(null)
const priceInputRef = ref(null)
const currentScaleFactor = ref(1)

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
  venueProgram: 'CAPS BANQUET HALL - BIRTHDAY FUNCTION',
  priceDetails: '₹300/- PAX + ₹1000/HOUR AC & ELECTRICAL CHARGES',
  serviceHeading: 'BUFFET SERVICE MENU',
  footerNote: 'Contact Us : 9633817064',
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

const toUpperClean = (val, max) => String(val || '').toUpperCase().slice(0, max)

const toCapitalizeClean = (val, max) => {
  const sliced = String(val || '').slice(0, max)
  return sliced.replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

const onUpperInput = (key, e) => {
  const formatted = toUpperClean(e.target.value, LIMITS[key])
  form[key] = formatted
  e.target.value = formatted
}

const onCourseUpperInput = (course, key, e) => {
  const max = key === 'title' ? LIMITS.courseTitle : LIMITS.courseTiming
  const formatted = toUpperClean(e.target.value, max)
  course[key] = formatted
  e.target.value = formatted
}

const onCapitalizeInput = (target, key, e) => {
  const formatted = toCapitalizeClean(e.target.value, LIMITS[key])
  target[key] = formatted
  e.target.value = formatted
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

const scaleBadgeText = computed(() =>
  currentScaleFactor.value >= 0.96 ? 'A4 Fit: Optimal' : `Auto-Scale: ${Math.round(currentScaleFactor.value * 100)}%`
)

const addCourse = () => {
  if (form.courses.length >= MAX_COURSES) return
  form.courses.push({
    id: makeId(),
    title: 'STARTERS',
    timing: '',
    items: [{ id: makeId(), name: '', note: '' }]
  })
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

const resetToSample = () => {
  Object.assign(form, createSampleState())
}

const isJsonModalOpen = ref(false)
const jsonModalTab = ref('import')

const openJsonModal = (tab = 'import') => {
  jsonModalTab.value = tab
  isJsonModalOpen.value = true
}

const handleQuotationJsonLoaded = ({ data, mode }) => {
  if (mode === 'full') {
    if (data.refNo) form.refNo = toUpperClean(data.refNo, LIMITS.refNo)
    if (data.quoteDate) form.quoteDate = toUpperClean(data.quoteDate, LIMITS.quoteDate)
    if (data.clientName !== undefined) form.clientName = toUpperClean(data.clientName, LIMITS.clientName)
    if (data.clientPhone !== undefined) form.clientPhone = toUpperClean(data.clientPhone, LIMITS.clientPhone)
    if (data.guaranteedPax !== undefined) form.guaranteedPax = toUpperClean(data.guaranteedPax, LIMITS.guaranteedPax)
    if (data.dateTime !== undefined) form.dateTime = toUpperClean(data.dateTime, LIMITS.dateTime)
    if (data.venueProgram !== undefined) form.venueProgram = toUpperClean(data.venueProgram, LIMITS.venueProgram)
    if (data.priceDetails !== undefined) form.priceDetails = toUpperClean(data.priceDetails, LIMITS.priceDetails)
    if (data.serviceHeading) form.serviceHeading = toUpperClean(data.serviceHeading, LIMITS.serviceHeading)
    if (data.footerNote !== undefined) form.footerNote = toCapitalizeClean(data.footerNote, LIMITS.footerNote)
  }

  if (Array.isArray(data.courses) && data.courses.length > 0) {
    let budget = MAX_TOTAL_ITEMS
    const cleanCourses = []

    for (const rawCourse of data.courses.slice(0, MAX_COURSES)) {
      if (budget <= 0) break
      const rawItems = Array.isArray(rawCourse.items) ? rawCourse.items : []
      const allowedCount = Math.min(rawItems.length, MAX_ITEMS_PER_COURSE, budget)
      const mappedItems = rawItems.slice(0, allowedCount).map((it) => ({
        id: makeId(),
        name: toCapitalizeClean(typeof it === 'string' ? it : it?.name, LIMITS.itemName),
        note: toCapitalizeClean(typeof it === 'object' ? it?.note : '', LIMITS.itemNote)
      }))

      budget -= mappedItems.length
      cleanCourses.push({
        id: makeId(),
        title: toUpperClean(rawCourse.title || 'COURSE', LIMITS.courseTitle),
        timing: toUpperClean(rawCourse.timing || '', LIMITS.courseTiming),
        items: mappedItems.length ? mappedItems : [{ id: makeId(), name: '', note: '' }]
      })
    }

    if (cleanCourses.length > 0) {
      form.courses = cleanCourses
    }
  }
}   

// -- 3. CANVAS VECTOR ICONS & TYPOGRAPHY HELPERS --
let logoImage = null
let illustrationImage = null
let rafId = null

const measureTrackedWidth = (ctx, text, trackingPx = 0) => {
  const chars = Array.from(String(text || ''))
  if (!chars.length) return 0
  return chars.reduce((sum, ch) => sum + ctx.measureText(ch).width, 0) + trackingPx * (chars.length - 1)
}

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
const renderQuotationCanvas = () => {
  const canvas = a4CanvasRef.value
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
  const qTitleWidth = drawTrackedText(ctx, 'QUOTATION', marginX + 10, 436, 4.5, 'left')

    // Signature Angled Amber Slash "/"
//   const slashBaseX = marginX + 10 + qTitleWidth + 28
//   ctx.strokeStyle = '#EA8C1E'
//   ctx.lineWidth = 4.6
//   ctx.lineCap = 'round'
//   ctx.beginPath()
//   ctx.moveTo(slashBaseX, 454)
//   ctx.lineTo(slashBaseX + 34, 374)
//   ctx.stroke()

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
  ctx.fillText(form.refNo.trim() || '—', refBarX + 174, 405)
  ctx.fillText(form.quoteDate.trim() || formatTodayDate(), refBarX + 174, 448)

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
    const raw = form.guaranteedPax.trim()
    if (!raw) return ''
    return raw.includes('PAX') ? raw : `PAX : ${raw}`
  })()

  const orderRowVal = [form.clientName.trim(), form.clientPhone.trim(), paxFormatted].filter(Boolean).join('   •   ') || '—'

  ctx.font = '600 22.5px "Inter", sans-serif'
  const summaryRows = [
    { icon: 'user', label: 'ORDER TO', lines: wrapTextLines(ctx, orderRowVal, valMaxW).slice(0, 2) },
    { icon: 'calendar', label: 'DATE & TIME', lines: wrapTextLines(ctx, form.dateTime.trim() || '—', valMaxW).slice(0, 2) },
    { icon: 'pin', label: 'VENUE & PROGRAM', lines: wrapTextLines(ctx, form.venueProgram.trim() || '—', valMaxW).slice(0, 2) },
    { icon: 'rupee', label: 'PRICE DETAILS', lines: wrapTextLines(ctx, form.priceDetails.trim() || '—', valMaxW).slice(0, 2) }
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

  // -- SECTION D: SPACIOUS EDITORIAL BANQUET MENU --
  const FOOTER_TOP_Y = 1924
  const menuStartY = cardY + totalCardH + 54
  const menuMaxBottomY = FOOTER_TOP_Y - 40
  const availableMenuH = menuMaxBottomY - menuStartY

  const activeCourses = form.courses
    .map((c) => ({
      title: c.title.trim(),
      timing: c.timing.trim(),
      items: c.items.filter((it) => it.name.trim())
    }))
    .filter((c) => c.title || c.items.length)

  const measureMenuHeight = (scale) => {
    let h = form.serviceHeading.trim() ? 72 * scale : 0
    activeCourses.forEach((c) => {
      h += 54 * scale
      c.items.forEach((it) => {
        h += 42 * scale
        if (it.note.trim()) h += 29 * scale
      })
      h += 22 * scale
    })
    if (form.footerNote.trim()) h += 52 * scale
    return h
  }

  const rawMenuH = measureMenuHeight(1)
  const scale = rawMenuH > availableMenuH ? Math.max(0.68, availableMenuH / rawMenuH) : 1
  currentScaleFactor.value = scale

  let curY = menuStartY
  const menuX = marginX + 12

  // Service Menu Title Banner
  if (form.serviceHeading.trim()) {
    const headingSize = Math.round(31 * scale)
    ctx.font = `700 ${headingSize}px "Faculty Glyphic", serif`
    ctx.fillStyle = '#0F172A'
    ctx.textBaseline = 'alphabetic'
    const hWidth = drawTrackedText(ctx, form.serviceHeading.trim(), menuX, curY + headingSize, 2.5, 'left')

    // Dual-tier underline (Amber highlight + subtle full-width rule)
    const lineY = curY + headingSize + 12
    ctx.strokeStyle = '#F1F5F9'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(menuX, lineY)
    ctx.lineTo(rightEdge - 12, lineY)
    ctx.stroke()

    ctx.fillStyle = '#EA8C1E'
    ctx.fillRect(menuX, lineY - 1.5, Math.min(hWidth + 24, 580), 3.8)
    curY += Math.round(72 * scale)
  }

  // Courses & Dishes
  activeCourses.forEach((course) => {
    const courseFontSize = Math.round(25 * scale)
    if (course.title) {
      ctx.font = `600 ${courseFontSize}px "Faculty Glyphic", serif`
      ctx.fillStyle = '#0F172A'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(course.title, menuX, curY + courseFontSize)
      const cWidth = ctx.measureText(course.title).width

      // Warm Amber Timing Pill Badge (e.g., @ 10:45 AM)
      if (course.timing) {
        const pillFont = Math.round(17 * scale)
        ctx.font = `700 ${pillFont}px "Inter", sans-serif`
        const tWidth = ctx.measureText(course.timing).width
        const pillX = menuX + cWidth + 18
        const pillH = Math.round(28 * scale)
        const pillY = curY + courseFontSize - pillH + 5

        ctx.fillStyle = '#FFF7ED'
        ctx.strokeStyle = '#FDBA74'
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.roundRect(pillX, pillY, tWidth + 24, pillH, pillH / 2)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#C2410C'
        ctx.textBaseline = 'middle'
        ctx.fillText(course.timing, pillX + 12, pillY + pillH / 2 + 1)
        ctx.textBaseline = 'alphabetic'
      }

      ctx.fillStyle = '#F59E0B'
      ctx.fillRect(menuX, curY + courseFontSize + 8, cWidth, 2.5)
      curY += Math.round(52 * scale)
    }

    course.items.forEach((item) => {
      const itemFontSize = Math.round(23.5 * scale)
      const maxItemW = rightEdge - menuX - 80

      // Amber Star Marker
      ctx.font = `700 ${Math.round(19.5 * scale)}px "Inter", sans-serif`
      ctx.fillStyle = '#EA8C1E'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText('★', menuX + 16, curY + itemFontSize - 1)

      // Capitalized Dish Name
      ctx.font = `600 ${itemFontSize}px "Inter", sans-serif`
      ctx.fillStyle = '#1E293B'
      const dishLines = wrapTextLines(ctx, item.name.trim(), maxItemW)
      dishLines.forEach((line, lIdx) => {
        ctx.fillText(line, menuX + 50, curY + itemFontSize + lIdx * Math.round(30 * scale))
      })
      curY += Math.round(40 * scale) + (dishLines.length - 1) * Math.round(30 * scale)

      // Optional Accompaniment Sub-note
      if (item.note.trim()) {
        const noteSize = Math.round(19 * scale)
        ctx.font = `500 ${noteSize}px "Inter", sans-serif`
        ctx.fillStyle = '#64748B'
        ctx.fillText(item.note.trim(), menuX + 50, curY + noteSize - 4)
        curY += Math.round(28 * scale)
      }
    })

    curY += Math.round(20 * scale)
  })

  // Optional Footer Note Callout
  if (form.footerNote.trim()) {
    const noteY = Math.min(curY + 12, menuMaxBottomY - 36)
    const noteFontSize = Math.round(21 * scale)
    ctx.fillStyle = '#EA8C1E'
    ctx.fillRect(menuX, noteY, 4.5, Math.round(28 * scale))
    ctx.font = `600 ${noteFontSize}px "Inter", sans-serif`
    ctx.fillStyle = '#0F172A'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(form.footerNote.trim(), menuX + 18, noteY + noteFontSize + 1)
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

const scheduleRender = () => {
  if (typeof window === 'undefined') return
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    renderQuotationCanvas()
    rafId = null
  })
}

watch(form, () => scheduleRender(), { deep: true })

// -- 5. CONTINUOUS TIMESTAMP FILENAME & ZERO-DEPENDENCY EXPORTS --
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

const buildSlugFilename = (ext) => {
  const cleanClient = (form.clientName || 'Guest')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `CAPS-Quotation-${cleanClient || 'banquet'}-${getContinuousTimestamp()}.${ext}`
}

const canvasToJpegBlob = () =>
  new Promise((resolve, reject) => {
    renderQuotationCanvas()
    a4CanvasRef.value.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      'image/jpeg',
      0.94
    )
  })

const buildA4PdfBlobFromJpeg = async (jpegBlob) => {
  const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer())
  const enc = new TextEncoder()

  const header = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xff, 0xff, 0xff, 0xff, 0x0a])
  const obj1 = enc.encode('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
  const obj2 = enc.encode('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
  const obj3 = enc.encode('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n')
  const obj4Head = enc.encode(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${CANVAS_W} /Height ${CANVAS_H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.byteLength} >>\nstream\n`)
  const obj4Tail = enc.encode('\nendstream\nendobj\n')
  const streamCmd = 'q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ'
  const obj5 = enc.encode(`5 0 obj\n<< /Length ${streamCmd.length} >>\nstream\n${streamCmd}\nendstream\nendobj\n`)

  const off1 = header.byteLength
  const off2 = off1 + obj1.byteLength
  const off3 = off2 + obj2.byteLength
  const off4 = off3 + obj3.byteLength
  const off5 = off4 + obj4Head.byteLength + jpegBytes.byteLength + obj4Tail.byteLength
  const xrefOff = off5 + obj5.byteLength

  const pad10 = (n) => String(n).padStart(10, '0')
  const xrefAndTrailer = enc.encode(
    'xref\n0 6\n' +
    '0000000000 65535 f \n' +
    `${pad10(off1)} 00000 n \n` +
    `${pad10(off2)} 00000 n \n` +
    `${pad10(off3)} 00000 n \n` +
    `${pad10(off4)} 00000 n \n` +
    `${pad10(off5)} 00000 n \n` +
    `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOff}\n%%EOF`
  )

  const chunks = [header, obj1, obj2, obj3, obj4Head, jpegBytes, obj4Tail, obj5, xrefAndTrailer]
  const totalLen = chunks.reduce((sum, c) => sum + c.byteLength, 0)
  const pdfBuffer = new Uint8Array(totalLen)
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
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

const downloadJpg = async () => {
  isExporting.value = true
  try {
    const blob = await canvasToJpegBlob()
    triggerBlobDownload(blob, buildSlugFilename('jpg'))
  } finally {
    isExporting.value = false
  }
}

const downloadPdf = async () => {
  isExporting.value = true
  try {
    const jpgBlob = await canvasToJpegBlob()
    const pdfBlob = await buildA4PdfBlobFromJpeg(jpgBlob)
    triggerBlobDownload(pdfBlob, buildSlugFilename('pdf'))
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

  form.courses.forEach((c) => {
    const validItems = c.items.filter((i) => i.name.trim())
    if (!c.title.trim() && !validItems.length) return
    lines.push(`\n*${c.title.trim()}${c.timing.trim() ? ' ' + c.timing.trim() : ''}*`)
    validItems.forEach((it) => {
      lines.push(`• ${it.name.trim()}${it.note.trim() ? ' (' + it.note.trim() + ')' : ''}`)
    })
  })

  if (form.footerNote.trim()) lines.push(`\n_${form.footerNote.trim()}_`)
  lines.push('\nwww.capsfamily.in | Events: 8848369567')
  return lines.join('\n')
}

const shareNativeFile = async () => {
  isExporting.value = true
  try {
    const isPdf = shareFormat.value === 'pdf'
    const jpgBlob = await canvasToJpegBlob()
    const finalBlob = isPdf ? await buildA4PdfBlobFromJpeg(jpgBlob) : jpgBlob
    const filename = buildSlugFilename(isPdf ? 'pdf' : 'jpg')
    const file = new File([finalBlob], filename, { type: finalBlob.type })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `Hotel CAPS Quotation - ${form.clientName || 'Guest'}`,
        text: 'Official event quotation from Hotel CAPS, Koduvayur.'
      })
    } else {
      triggerBlobDownload(finalBlob, filename)
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
    const scratch = document.createElement('canvas')
    scratch.width = 10
    scratch.height = 10
    const sCtx = scratch.getContext('2d')
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