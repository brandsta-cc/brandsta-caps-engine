<!-- components/JsonImportModal.vue -->
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      @click.self="$emit('close')"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <!-- Header & Tabs -->
        <div class="bg-[#030712] border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="activeTab = 'import'"
              class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              :class="activeTab === 'import' ? 'bg-[#0068fe] text-white' : 'text-slate-400 hover:text-white'"
            >
              Paste / Load JSON
            </button>
            <button
              type="button"
              @click="activeTab = 'guide'"
              class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              :class="activeTab === 'guide' ? 'bg-[#0068fe] text-white' : 'text-slate-400 hover:text-white'"
            >
              <span class="font-serif italic">i</span>
              <span>AI Prompt & Schema</span>
            </button>
          </div>

          <button
            type="button"
            @click="$emit('close')"
            class="w-8 h-8 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- TAB 1: PASTE & VALIDATE JSON -->
        <div v-if="activeTab === 'import'" class="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-xs sm:text-sm text-slate-400">
              Paste your structured JSON array below. It will be validated before loading.
            </p>
            <button
              type="button"
              @click="pasteFromClipboard"
              class="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-[#0068fe] border border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              📋 Paste from Clipboard
            </button>
          </div>

          <!-- Error Banner + Try Again -->
          <div
            v-if="validationErrors.length"
            class="bg-red-500/10 border border-red-500/40 rounded-xl p-3.5 text-red-300 text-xs sm:text-sm space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-red-400">Validation Failed — Existing items were not changed:</span>
              <button
                type="button"
                @click="resetErrors"
                class="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold text-xs cursor-pointer"
              >
                Try Again
              </button>
            </div>
            <ul class="list-disc list-inside space-y-1 text-xs">
              <li v-for="(err, i) in validationErrors" :key="i">{{ err }}</li>
            </ul>
          </div>

          <textarea
            v-model="rawJson"
            rows="9"
            :placeholder="jsonPlaceholder"
            class="w-full bg-[#030712] border border-slate-800 rounded-xl p-3.5 font-mono text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-[#0068fe] custom-scrollbar"
          ></textarea>

          <!-- Mode Selector: Replace vs Append -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div class="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" value="replace" v-model="loadMode" class="accent-[#0068fe]" />
                <span>Replace current list</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" value="append" v-model="loadMode" class="accent-[#0068fe]" />
                <span>Append to list</span>
              </label>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="rawJson = ''; validationErrors = []"
                class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                @click="validateAndLoad"
                class="px-5 py-2.5 rounded-xl bg-[#0068fe] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
              >
                Validate & Load →
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 2: AI PROMPT TEMPLATE & SCHEMA GUIDE -->
        <div v-else class="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          <div class="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-bold text-amber-400 uppercase tracking-wider text-xs">
                1. Ready-Made AI Prompt (Copy & Paste into ChatGPT / Gemini)
              </h3>
              <button
                type="button"
                @click="copyAiPrompt"
                class="px-3 py-1.5 rounded-lg bg-[#0068fe] hover:bg-blue-600 text-white font-bold text-xs cursor-pointer shrink-0"
              >
                {{ copiedPrompt ? '✓ Copied!' : 'Copy AI Prompt' }}
              </button>
            </div>
            <pre class="text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed bg-[#030712] p-3 rounded-lg border border-slate-800/80">{{ aiPromptTemplate }}</pre>
          </div>

          <div class="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 class="font-bold text-[#0068fe] uppercase tracking-wider text-xs">
              2. Strict Schema Rules
            </h3>
            <ul class="space-y-1.5 text-slate-300 text-xs leading-relaxed">
              <li><strong class="text-white">category</strong> (Required): Must be one of <code class="text-amber-300">"CAPS"</code>, <code class="text-emerald-400">"Multi Cuisine Restaurant"</code>, <code class="text-amber-200">"Chill N Chai"</code>, or <code class="text-orange-300">"Arabic Corner"</code>.</li>
              <li><strong class="text-white">name</strong> (Required): Dish name, maximum <code class="text-slate-200">40 characters</code>.</li>
              <li><strong class="text-white">price</strong> (Optional): Number or short text, max <code class="text-slate-200">4 characters</code> (e.g. <code class="text-slate-200">"240"</code>, <code class="text-slate-200">"Free"</code>) or <code class="text-slate-200">null</code>.</li>
              <li><strong class="text-white">isVeg</strong> (Required): <code class="text-emerald-400">true</code> for Vegetarian, <code class="text-red-400">false</code> for Non-Vegetarian.</li>
              <li><strong class="text-white">description</strong> (Optional): Short offer or detail, maximum <code class="text-slate-200">40 characters</code>, or <code class="text-slate-200">null</code>.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  initialTab: { type: String, default: 'import' }
})

const emit = defineEmits(['close', 'load-json'])

const activeTab = ref(props.initialTab)
const rawJson = ref('')
const loadMode = ref('replace')
const validationErrors = ref([])
const copiedPrompt = ref(false)

watch(() => props.initialTab, (val) => {
  activeTab.value = val
})

const jsonPlaceholder = `[
  {
    "category": "Multi Cuisine Restaurant",
    "name": "Malabar Chicken Steak",
    "price": "340",
    "isVeg": false,
    "description": "Served with herb butter"
  }
]`

const VALID_CATEGORIES = {
  'caps': 'CAPS',
  'multi cuisine restaurant': 'Multi Cuisine Restaurant',
  'multi-cuisine restaurant': 'Multi Cuisine Restaurant',
  'chill n chai': 'Chill N Chai',
  "chill n' chai": 'Chill N Chai',
  'arabic corner': 'Arabic Corner'
}

const aiPromptTemplate = `Convert the following Hotel CAPS daily specials into a raw JSON array (no markdown explanation, only valid JSON).

Follow these exact rules for each object:
- "category": Must be strictly one of: "CAPS", "Multi Cuisine Restaurant", "Chill N Chai", or "Arabic Corner"
- "name": Dish name (string, max 40 characters, required)
- "price": Price as a number or short text (string, max 4 characters, e.g. "260" or "Free") or null if no price
- "isVeg": true for Vegetarian, false for Non-Vegetarian (boolean, required)
- "description": Short offer/detail (string, max 40 characters) or null

Example Output:
[
  {
    "category": "Multi Cuisine Restaurant",
    "name": "Paneer Shawarma Tacos",
    "price": "260",
    "isVeg": true,
    "description": "Spiced paneer & garlic tahini"
  }
]

Here are today's specials to convert:
[PASTE YOUR ITEMS HERE]`

const copyAiPrompt = async () => {
  try {
    await navigator.clipboard.writeText(aiPromptTemplate)
    copiedPrompt.value = true
    setTimeout(() => { copiedPrompt.value = false }, 2000)
  } catch (e) {
    alert('Unable to access clipboard. Please select and copy manually.')
  }
}

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      rawJson.value = text
      validationErrors.value = []
    }
  } catch (e) {
    alert('Please allow clipboard permission or paste manually into the box.')
  }
}

const resetErrors = () => {
  validationErrors.value = []
}

const validateAndLoad = () => {
  validationErrors.value = []
  const trimmed = rawJson.value.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim()

  if (!trimmed) {
    validationErrors.value.push('Please paste JSON data before clicking Validate & Load.')
    return
  }

  let parsed
  try {
    parsed = JSON.parse(trimmed)
  } catch (err) {
    validationErrors.value.push(`Syntax Error: Invalid JSON format (${err.message}).`)
    return
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    validationErrors.value.push('Root structure must be a non-empty JSON Array: [ { ... } ].')
    return
  }

  const errors = []
  const sanitized = []

  parsed.forEach((entry, idx) => {
    const label = `Item #${idx + 1}`
    if (!entry || typeof entry !== 'object') {
      errors.push(`${label}: Must be a valid JSON object.`)
      return
    }

    // 1. Validate Category
    const rawCat = String(entry.category || '').trim().toLowerCase()
    const normalizedCategory = VALID_CATEGORIES[rawCat]
    if (!normalizedCategory) {
      errors.push(`${label}: Invalid category "${entry.category}". Allowed: CAPS, Multi Cuisine Restaurant, Chill N Chai, Arabic Corner.`)
    }

    // 2. Validate Name
    const name = String(entry.name || '').trim()
    if (!name) {
      errors.push(`${label}: Missing mandatory "name".`)
    } else if (name.length > 40) {
      errors.push(`${label} ("${name.slice(0, 20)}..."): Name is ${name.length} chars (max 40 allowed).`)
    }

    // 3. Validate isVeg
    if (typeof entry.isVeg !== 'boolean') {
      errors.push(`${label} ("${name || 'Unnamed'}"): "isVeg" must be true or false.`)
    }

// 4. Validate Price & Description
    const price = entry.price !== null && entry.price !== undefined && String(entry.price).trim() !== ''
      ? String(entry.price).replace(/₹/g, '').trim()
      : null

    if (price && price.length > 4) {
      errors.push(`${label} ("${name}"): Price "${price}" is ${price.length} chars (max 4 allowed).`)
    }

    const desc = entry.description !== null && entry.description !== undefined && String(entry.description).trim() !== ''
      ? String(entry.description).trim()
      : null

    if (desc && desc.length > 40) {
      errors.push(`${label} ("${name}"): Description is ${desc.length} chars (max 40 allowed).`)
    }

    sanitized.push({
      id: Date.now() + idx + Math.random(),
      category: normalizedCategory || 'Multi Cuisine Restaurant',
      name,
      price,
      isVeg: Boolean(entry.isVeg),
      description: desc,
      image: null
    })
  })

  if (errors.length > 0) {
    validationErrors.value = errors
    return
  }

  emit('load-json', { items: sanitized, mode: loadMode.value })
  rawJson.value = ''
  emit('close')
}
</script>