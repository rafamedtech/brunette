<script setup>
const props = defineProps({
  section: {
    type: Object,
  },
});
</script>

<template>
  <div class="relative flex h-32 w-full flex-col justify-center py-2 lg:h-40">
    <img
      class="absolute inset-0 h-full w-full object-cover"
      src="@/assets/images/menu-background.jpeg"
      alt=""
    />

    <h2 class="z-10 text-center font-handlee text-2xl uppercase text-black">
      - {{ section.title }} -
    </h2>
    <p class="text-center font-handlee text-lg font-extralight uppercase text-gray-50">
      {{ section.description }}
    </p>
  </div>
</template>
