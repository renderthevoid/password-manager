<template>
  <li class="w-full">
    <div class="flex justify-between items-center p-2 rounded-lg border w-full">
      <span class="text-xl font-bold flex-1"> {{ item.name }} </span>
      <span class="text-gray-500 overflow-hidden flex-1"> {{ item.password }} </span>
      <span class="flex items-center gap-2">
        <button class="group px-2 py-1 border rounded-lg transition-all" @click="copyItem(item.id)">
          <span>
            <font-awesome-icon
              :icon="faCopy"
              class="text-lime-500 group-hover:text-lime-700 transition-all"
            />
          </span>
        </button>
        <button
          class="group px-2 py-1 border rounded-lg transition-all"
          @click="deleteItem(item.id)"
        >
          <span v-if="!isDeleting">
            <font-awesome-icon
              :icon="faTrash"
              class="text-red-500 group-hover:text-red-700 transition-all"
            />
          </span>
          <span v-else>
            <font-awesome-icon :icon="faCircleNotch" class="animate-spin text-slate-800"/>
          </span>
        </button>
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { faCopy, faTrash, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import type { IPasswordItem } from '@/models/interfaces/PasswordInterface'
import { inject } from 'vue'
interface IProps {
  item: IPasswordItem
}
const isDeleting = inject('deleting')
const emit = defineEmits<{
  (e: 'copyPassword', id: number): void
  (e: 'deleteItem', id: number): void
}>()
const copyItem = (id: number) => {
  emit('copyPassword', id)
}

const deleteItem = (id: number) => {
  emit('deleteItem', id)
}
const props = defineProps<IProps>()
</script>

<style scoped></style>
