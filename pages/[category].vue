<script setup>
import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

const store = useMainStore();
const { language } = storeToRefs(store);

// const { menu } = useMenu('en');
const menu = computed(() => {
  if (language.value === 'en') {
    return menuEn;
  }
  return menuEs;
});
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
});
</script>

<template>
  <main class="container lg:mt-8">
    <section class="flex items-center pt-4">
      <NuxtLink class="absolute my-auto ml-5 text-primary" to="/">
        <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
      </NuxtLink>
      <h1 class="mx-auto px-2 text-center font-handlee text-4xl text-primary lg:px-32">
        {{ category.title }}
      </h1>
    </section>

    <section
      class="my-4 pb-16 lg:grid lg:gap-4"
      :class="{
        'lg:grid-cols-1': category.sections.length < 2,
        'lg:grid-cols-2': category.sections.length > 1,
      }"
    >
      <div v-for="section in category.sections" :key="section.title">
        <SectionBanner :section="section" />
        <SectionItems :items="section.items" :one-column="category.sections.length <= 1" />
      </div>
    </section>
  </main>
</template>
