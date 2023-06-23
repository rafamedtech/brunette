<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
store.$patch({
  language: 'en',
});

const { language } = storeToRefs(store);
const { menu } = useMenu('en');
// store.fetchCategories();
// console.log(currentLang);

useHead({
  title: 'Brunette Menu',
  meta: [
    {
      name: 'description',
      content: 'Restaurant menu website',
    },
  ],
});

definePageMeta({
  middleware: async function (to, from) {
    if (from.path !== '/') await navigateTo('/language');
  },
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
});
</script>

<template>
  <main class="mt-4 overflow-x-hidden">
    <h1 class="px-2 text-center font-handlee text-2xl uppercase text-primary lg:px-32">Menu</h1>
    <span class="mx-auto block w-fit text-xs uppercase text-black">(english)</span>
    <section class="grid grid-cols-2 gap-8 px-2 py-4 pb-20 lg:grid-cols-2 lg:px-80">
      <CategoryItem v-for="category in menu" :category="category" :key="category.title" />
    </section>
  </main>
</template>
