<template>
  <div class="flex flex-col">
    <label :for="props.label" class="text-sm text-gray-500">{{ props.label }}</label>
    <input
      type="text"
      :id="props.label"
      class="border rounded-lg outline-none py-2 px-3"
      v-bind="$attrs"
      :value="props.modelValue"
      @input="updateInput"
    />
    <div class="text-red-500">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IInputProps {
  modelValue: string
  placholder?: string
  label?: string
  name?: string
  disabled?: boolean
}

const props = defineProps<IInputProps>()
const emit = defineEmits(['update:modelValue'])

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const computeWarn = computed(() => {
  return !props.modelValue.length
})
</script>

<style scoped></style>
