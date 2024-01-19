<script setup>
import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';

const store = useMainStore();
const { language } = storeToRefs(store);

const menu = computed(() => {
  if (language.value === 'en') {
    return menuEn;
  }
  return menuEs;
});

useHead({
  title: 'Brunette Kitchen & Drinks | Menú 📖',
  meta: [
    {
      name: 'description',
      content: 'Conoce nuestros deliciosos platillos y mixología.',
    },
    // Facebook Meta tags
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
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
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
  <main class="relative mt-8 overflow-x-hidden bg-base-100 lg:mt-8">
    <h1 class="px-2 text-center font-montserrat text-5xl text-primary lg:px-32">
      {{ language === 'es' ? 'Menú' : 'Menu' }}
    </h1>
    <div class="divider mx-auto w-1/2"></div>

    <section class="grid w-full grid-cols-1 gap-8 px-2 pb-28 md:grid-cols-2">
      <CategoryItem v-for="category in menu" rounded :category="category" :key="category.title" />
    </section>
  </main>
</template>
