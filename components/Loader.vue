<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { language } = storeToRefs(store);
</script>

<template>
  <div class="">
    <div class="flex flex-col items-center gap-4">
      <Icon name="svg-spinners:tadpole" size="52" class="text-primary" />
    </div>
  </div>
</template>
