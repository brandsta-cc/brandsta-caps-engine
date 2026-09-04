<!-- components/DataForm.vue -->
<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm dark:shadow-lg relative group transition-all hover:border-slate-300 dark:hover:border-slate-700">
    
    <button @click="$emit('remove')" class="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer" title="Delete Item">
      ✕
    </button>

    <!-- CATEGORY -->
    <div class="mb-5">
      <label class="block text-xs font-bold text-teal-600 dark:text-teal-500 uppercase tracking-wider mb-2">Category *</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="cat in categories" :key="cat" class="cursor-pointer">
          <input type="radio" :value="cat" v-model="item.category" class="hidden peer" />
          <div class="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-400 peer-checked:bg-teal-50 dark:peer-checked:bg-teal-900/30 peer-checked:border-teal-500 peer-checked:text-teal-700 dark:peer-checked:text-teal-300 transition-colors font-medium">
            {{ cat }}
          </div>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="col-span-2">
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Item Name *</label>
        <input v-model="item.name" type="text" placeholder="e.g. Ghee Roast Dosa" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-400 dark:placeholder-slate-700" />
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Price (Optional)</label>
        <input v-model="item.price" type="text" placeholder="e.g. ₹250" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-400 dark:placeholder-slate-700" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Dietary Type *</label>
        <select v-model="item.isVeg" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none">
          <option :value="true">Vegetarian</option>
          <option :value="false">Non-Vegetarian</option>
        </select>
      </div>
      <div class="col-span-2">
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Description (Optional)</label>
        <input v-model="item.description" type="text" placeholder="Brief description..." class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-400 dark:placeholder-slate-700" />
      </div>
    </div>

    <!-- Media Uploader Injection -->
    <div class="pt-5 border-t border-slate-200 dark:border-slate-800">
      <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Media Asset</label>
      <ImageUploader :auth-header="authHeader" :current-image="item.image" @update:image="val => item.image = val" />
    </div>

  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  authHeader: { type: String, required: true }
})
defineEmits(['remove'])

const categories = ['CAPS', 'Multi-Cuisine Restaurant', 'Chill N Chai', 'Arabic Corner']
</script>