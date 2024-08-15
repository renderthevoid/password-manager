<template>
  <div>
    <div
      class="h-full w-full fixed top-0 left-0 z-20 bg-gray-800 opacity-50"
      @click="$emit('close')"
    ></div>
    <div
      class="bg-white rounded-lg text-lg p-6 shadow-lg w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
    >
      <div class="">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-xl mb-2 font-semibold">{{ props.title }}</h3>
          <div>
            <button @click="$emit('close')">
              <span>
                <font-awesome-icon :icon="faXmark" class="text-gray-500"></font-awesome-icon>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IModalProps {
  title: string
}
const props = defineProps<IModalProps>()
import { faXmark } from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
