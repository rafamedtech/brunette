<script setup>
import menuEn from '@/data/menuDataEn';
import menuEs from '@/data/menuDataEs';
// import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';

const store = useMainStore();

const { language, isLoading } = storeToRefs(store);

// watchEffect(() => {
//   if (!language.value) {
//     return navigateTo('/language');
//   }
// });
// const language = useLocalStorage('language', 'none');
// const { menu: menuDataES } = useMenu('es');
const supabase = useSupabaseClient();

const menu = ref([]);
const { categories, getCategories } = useMenu();
await getCategories(language.value);

onMounted(() => {
  menu.value = categories.value;
  console.log(menu.value);
  // isLoading.value = false;
});
// console.log(categories.value);

// const { menuDataES } = await useMenu();
// const menu = ref([]);
// onMounted(() => {
//   menu.value = categories.value;
// });

// const menu = computed(() => {
//   if (language.value === 'en') {
//     return menuDataEN.value;
//   }
//   return menuDataES.value;
// });

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

    <!-- <section class="grid w-full grid-cols-2 gap-8 px-2 py-4 pb-20 lg:grid-cols-2">
      <CategoryItem v-for="category in menu" :category="category" :key="category.id" />
    </section> -->

    <!-- <div class="mb-24 mt-8 w-full p-4" :class="{ 'lg:grid-cols-2': menu.length }">
      <div v-if="menu.length && !isLoading" class="grid gap-8 lg:grid-cols-2">
        <CategoryItem v-for="category in menu" :category="category" :key="category.title" />
      </div>
      <div v-if="!menu.length && isLoading" class="py-32">
        <Loader />
      </div>

      <div v-if="!menu.length && !isLoading">
        <NoData>No hay ninguna categoría</NoData>
      </div>
    </div> -->
  </main>
</template>
