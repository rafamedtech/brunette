<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

const store = useMainStore();
const { language } = storeToRefs(store);

const { menu } = useMenu('en');
const { params } = useRoute();
const category = menu.value.find((category) => category.slug === params.category);

// watchEffect(() => {
//   if (language.value === 'en') {
//     return navigateTo(``);
//   }
// });

useHead({
  title: `Menú - ${category.title}`,
  meta: [
    {
      name: 'description',
      content: `Nuestro menú de ${category.title}`,
    },
  ],
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
  layout: 'admin-layout',
});
</script>

<template>
  <main class="container">
    <div class="w-full text-center">
      <h2 class="font-handlee text-4xl text-primary">Configuración del Menú</h2>
      <div class="divider mx-auto w-1/2"></div>
    </div>
    <section class="flex items-center gap-4 pt-4">
      <button class="my-auto ml-5 text-primary" @click="$router.back()">
        <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
      </button>
      <div class="breadcrumbs text-sm">
        <ul>
          <li><NuxtLink to="/">Configuración del Menú</NuxtLink></li>
          <li>{{ category.title }}</li>
          <!-- <li>Add Document</li> -->
        </ul>
      </div>
      <!-- <h1 class="mx-auto px-2 text-center font-handlee text-4xl text-primary lg:px-32">
        {{ category.title }}
      </h1> -->
    </section>

    <section class="my-4 pb-16 lg:grid lg:grid-cols-2 lg:gap-4">
      <div v-for="section in category.sections" :key="section.title">
        <SectionBanner :section="section" />
        <!-- <SectionItems :items="section.items" /> -->
      </div>
    </section>
  </main>
</template>
