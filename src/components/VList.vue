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
  <div>
    <div class="container">
      <div class="flex justify-between items-center px-2">
        <div class="flex-1">Сервис</div>
        <div class="flex-1">Пароль</div>
      </div>
      <div>
        <ul class="w-full">
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
