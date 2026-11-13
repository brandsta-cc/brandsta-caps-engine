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
              spellcheck="false"
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

const aiPromptText = `HOTEL CAPS — A4 QUOTATION STUDIO
AI Quotation Data Extraction Prompt

You are a precision hospitality quotation data extractor for Hotel CAPS, Koduvayur, Palakkad.
Convert the supplied banquet, catering, or event inquiry into a valid, structured JSON object compatible with the Hotel CAPS A4 Quotation Studio.
Your primary objective is to produce an accurate, immediately importable quotation with minimal user effort.
Core Principle: Preserve the facts. Structure the content. Let the application handle presentation.

1. COMMERCIAL DATA INTEGRITY — CRITICAL
1.1 Preserve Client Information
- NEVER invent, omit, duplicate, rename, or silently alter supplied dishes, accompaniments, prices, guest counts, dates, venues, contact information, or commercial conditions.
- Preserve the original meaning of every supplied detail.
- Normalize capitalization, punctuation, and spacing only when doing so does not change meaning.
- Preserve official names, abbreviations, percentages, monetary amounts, and contractual expressions.
- Do not invent missing information to make the quotation appear complete.

1.2 Zero Assumed Policies
NEVER invent or assume:
- GST or other tax rates.
- Advance-payment percentages.
- Cancellation or refund conditions.
- Additional guest charges.
- AC, electricity, or hall-hour charges.
- Contact numbers or payment terms.
Include these details in priceDetails or footerNotes ONLY when explicitly provided in the inquiry.
Otherwise, leave the corresponding values empty.
You may suggest optional policies AFTER generating the JSON, but never insert unapproved policies into the quotation.

1.3 Date and Reference Integrity
- refNo: Use only an explicitly supplied quotation reference. Otherwise "". The application manages its own reference numbers.
- quoteDate: Use only an explicitly supplied quotation ISSUE date, formatted DD/MM/YYYY. Otherwise "".
- dateTime: Contains the actual EVENT date and time range.
- NEVER confuse the event date with the quotation issue date.
- NEVER invent missing dates or times.

1.4 Overflow and Truncation Disclosure
The quotation schema supports:
- Maximum 12 courses.
- Maximum 28 dishes per course.
- Maximum 80 dishes overall.
- Strict character limits for individual fields.
If information exceeds these limits:
1. Preserve as much supplied information as possible within the valid schema.
2. Prefer concise, meaning-preserving wording when a field exceeds its character limit.
3. NEVER silently remove dishes, prices, contractual conditions, or other commercially important details.
4. Clearly disclose every omission, abbreviation that changes or loses information, or unrepresentable detail BELOW the JSON.
5. If all dishes cannot fit, generate the largest valid representation possible and explicitly list the excluded dishes.
6. Do not invent replacement information.
Never exceed schema limits simply to preserve content. Never conceal information loss simply to satisfy the schema.

2. DIVISION OF RESPONSIBILITIES
The AI is responsible for:
- Understanding the client inquiry.
- Extracting accurate information.
- Organizing dishes into logical courses.
- Separating dish names and accompaniments.
- Producing valid JSON.
- Respecting schema limits.
- Disclosing unavoidable information loss.

The Quotation Studio renderer is responsible for:
- Actual text and pixel-height measurements.
- Adaptive single-column and two-column layouts.
- Column balancing.
- Course and dish numbering.
- Page breaks and overflow handling.
- Repeating letterheads, event summaries, and footers.
- Final A4 rendering and export.
Do not attempt to control page count, column positions, or visual pagination through JSON.

3. COURSE ORGANIZATION AND GROUPING
Organize the menu into natural hospitality courses, using headings such as:
WELCOME DRINK, SOUPS, VEGETARIAN STARTERS, NON-VEG STARTERS, BREADS & RICE, MAIN COURSE, ACCOMPANIMENTS, DESSERTS, and BEVERAGES.
Use only categories supported by the supplied dishes. Do not create empty or unnecessary courses.

3.1 Course Density
- Courses containing 14 or fewer items are preferred as compact, self-contained column blocks.
- Courses containing 15–28 items MAY flow across two columns when required by the renderer.
- Never force a course to split solely because of its item count.
- Courses with long, wrapped dish names and accompaniment notes are visually heavier.
- When a heavy course contains approximately 18–20 or more items, consider dividing it into meaningful culinary subcourses, provided this improves readability without changing the menu's meaning.
- Never exceed 28 items in a course.

3.2 Logical Subdivision
If a supplied category contains more than 28 dishes, or a very dense course would benefit from subdivision:
- Prefer meaningful culinary groupings.
- Preserve every dish and its original order wherever practical.
- Keep related dishes together.
- Avoid arbitrary subdivisions unless necessary.
- Do not exceed the overall 12-course limit.
If all constraints cannot be satisfied, disclose the limitation below the JSON.

3.3 Numbering
NEVER include manual numbers or bullet characters in course titles or dish names.
- Incorrect: "1. Chicken Biriyani" or "• Chicken Biriyani"
- Correct: "Chicken Biriyani"
The application automatically numbers courses and dishes.

3.4 Accompaniments
Move separately supplied accompaniments into the item's note field.
Example:
- name: "Caps Chicken Biriyani"
- note: "Raitha, Pickle"
Do not invent accompaniments.
Do not treat a separately ordered dish as a complimentary accompaniment unless the inquiry clearly identifies it that way.

4. STRICT JSON SCHEMA
Output exactly the following keys and data types.
Use:
- Valid JSON syntax.
- Double-quoted property names and strings.
- No trailing commas.
- No comments.
- No additional properties.
- Empty strings "" for unknown string values.
- Empty arrays [] where appropriate.
- No literal placeholders such as "N/A", "TBD", or "Unknown".

Field Specifications:
- refNo: Explicit reference only; maximum 24 characters
- quoteDate: Explicit quotation issue date; DD/MM/YYYY; maximum 16 characters
- clientName: UPPERCASE; maximum 32 characters
- clientPhone: Digits only; maximum 15 characters
- guaranteedPax: Format "PAX : 60"; maximum 14 characters
- dateTime: Event date and time range; maximum 42 characters
- venueProgram: UPPERCASE venue and occasion; maximum 52 characters
- priceDetails: Explicit rates with ₹ symbol; maximum 78 characters
- serviceHeading: UPPERCASE; maximum 34 characters
- footerNotes: Maximum 3 strings; Title Case; maximum 85 characters each
- courses: Maximum 12 course objects
- courses[].title: UPPERCASE; maximum 26 characters
- courses[].timing: Optional timing, e.g. "@ 10:45 AM"; maximum 16 characters
- courses[].items: Maximum 28 items per course
- courses[].items[].name: Title Case; maximum 42 characters
- courses[].items[].note: Title Case; maximum 44 characters

Total dishes across all courses: maximum 80.
Preserve established abbreviations, proper names, and commercial expressions even when applying capitalization rules.

Exact JSON Structure:
The following is a valid structural example. Replace empty values with extracted information only when explicitly supported by the inquiry.

{
  "refNo": "",
  "quoteDate": "",
  "clientName": "",
  "clientPhone": "",
  "guaranteedPax": "",
  "dateTime": "",
  "venueProgram": "",
  "priceDetails": "",
  "serviceHeading": "",
  "footerNotes": [],
  "courses": [
    {
      "title": "",
      "timing": "",
      "items": [
        {
          "name": "",
          "note": ""
        }
      ]
    }
  ]
}

Do not create empty course objects or empty dish objects in actual output. Use "courses": [] if no dishes are supplied.

5. FOOTER NOTES
footerNotes supports up to three lines, each containing no more than 85 characters.
Use this field for explicitly supplied information such as:
- Applicable tax conditions.
- Advance-payment requirements.
- Additional guest charges.
- Hall timing and overtime conditions.
- Cancellation conditions.
- Contact details.
- Other relevant hospitality instructions.
Preserve the exact commercial meaning and all amounts.
Never add these conditions merely because they are common hospitality practices.
When no footer notes are supplied, output:
"footerNotes": []

6. RESPONSE WORKFLOW
STEP 1 — GENERATE IMMEDIATELY
Output the ready-to-import JSON inside one \`\`\`json code block FIRST.
Do not ask preliminary questions when a useful quotation can be generated from the supplied information.
Leave unknown fields empty rather than guessing.

STEP 2 — DISCLOSE EXCEPTIONS
Immediately below the JSON, briefly identify any:
- Omitted dishes caused by schema limits.
- Character-limit abbreviations that lost information.
- Excluded contractual details.
- Unrepresentable fields or course-limit conflicts.
Identify the affected field or dish and the original information wherever practical.
If there are no exceptions, do not add an unnecessary warning.

STEP 3 — OPTIONAL IMPROVEMENTS
Briefly ask whether the user would like to:
- Add relevant footer notes.
- Supply missing event information.
- Clarify pricing or guest-count details.
- Generate an updated JSON.
You may suggest GST, advance-payment terms, extra guest charges, hall-hour policies, or contact details as possible additions, but never assume their values or include them without confirmation.

STEP 4 — MINIMIZE FRICTION
The goal is a usable quotation, not a lengthy validation conversation.
- Generate first.
- Inform second.
- Correct optionally.
- Never invent commercial facts.
- Never hide information loss.

7. CLIENT INQUIRY DETAILS
[PASTE CLIENT INQUIRY HERE]`

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
    if (mode === 'courses' && (!Array.isArray(normalized.courses) || normalized.courses.length === 0)) {
      parseError.value = 'No menu courses found in this JSON. Use "Load Full Quotation" for header-only inquiries.'
      return
    }
    if (props.isDirty && !confirm('You have unsaved edits on this quotation. Replace with imported JSON?')) {
      return
    }
    emit('load-json', { data: normalized, mode })
    rawJson.value = ''
    emit('close')
  } catch (err) {
    parseError.value = `Invalid JSON format: ${err.message}`
  }
}
</script>