<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
import VList from '@/components/VList.vue'
import { computed, ref } from 'vue'
import type { IPasswordItem } from '@/models/interfaces/PasswordInterface'
import { useClipboard } from '@vueuse/core'
import { useSearchValueStore } from '@/stores/searchValueStore'

const source = ref('')
const { copy, copied } = useClipboard({ source })
const items = ref<IPasswordItem[]>([
  { id: 0, name: 'dns', password: 'qwerty' },
  { id: 1, name: 'mvideo', password: 'qwerty1' }
])

const store = useSearchValueStore()

const copyPassword = (id: number) => {
  items.value.forEach((item) => {
    if (item.id === id) {
      copy(item.password)
    }
  })
}

const deleteItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id)
}

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    if (item.name.includes(store.value)) {
      return true
    }
  })
})
</script>

<template>
  <main>
    <VHeader></VHeader>
    <div class="my-4"></div>
    <VList :items="filteredItems" @copy-password="copyPassword" @delete-item="deleteItem"></VList>
    <transition-group name="fade">
      <div
        v-if="copied"
        class="absolute right-4 bottom-0 bg-gray-400 transition overflow-hidden p-2 rounded-sm"
      >
        <div class="text-white">Скопировано!</div>
      </div>
    </transition-group>
  </main>
</template>

<style>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  bottom: -40px;
}
</style>
