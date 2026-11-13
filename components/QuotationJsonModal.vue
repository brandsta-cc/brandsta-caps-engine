<!-- components/QuotationJsonModal.vue -->
<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      @click.self="$emit('close')"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm pt-25.5 md:pt-27 pb-3 sm:pb-5 px-3 sm:px-4"
    >
      <div class="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-2xl max-h-[calc(100dvh-118px)] md:max-h-[calc(100dvh-136px)] flex flex-col shadow-2xl overflow-hidden">
        
        <!-- Modal Header & Tabs -->
        <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div class="inline-flex bg-[#030712] p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              @click="activeTab = 'import'"
              :class="activeTab === 'import' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white font-semibold'"
              class="px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Import JSON
            </button>
            <button
              type="button"
              @click="activeTab = 'guide'"
              :class="activeTab === 'guide' ? 'bg-[#0068fe] text-white font-extrabold' : 'text-slate-400 hover:text-white font-semibold'"
              class="px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              AI Prompt Guide
            </button>
          </div>

          <button
            type="button"
            @click="$emit('close')"
            aria-label="Close Modal"
            class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- TAB 1: IMPORT JSON -->
        <div v-if="activeTab === 'import'" class="min-h-0 flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="quotation-json-textarea" class="text-xs font-bold uppercase tracking-wider text-slate-300">
                Paste AI-Generated Quotation JSON
              </label>
              <button
                v-if="rawJson"
                type="button"
                @click="rawJson = ''; parseError = ''"
                class="text-[11px] font-semibold text-slate-400 hover:text-red-400 cursor-pointer"
              >
                Clear
              </button>
            </div>
            <textarea
              id="quotation-json-textarea"
              name="quotationJsonPayload"
              v-model="rawJson"
              rows="9"
              placeholder='{"clientName": "MR. JOFFIN", "guaranteedPax": "PAX : 60", "courses": [...]}'
              class="w-full bg-[#030712] border border-slate-800 focus:border-amber-500 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none transition-colors resize-y"
            ></textarea>
          </div>

          <div v-if="parseError" class="bg-red-500/10 border border-red-500/40 text-red-300 text-xs rounded-xl p-3">
            {{ parseError }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              @click="submitJson('courses')"
              class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Load Menu Courses Only
            </button>
            <button
              type="button"
              @click="submitJson('full')"
              class="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/15 transition-all cursor-pointer"
            >
              Load Full Quotation
            </button>
          </div>
        </div>

        <!-- TAB 2: AI PROMPT GUIDE -->
        <div v-else class="min-h-0 flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          <div class="flex flex-wrap items-center justify-between gap-3 bg-[#030712] border border-slate-800 rounded-xl p-4">
            <div>
              <h3 class="text-sm font-bold text-white">One-Click AI Extraction Prompt</h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Copy this prompt into ChatGPT or Gemini, then paste any client WhatsApp message or banquet note below it.
              </p>
            </div>
            <button
              type="button"
              @click="copyPrompt"
              :class="copied ? 'bg-emerald-600 text-white' : 'bg-[#0068fe] hover:bg-blue-600 text-white'"
              class="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-lg"
            >
              <svg v-if="copied" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ copied ? 'Copied Prompt!' : 'Copy AI Prompt' }}</span>
            </button>
          </div>

          <pre class="bg-[#030712] border border-slate-800 rounded-xl p-4 text-[11px] sm:text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">{{ aiPromptText }}</pre>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  initialTab: { type: String, default: 'import' },
  isDirty: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'load-json'])

const activeTab = ref(props.initialTab)
const rawJson = ref('')
const parseError = ref('')
const copied = ref(false)

watch(() => props.isOpen, (open) => {
  if (open) {
    activeTab.value = props.initialTab
    parseError.value = ''
  }
})

watch(() => props.initialTab, (tab) => {
  activeTab.value = tab
})

const aiPromptText = `You are a precision quotation data extractor for Hotel CAPS (Koduvayur, Palakkad). Convert the client's banquet, catering, or event inquiry below into a strict JSON contract for the Hotel CAPS A4 Quotation Studio.

### 1. COMMERCIAL DATA INTEGRITY & ZERO-HALLUCINATION RULES (CRITICAL)
- Preserve Exact Client Facts: NEVER invent, omit, rename, duplicate, or silently alter any supplied dish, accompaniment, price, pax count, venue, date, or condition.
- Zero Assumed Policies: NEVER invent or assume GST/tax rates, advance-payment percentages, cancellation rules, AC/hall hour charges, or phone numbers inside "priceDetails" or "footerNotes". Include them ONLY if explicitly stated in the inquiry; otherwise leave them as "".
- Overflow & Truncation Disclosure: The studio schema supports up to 12 courses, 28 items per course, and 80 total dishes. If the inquiry exceeds 80 dishes or any text must be abbreviated to fit a character limit, NEVER drop items silently—flag the exact omitted/shortened details clearly below the JSON block.
- Strict Date & Reference Separation:
  - "refNo": Leave as "" unless a reference number is explicitly provided (the app generates its own).
  - "quoteDate": Quotation issue date ONLY (DD/MM/YYYY). Leave as "" unless explicitly provided—NEVER put the event date here.
  - "dateTime": The actual event date and time range.

### 2. DIVISION OF RESPONSIBILITIES & COURSE GROUPING
- Quotation Studio (Renderer) owns all pixel measurement, 1-vs-2 column switching, automatic course/dish numbering, and multi-page A4 rendering.
- Your Role (Extractor) is to structure courses cleanly so the renderer can pack pages optimally:
  - Courses with <= 15 items stay together as unbreakable column blocks.
  - Courses with 16–28 items wrap across Column 1 and Column 2 on the same page (repeating the course header automatically).
  - Dense-Course Fallback: If a single category has > 28 dishes—OR has 18+ dishes where most items include long names and accompaniments—divide it into logical culinary sub-courses (e.g., "STARTERS - VEG" & "STARTERS - NON-VEG", or "MAIN COURSE" & "BREADS & RICE") without changing or dropping any dish.
  - NEVER include numbers (1., 2.) or bullets (•, -, *) inside "title" or "name".
  - Move side accompaniments (e.g., "Raitha, Pickle", "Mint Chutney, Salad") into the dish's "note" field rather than "name".

### 3. STRICT JSON VALIDATION & SCHEMA
- Output valid JSON inside a single \`\`\`json code block using double-quoted strings, exact keys/types below, no extra properties, and no trailing commas.
- The strings shown in the schema below are field instructions—NEVER output those descriptions, "N/A", "TBD", or placeholders as literal values. Use "" for any unknown string.

{
  "refNo": "Explicit ref number <= 24 chars, or \"\"",
  "quoteDate": "Explicit quotation issue date DD/MM/YYYY <= 16 chars, or \"\"",
  "clientName": "UPPERCASE client or company name <= 32 chars, or \"\"",
  "clientPhone": "Digits only <= 15 chars, or \"\"",
  "guaranteedPax": "Format like 'PAX : 60' <= 14 chars, or \"\"",
  "dateTime": "Event date & time range <= 42 chars (e.g. '09/10/2026 • 11:00 AM TO 02:00 PM'), or \"\"",
  "venueProgram": "UPPERCASE venue & occasion <= 52 chars, or \"\"",
  "priceDetails": "Explicitly stated rates with ₹ symbol <= 78 chars, or \"\"",
  "serviceHeading": "UPPERCASE menu heading <= 34 chars (e.g. 'BUFFET SERVICE MENU'), or \"\"",
  "footerNotes": [
    "Explicitly stated policy/note line 1 in Title Case <= 85 chars, or \"\"",
    "Explicitly stated policy/note line 2 in Title Case <= 85 chars, or \"\"",
    "Explicitly stated policy/note line 3 in Title Case <= 85 chars, or \"\""
  ],
  "courses": [
    {
      "title": "UPPERCASE Course Name <= 26 chars (no numbers)",
      "timing": "UPPERCASE timing <= 16 chars (e.g. '@ 10:45 AM'), or \"\"",
      "items": [
        {
          "name": "Dish Name in Title Case <= 42 chars (no numbers/bullets)",
          "note": "Accompaniments in Title Case <= 44 chars (e.g. 'Raitha, Pickle'), or \"\""
        }
      ]
    }
  ]
}

### 4. RESPONSE WORKFLOW
1. Output the ready-to-import \`\`\`json code block first.
2. Right below the code block:
   - Flag any dish count (> 80) or character-limit truncations if any occurred.
   - Briefly ask if I want to add any optional **Footer Notes** (suggesting relevant options like GST terms, advance payment confirmation, extra pax/hour rates, or contact numbers) or fill in any missing event fields, and offer an updated JSON block if needed.

Client Inquiry Details:
[PASTE DETAILS HERE]`

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(aiPromptText)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {}
}

const submitJson = (mode) => {
  parseError.value = ''
  let cleaned = rawJson.value.trim()
  const fencedMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fencedMatch) {
    cleaned = fencedMatch[1].trim()
  } else if (!cleaned.startsWith('[')) {
    const firstBrace = cleaned.indexOf('{')
    const lastBrace = cleaned.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1)
    }
  }

  if (!cleaned) {
    parseError.value = 'Please paste JSON data before loading.'
    return
  }

  try {
    const parsed = JSON.parse(cleaned)
    const normalized = Array.isArray(parsed) ? { courses: parsed } : parsed
    if (!normalized || typeof normalized !== 'object') {
      throw new Error('Root JSON must be an object.')
    }
    if (props.isDirty && !confirm('You have unsaved edits on this quotation. Replace with imported JSON?')) {
      return
    }
    emit('load-json', { data: normalized, mode })
    emit('load-json', { data: normalized, mode })
    rawJson.value = ''
    emit('close')
  } catch (err) {
    parseError.value = `Invalid JSON format: ${err.message}`
  }
}
</script>