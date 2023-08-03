<script setup>
import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { language } = storeToRefs(store);
// const { menu: menuDataES } = useMenu('es');
// const { menu: menuDataEN } = useMenu('en');

const menu = computed(() => {
  if (language.value === 'en') {
    return menuEn;
  }
  return menuEs;
});

// console.log(menu.value);

// Metadata
useHead({
  title: 'Brunette Kitchen & Drinks | Menú 📖',
  meta: [
    {
      name: 'description',
      content: 'Conoce nuestros deliciosos platillos y mixología.',
    },
    // Facbebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://brunette.com.mx/',
    },
    {
      property: 'og:title',
      content: 'Brunette Kitchen & Drinks | Menú 📖',
    },
    {
      property: 'og:description',
      content: 'Conoce nuestros deliciosos platillos y mixología.',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1675470741/menu/logobackground_qugh9v.png',
    },
  ],
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
});
</script>

<template>
  <main class="relative mt-4 overflow-x-hidden bg-base-100 lg:mt-8">
    <h1 class="px-2 text-center font-handlee text-4xl text-primary lg:px-32">
      {{ language === 'es' ? 'Menú' : 'Menu' }}
    </h1>
    <div class="divider mx-auto w-1/2"></div>

    <section class="grid w-full grid-cols-2 gap-8 px-2 py-4 pb-20 lg:grid-cols-2">
      <CategoryItem v-for="category in menu" :category="category" :key="category.title" />
    </section>
  </main>
</template>
