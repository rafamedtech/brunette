<script setup>
const { menu } = useMenu();

const { params } = useRoute();
const category = computed(() => menu.value.find((category) => category.slug === params.category));
// console.log(category.value);

useHead({
  title: `Menú - ${category.value.title}`,
  meta: [
    {
      name: 'description',
      content: `Nuestro menú de ${category.value.title}`,
    },
  ],
});
</script>

<template>
  <main class="container mt-4 lg:mt-8">
    <section class="flex items-center p-2">
      <NuxtLink class="absolute z-10 my-auto ml-2" to="/">
        <Icon name="ri:arrow-left-line" class="font-bold text-base-100" size="43" />
      </NuxtLink>
      <CategoryCover :category="category" />
    </section>

    <section
      class="my-4 grid pb-16 lg:gap-4"
      :class="{
        'md:grid-cols-1': category.sections.length < 2,
        'md:grid-cols-2': category.sections.length > 1,
      }"
    >
      <div v-for="section in category.sections" :key="section.title" class="px-2">
        <SectionBanner :section="section" />
        <SectionItems :items="section.items" :one-column="category.sections.length <= 1" />
      </div>
    </section>
  </main>
</template>
