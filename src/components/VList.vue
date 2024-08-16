<script setup lang="ts">
import VListItem from './VListItem.vue'
import type { IPasswordItem } from '@/models/interfaces/PasswordInterface'

interface IListProps {
  items: IPasswordItem[]
}
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
const props = defineProps<IListProps>()
</script>

<template>
  <div class="mb-3">
    <div class="container flex flex-col">
      <div class="flex justify-between items-center px-2 mr-16 mb-2">
        <div class="flex-1">Сервис</div>
        <div class="flex-1">Пароль</div>
      </div>
      <div class="max-h-96 h-screen">
        <ul class="w-full flex flex-col gap-2 overflow-y-scroll no-scrollbar h-full">
          <VListItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @copy-password="copyItem"
            @delete-item="deleteItem"
          ></VListItem>
        </ul>
      </div>
    </div>
  </div>
</template>
