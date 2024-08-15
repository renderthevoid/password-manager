<template>
  <div class="inline-flex items-center">
    <label class="relative flex items-center rounded-full cursor-pointer" htmlFor="html">
      <input
        type="radio"
        :id="label"
        :checked="isChecked"
        :value="value"
        @change="onChange"
        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
        :disabled
      />
      <span
        class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
        </svg>
      </span>
    </label>
    <label :for="label" class="ml-2 font-light text-gray-700 cursor-pointer select-none">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ICheckboxProps {
  modelValue: boolean | string
  label?: string
  value?: string
  disabled?: boolean
}
const props = defineProps<ICheckboxProps>()
const emit = defineEmits(['update:modelValue', 'onChange'])

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const onChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
