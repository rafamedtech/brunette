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
    <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" />

    <section class="mt-8">
      <div class="w-full text-center">
        <h2 class="text-2xl">Configuración del Menú</h2>
        <div class="relative mt-8 grid w-full gap-8 p-4">
          <div
            class="absolute inset-0 z-10 grid h-full w-full place-items-center rounded-2xl bg-white/50"
          >
            <h3 class="text-3xl">En construcción</h3>
          </div>
          <div class="mt-8 grid w-full gap-8 p-4 blur-sm lg:grid-cols-2">
            <CategoryItem v-for="category in menu" :category="category" :key="category.title" />
          </div>
        </div>
      </div>
    </section>
    <!-- <BottomNav /> -->
  </section>
</template>
