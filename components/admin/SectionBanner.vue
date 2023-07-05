<script setup>
const props = defineProps({
  section: {
    type: Object,
  },
});
</script>

<template>
  <div
    class="card relative mx-auto flex h-32 w-full flex-col justify-center rounded-xl px-8 py-2 shadow-xl lg:h-40"
  >
    <img
      class="absolute inset-0 h-full w-full rounded-xl object-cover"
      src="@/assets/images/menu-background.jpeg"
      alt=""
    />

    <h2 class="z-10 text-center font-handlee text-3xl text-black">{{ section.title }}</h2>
    <p
      class="text-center font-handlee text-lg font-extralight uppercase text-gray-50"
      v-if="section.description"
    >
      {{ section.description }}
    </p>
  </div>
</template>
