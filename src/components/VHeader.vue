<template>
  <header class="py-10 border-b-2">
    <div class="container">
      <div class="flex items-center gap-10">
        <div class="">
          <h1 class="text-lg text-slate-500 capitalize font-bold">Password Manager</h1>
        </div>
        <v-input v-model="store.value"></v-input>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import VInput from './VInput.vue'
import { useSearchValueStore } from '@/stores/searchValueStore';
const store = useSearchValueStore()


</script>

<style scoped></style>
