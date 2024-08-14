<template>
  <input class="border rounded-lg outline-none py-2 px-3" :value="props.modelValue" @input="updateInput"/>
</template>

<script setup lang="ts">
interface IInputProps {
  placholder?: string
  modelValue: string
}

const props = defineProps<IInputProps>()
const emit = defineEmits(['update:modelValue'])

const updateInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped></style>
