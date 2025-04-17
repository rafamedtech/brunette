<script lang="ts" setup>
interface Category {
  id: number;
  slug: string;
  title: string;
  cover?: string;
}

interface Props {
  category: Category;
}

defineProps<Props>();
</script>

<template>
  <div class="relative mx-auto h-fit w-full text-center">
    <section class="card flex h-32 w-full items-center justify-center bg-primary pl-4">
      <span class="font-montserrat text-3xl font-bold uppercase text-base-100 lg:text-3xl">{{ category.title }}</span>
    </section>
    <figure class="card hidden h-32 w-full bg-primary shadow-xl">
      <!-- <NuxtImg
        :src="category.cover"
        densities="x1 x2"
        format="webp"
        quality="80"
        preload
        loading="lazy"
        class="rounded-box h-full w-full object-cover object-center brightness-75"
      /> -->
    </figure>
  </div>
</template>
