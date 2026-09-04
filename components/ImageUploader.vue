<!-- components/ImageUploader.vue -->
<template>
  <div class="w-full">
    
    <!-- State 1: Active Image -->
    <div v-if="currentImage" class="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-4 transition-colors">
      <img :src="currentImage" alt="Media Asset" class="w-16 h-16 object-cover rounded border border-slate-300 dark:border-slate-700 bg-white" />
      <div class="grow overflow-hidden">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">WP Content URL</p>
        <input type="text" readonly :value="currentImage" class="w-full bg-transparent text-sm text-teal-600 dark:text-teal-400 outline-none truncate" />
      </div>
      <button @click="$emit('update:image', null)" class="px-4 py-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 text-xs font-bold rounded-md transition-colors cursor-pointer">
        Remove
      </button>
    </div>

    <!-- State 2: Upload Zone -->
    <div v-else>
      <div 
        class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 p-6 rounded-lg text-center cursor-pointer bg-slate-50 dark:bg-slate-950 transition-colors"
        :class="{ 'border-teal-500 bg-teal-50 dark:bg-teal-950/20': isDragActive }"
        @dragover.prevent="isDragActive = true"
        @dragleave.prevent="isDragActive = false"
        @drop.prevent="handleDrop"
        @click="fileInputRef.click()"
      >
        <input type="file" ref="fileInputRef" accept="image/png, image/jpeg, image/webp" class="hidden" @change="handleFileSelect" />
        <p v-if="!selectedFile" class="text-sm text-slate-500 dark:text-slate-400">
          Drag image here or <strong class="text-teal-600 dark:text-teal-400">browse files</strong>
        </p>
        <p v-else class="text-sm text-teal-600 dark:text-teal-400 font-bold truncate">{{ selectedFile.name }}</p>
      </div>

      <!-- Controls -->
      <div class="flex gap-2 mt-3">
        <button 
          :disabled="!selectedFile || isUploading"
          @click="uploadImage"
          class="flex-1 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex justify-center items-center gap-2"
        >
          <span v-if="isUploading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isUploading ? 'Streaming to Server...' : 'Upload Image' }}
        </button>
        <button 
          v-if="selectedFile && !isUploading" 
          @click="selectedFile = null" 
          class="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>

      <p v-if="statusMsg" class="mt-3 text-xs font-semibold px-3 py-2 rounded-md" :class="statusType === 'error' ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'">
        {{ statusMsg }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  authHeader: { type: String, required: true },
  currentImage: { type: String, default: null }
})

const emit = defineEmits(['update:image'])

const fileInputRef = ref(null)
const selectedFile = ref(null)
const isDragActive = ref(false)
const isUploading = ref(false)
const statusMsg = ref('')
const statusType = ref('')

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) processFile(file)
}

const handleDrop = (e) => {
  isDragActive.value = false
  const file = e.dataTransfer.files[0]
  if (file) processFile(file)
}

const processFile = (file) => {
  if (!file.type.startsWith('image/')) {
    statusMsg.value = 'Only image files (PNG, JPG, WEBP) are allowed.'
    statusType.value = 'error'
    return
  }
  selectedFile.value = file
  statusMsg.value = ''
}

const uploadImage = async () => {
  if (!selectedFile.value) return
  isUploading.value = true
  statusMsg.value = 'Processing server upload...'
  statusType.value = 'info'

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const res = await $fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${props.authHeader}` },
      body: formData
    })
    emit('update:image', res.url)
    selectedFile.value = null
    statusMsg.value = 'Upload successful!'
    statusType.value = 'success'
  } catch (err) {
    statusMsg.value = err.data?.statusMessage || err.message
    statusType.value = 'error'
  } finally {
    isUploading.value = false
  }
}
</script>