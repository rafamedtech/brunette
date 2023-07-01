<script setup>
const { menu } = useMenu('es');

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
});
</script>

<template>
  <section class="w-full">
    <!-- <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" /> -->

    <section class="">
      <div class="w-full text-center">
        <h2 class="font-handlee text-4xl text-primary">Administrar Menú</h2>
        <div class="divider mx-auto w-1/2"></div>
      </div>
      <div class="mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
        <CategoryItem v-for="category in menu" :category="category" :key="category.title" />
      </div>
    </section>
    <!-- <BottomNav /> -->
  </section>
</template>
