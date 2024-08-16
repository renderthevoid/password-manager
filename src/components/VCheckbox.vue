<template>
  <div class="relative flex items-center rounded-full cursor-pointer">
    <input
      type="checkbox"
      :id="props.label"
      :name="props.label"
      :checked="isChecked"
      @change="changeCheckbox"
      :value="props.modelValue"
      v-bind="$attrs"
      class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
      :disabled
    />
    <label :for="props.label" class="ml-3 font-light text-gray-700 cursor-pointer select-none" :class="{'text-gray-300': disabled}">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ICheckboxProps {
  modelValue: boolean
  label?: string
  id?: string
  disabled?: boolean
}
const props = defineProps<ICheckboxProps>()
const emit = defineEmits(['update:modelValue'])
const isChecked = computed<boolean>(() => {
  return props.modelValue
})
const changeCheckbox = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>
