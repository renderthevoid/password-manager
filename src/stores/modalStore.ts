import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
  const isModalActive = ref<boolean>(false)
  const isGenerateModalActive = ref<boolean>(false)

  const modalDisable = () => {
    isModalActive.value = false
    isGenerateModalActive.value = false
  }

  const modalEnable = () => {
    return (isModalActive.value = true)
  }

  const generateModalEnable = () => (isGenerateModalActive.value = true)

  return { isModalActive, modalEnable, modalDisable, isGenerateModalActive, generateModalEnable }
})
