<script setup>
// Current category and sections
const { menu } = useMenu('en');
const { params } = useRoute();
const category = menu.value.find((category) => category.slug === params.category);

useHead({
  title: `Menu - ${category.title}`,
  meta: [
    {
      name: 'description',
      content: `Our ${category.title} menu`,
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
  <main class="container">
    <section class="flex items-center pt-4">
      <button class="absolute my-auto ml-5 text-primary" @click="$router.back()">
        <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-accent" />
      </button>
      <h1 class="mx-auto px-2 text-center font-handlee text-3xl text-primary lg:px-32">
        {{ category.title }}
      </h1>
    </section>

    <section class="my-4 pb-16 lg:grid lg:grid-cols-2 lg:gap-8">
      <div v-for="section in category.sections" :key="section.title">
        <SectionBanner :section="section" />
        <SectionItems :items="section.items" />
      </div>
    </section>
  </main>
</template>
