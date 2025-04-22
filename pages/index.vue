<script setup>
const store = useMainStore();
const { language } = storeToRefs(store);

const { menu } = useMenu();

useSeoMeta({
  title: 'Brunette Kitchen & Drinks | Menú 📖',
  description: 'Conoce nuestros deliciosos platillos y mixología.',
  ogTitle: 'Brunette Kitchen & Drinks | Menú 📖',
  ogImage: 'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
});
</script>

<template>
  <main class="relative mt-4 overflow-x-hidden bg-base-100 lg:mt-8">
    <h1
      class="mx-auto w-fit border-b-4 border-primary px-2 text-center font-montserrat text-4xl font-semibold uppercase lg:px-32 lg:text-3xl"
    >
      {{ language === 'es' ? 'Menú' : 'Menu' }}
    </h1>

    <section class="grid w-full gap-8 px-2 pb-28 pt-8 md:grid-cols-2 md:px-4">
      <CategoryItem v-for="category in menu" rounded :category="category" :key="category.title" />
    </section>
  </main>
</template>
