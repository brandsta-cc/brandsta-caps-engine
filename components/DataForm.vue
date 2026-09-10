<!-- components/DataForm.vue -->
<template>
  <div class="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg relative group transition-all hover:border-slate-700">
    
    <button @click="$emit('remove')" class="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors cursor-pointer" title="Delete Item">
      ✕
    </button>

    <!-- CATEGORY -->
    <div class="mb-5">
      <label class="block text-xs font-bold text-white uppercase tracking-wider mb-2">Category *</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="cat in categories" :key="cat" class="cursor-pointer">
          <input type="radio" :value="cat" v-model="item.category" class="hidden peer" />
          <div 
            class="px-4 py-2 bg-[#030712] border border-slate-800 rounded-lg text-sm text-slate-400 transition-colors font-medium"
            :class="[
              cat.toLowerCase() === 'caps' ? 'peer-checked:bg-amber-500/10 peer-checked:border-amber-500 peer-checked:text-amber-400' : '',
              cat.toLowerCase() === 'multi-cuisine restaurant' ? 'peer-checked:bg-emerald-500/10 peer-checked:border-emerald-600 peer-checked:text-emerald-600' : '',
              cat.toLowerCase() === 'chill n chai' ? 'peer-checked:bg-[#d4a373]/10 peer-checked:border-[#d4a373] peer-checked:text-[#d4a373]' : '',
              cat.toLowerCase() === 'arabic corner' ? 'peer-checked:bg-[#8b5a2b]/10 peer-checked:border-[#ab7a4b] peer-checked:text-[#ab7a4b]' : '',
              !['caps', 'multi cuisine restaurant', 'chill n chai', 'arabic corner'].includes(cat.toLowerCase()) ? 'peer-checked:bg-[#0068fe]/10 peer-checked:border-[#0068fe] peer-checked:text-[#0068fe]' : ''
            ]"
          >
            {{ cat }}
          </div>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="col-span-2">
        <label class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Item Name *</label>
        <!-- <input v-model="item.name" type="text" placeholder="e.g. Ghee Roast Dosa" class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600" /> -->
      
        <div class="relative w-full">
          <input 
            v-model="item.name" 
            type="text" 
            maxlength="40" 
            placeholder="e.g. Ghee Roast Dosa" 
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 pr-16 text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600" 
          />
          <span 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono select-none transition-colors"
            :class="(item.name?.length || 0) >= 35 ? 'text-amber-500' : 'text-slate-500'"
          >
            {{ item.name?.length || 0 }}/40
          </span>
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Price (Optional)</label>
        <input v-model="item.price" type="text" placeholder="e.g. ₹250" class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      <div>
        <label class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Dietary Type *</label>
        <select v-model="item.isVeg" class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0068fe] transition-colors appearance-none">
          <option :value="true">Vegetarian</option>
          <option :value="false">Non-Vegetarian</option>
        </select>
      </div>
      <div class="col-span-2">
        <label class="block text-xs font-bold text-white uppercase tracking-wider mb-1">Offers / Details (Optional)</label>
        <!-- <input v-model="item.description" type="text" placeholder="Offers / Details..." class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600" /> -->
      
        <div class="relative w-full">
          <input 
            v-model="item.description" 
            type="text" 
            maxlength="30" 
            placeholder="Offers / Details..." 
            class="w-full bg-[#030712] border border-slate-800 rounded-lg px-4 py-2.5 pr-16 text-white focus:outline-none focus:border-[#0068fe] transition-colors placeholder-slate-600" 
          />
          <!-- Character Counter -->
          <span 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono transition-colors"
            :class="(item.description?.length || 0) >= 25 ? 'text-amber-500' : 'text-slate-500'"
          >
            {{ item.description?.length || 0 }}/30
          </span>
        </div>
      </div>
    </div>

    <!-- Media Uploader Injection -->
    <!-- <div class="pt-5 border-t border-slate-800">
      <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Media Asset</label>
      <ImageUploader :auth-header="authHeader" :current-image="item.image" @update:image="val => item.image = val" />
    </div> -->

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