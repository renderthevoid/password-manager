import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchValueStore = defineStore('searchValue', () => {
  const value = ref<string>('')

  return { value }
})