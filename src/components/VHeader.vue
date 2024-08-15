<template>
  <header class="py-10 border-b-2">
    <div class="container">
      <div class="flex items-center gap-10">
        <div class="">
          <h1 class="text-lg text-slate-500 capitalize font-bold">Password Manager</h1>
        </div>
        <div class="flex-1">
          <v-input v-model="store.value" placeholder="Введите сервис" class="w-3/5"></v-input>
        </div>
        <div class="flex items-center gap-2">
          <div>
            <button
              class="group px-2 py-1 border rounded-lg transition-all"
              @click="modalStore.generateModalEnable"
            >
              <span>
                <font-awesome-icon
                  :icon="faKey"
                  class="text-gray-500 group-hover:text-gray-300 transition-all"
                />
              </span>
            </button>
          </div>
          <div>
            <button
              class="group px-2 py-1 border rounded-lg transition-all"
              @click="modalStore.modalEnable"
            >
              <span>
                <font-awesome-icon
                  :icon="faPlus"
                  class="text-gray-500 group-hover:text-gray-300 transition-all"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { faPlus, faKey } from '@fortawesome/free-solid-svg-icons'
import VInput from './VInput.vue'
import { useSearchValueStore } from '@/stores/searchValueStore'
import { ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
const store = useSearchValueStore()
const modalStore = useModalStore()

const openModal = () => {}
</script>

<style scoped></style>
