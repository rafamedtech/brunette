<script setup>
const props = defineProps({
  section: {
    type: Object,
  },
});
</script>

<template>
  <div class="flex w-full flex-col items-center rounded-xl border-t py-4 lg:h-40 lg:rounded-xl lg:shadow-xl">
    <h2 class="font-montserrat text-3xl font-semibold underline">
      {{ section.title }}
    </h2>
    <p class="text-center font-handlee text-lg font-extralight uppercase text-gray-50" v-if="section.description">
      {{ section.description }}
    </p>
  </div>
</template>
