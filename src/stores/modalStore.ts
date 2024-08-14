import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
  const isModalActive = ref<boolean>(false)

  const modalDisable = () => {
    return (isModalActive.value = false)
  }

  const modalEnable = () => {
    return (isModalActive.value = true)
  }

  return { isModalActive, modalEnable, modalDisable }
})
