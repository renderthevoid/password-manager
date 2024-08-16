<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
import VList from '@/components/VList.vue'
import VModal from '@/components/VModal.vue'
import VInput from '@/components/VInput.vue'
import VCheckbox from '@/components/VCheckbox.vue'
import VRadio from '@/components/VRadio.vue'
import { computed, onMounted, provide, ref, watch, watchEffect } from 'vue'
import type { IPasswordItem } from '@/models/interfaces/PasswordInterface'
import { useClipboard } from '@vueuse/core'
import { useSearchValueStore } from '@/stores/searchValueStore'
import { useModalStore } from '@/stores/modalStore'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { getRandomStatus } from '@/utils/randomStatus'
import { generateRandomPassword } from '@/utils/generateRandomPassword'
import type { IGenerateSettings } from '@/models/interfaces/GenerateInterface'

const serviceValue = ref<string>('')
const passwordValue = ref<string>('')
const inProcess = ref<boolean>(false)
const rejectService = ref<boolean>(false)
const rejectPassword = ref<boolean>(false)
const source = ref('')
const generatedPassword = ref<string>('')
const isAllFieldsFilled = ref<boolean>(true)
const isDeletingItem = ref<boolean>(false)

const items = ref<IPasswordItem[]>([
  // { id: 0, name: 'dns', password: 'qwerty' },
  // { id: 1, name: 'mvideo', password: 'qwerty1' }
])
const selectedSettings = ref<IGenerateSettings>({
  passwordLength: '',
  letters: false,
  digits: false,
  chars: false,
  transform: 'Все',
  inputString: ''
})

const { copy, copied } = useClipboard({ source })
const store = useSearchValueStore()
const modalStore = useModalStore()

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    if (item.name.toLowerCase().includes(store.value.toLowerCase())) {
      return true
    }
  })
})

const blockSettings = computed(() => {
  return selectedSettings.value.inputString.length ? true : false
})

watch(
  blockSettings,
  () => {
    if (selectedSettings.value.inputString.length > 0) {
      selectedSettings.value = {
        ...selectedSettings.value,
        letters: false,
        digits: false,
        chars: false,
        transform: ''
      }
    } else {
      selectedSettings.value.transform = 'Все'
    }
  },
  { deep: true }
)

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
            id: items.value.length ? items.value[items.value.length - 1]['id'] + 1 : 0,
            name: serviceValue.value,
            password: passwordValue.value
          }
        ]
        localStorage.setItem('items', JSON.stringify(items.value))
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
  }, 1000)
}

const copyPassword = (id: number) => {
  items.value.forEach((item) => {
    if (item.id === id) {
      copy(item.password)
    }
  })
}

const copyGeneratedPassword = () => {
  if (generatedPassword.value.length) {
    copy(generatedPassword.value)
  }
}

const deleteItem = (id: number) => {
  isDeletingItem.value = true
  setTimeout(async () => {
    if (getRandomStatus(1, 10) > 5) {
      items.value = items.value.filter((i) => i.id !== id)
      await localStorage.setItem('items', JSON.stringify(items.value))
    }
    isDeletingItem.value = false
  }, 1000)
}
provide('deleting', isDeletingItem)

const generatePassword = () => {
  if (!selectedSettings.value.passwordLength) {
    return (isAllFieldsFilled.value = false)
  }
  if (
    Object.values(selectedSettings.value).includes(true) ||
    selectedSettings.value.inputString.length
  ) {
    isAllFieldsFilled.value = true
    generatedPassword.value = generateRandomPassword(selectedSettings.value)
  }
}

onMounted(() => {
  if (localStorage.getItem('items') !== null) {
    items.value = JSON.parse(localStorage.getItem('items') || '[]') 
  }
})
</script>

<template>
  <main>
    <template v-if="modalStore.isModalActive">
      <transition name="bounce" mode="out-in">
        <v-modal title="Добавить пароль" @close="modalStore.modalDisable">
          <form action="" @submit.prevent="addPassword">
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-2">
                <v-input
                  v-model="serviceValue"
                  label="Сервис"
                  :disabled="inProcess"
                  :class="{ 'border-red-500': rejectService }"
                  @input-focus="rejectService = false"
                ></v-input>
                <v-input
                  v-model="passwordValue"
                  label="Пароль"
                  :disabled="inProcess"
                  :class="{ 'border-red-500': rejectPassword }"
                  @input-focus="rejectPassword = false"
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
          </form>
        </v-modal>
      </transition>
    </template>
    <template v-if="modalStore.isGenerateModalActive">
      <transition name="bounce" mode="out-in">
        <v-modal title="Генерация пароля" @close="modalStore.modalDisable">
          <div class="flex flex-col gap-3">
            <v-input
              placeholder="Введите длину пароля"
              v-model="selectedSettings.passwordLength"
            ></v-input>
            <p>Выберите символы</p>
            <v-checkbox
              label="Буквы"
              v-model="selectedSettings.letters"
              :disabled="blockSettings"
            ></v-checkbox>
            <v-checkbox
              label="Цифры"
              v-model="selectedSettings.digits"
              :disabled="blockSettings"
            ></v-checkbox>
            <v-checkbox
              label="Символы"
              v-model="selectedSettings.chars"
              :disabled="blockSettings"
            ></v-checkbox>

            <div class="p-2 bg-gray-100 rounded-md flex flex-wrap justify-between gap-2">
              <v-radio
                label="Заглавные"
                value="Заглавные"
                v-model="selectedSettings.transform"
                :disabled="blockSettings"
              ></v-radio>
              <v-radio
                label="Строчные"
                value="Строчные"
                v-model="selectedSettings.transform"
                :disabled="blockSettings"
              ></v-radio>
              <v-radio
                label="Все"
                value="Все"
                v-model="selectedSettings.transform"
                :disabled="blockSettings"
              ></v-radio>
            </div>

            <div v-if="!isAllFieldsFilled" class="text-red-500 text-sm">Заполните все поля</div>

            <v-input
              placeholder="Введите свои символы"
              v-model="selectedSettings.inputString"
            ></v-input>
            <div class="h-10">
              <button
                class="w-full h-full border rounded-md px-3 bg-gray-200"
                @click="copyGeneratedPassword"
              >
                <span>
                  {{ generatedPassword }}
                </span>
              </button>
            </div>
            <button @click="generatePassword">сделать красиво</button>
          </div>
        </v-modal>
      </transition>
    </template>
    <div class="flex flex-col h-screen">
      <v-header></v-header>
      <div class="my-4"></div>
      <v-list
        :items="filteredItems"
        @copy-password="copyPassword"
        @delete-item="deleteItem"
      ></v-list>
    </div>
    <transition-group name="fade">
      <div
        v-if="copied"
        class="absolute z-50 right-4 bottom-0 bg-gray-400 transition overflow-hidden p-2 rounded-sm"
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
