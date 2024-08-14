<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
import VList from '@/components/VList.vue'
import VModal from '@/components/VModal.vue'
import VInput from '@/components/VInput.vue'
import { computed, ref } from 'vue'
import type { IPasswordItem } from '@/models/interfaces/PasswordInterface'
import { useClipboard } from '@vueuse/core'
import { useSearchValueStore } from '@/stores/searchValueStore'
import { useModalStore } from '@/stores/modalStore'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { getRandomStatus } from '@/utils/randomStatus'

const serviceValue = ref<string>('')
const passwordValue = ref<string>('')
const inProcess = ref<boolean>(false)
const rejectService = ref<boolean>(false)
const rejectPassword = ref<boolean>(false)
const source = ref('')
const items = ref<IPasswordItem[]>([
  { id: 0, name: 'dns', password: 'qwerty' },
  { id: 1, name: 'mvideo', password: 'qwerty1' }
])

const { copy, copied } = useClipboard({ source })
const store = useSearchValueStore()
const modalStore = useModalStore()

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    if (item.name.includes(store.value)) {
      return true
    }
  })
})

const addPassword = () => {
  inProcess.value = true
  setTimeout(async () => {
    rejectService.value = false
    rejectPassword.value = false
    if (serviceValue.value.length > 2 && passwordValue.value.length) {
      if (getRandomStatus(1, 10) > 5) {
        items.value = [
          ...items.value,
          {
            id: items.value[items.value.length - 1]['id'] + 1,
            name: serviceValue.value,
            password: passwordValue.value
          }
        ]
        serviceValue.value = ''
        passwordValue.value = ''
        await modalStore.modalDisable()
      }
    } else {
      if (serviceValue.value.length < 3) {
        rejectService.value = true
      } 
      if (!passwordValue.value.length) {
        rejectPassword.value = true
      }
    }
    inProcess.value = false
  }, 2000)
}

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
</script>

<template>
  <main>
    <template v-if="modalStore.isModalActive">
      <transition name="bounce" mode="out-in">
        <v-modal title="Добавить пароль" @close="modalStore.modalDisable">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <v-input
                v-model="serviceValue"
                label="Сервис"
                :disabled="inProcess"
                :class="{ 'border-red-500': rejectService }"
              ></v-input>
              <v-input
                v-model="passwordValue"
                label="Пароль"
                :disabled="inProcess"
                :class="{ 'border-red-500': rejectPassword }"
              ></v-input>
            </div>
            <div>
              <button
                class="bg-green-700 text-md border-radius border-none w-full p-2 text-white"
                :disabled="inProcess"
                @click="addPassword"
              >
                <span v-if="!inProcess"> Добавить </span>
                <span v-else>
                  <font-awesome-icon :icon="faCircleNotch" class="animate-spin" />
                </span>
              </button>
            </div>
          </div>
        </v-modal>
      </transition>
    </template>
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
