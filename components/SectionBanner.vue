<script setup>
const props = defineProps({
  section: {
    type: Object,
  },
});
</script>

<template>
  <div class="flex w-full flex-col items-center rounded-xl py-4 lg:h-40 lg:rounded-xl">
    <h2 class="border-b-4 border-primary font-montserrat text-2xl font-semibold uppercase lg:text-3xl">
      {{ section.title }}
    </h2>
    <p class="text-center font-handlee text-lg font-extralight uppercase text-gray-50" v-if="section.description">
      {{ section.description }}
    </p>
  </div>
</template>
