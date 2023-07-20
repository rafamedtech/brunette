<script setup>
const props = defineProps({
  section: {
    type: Object,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/admin/menu/secciones/${section.id}`"
    class="background card relative mx-auto flex h-32 w-full flex-col justify-center rounded-xl px-8 py-2 shadow-xl"
  >
    <NuxtLink
      class="btn-primary btn-circle btn absolute -right-2 -top-2 cursor-pointer"
      :to="`/admin/menu/secciones/${section.id}/editar`"
    >
      <Icon name="solar:pen-outline" size="24" />
    </NuxtLink>

    <h2 class="z-10 text-center font-handlee text-3xl text-black">{{ section.title }}</h2>
    <p
      class="text-center font-handlee text-lg font-extralight uppercase text-gray-50"
      v-if="section.description"
    >
      {{ section.description }}
    </p>
  </NuxtLink>
</template>
