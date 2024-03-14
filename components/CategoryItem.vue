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
  <NuxtLink
    :to="{
      path: $route.path.includes('/admin')
        ? `/admin/menu/categorias/${category.id}`
        : `/${category.slug}`,
    }"
    class="relative h-fit w-full text-center"
  >
    <section
      class="rounded-b-box absolute bottom-0 z-10 flex h-1/3 w-full items-center bg-gradient-to-t from-black to-transparent pl-4"
    >
      <span class="font-montserrat text-3xl text-base-100 lg:text-3xl">{{ category.title }}</span>
    </section>
    <figure class="card h-44 shadow-xl md:h-[25rem] lg:h-56">
      <NuxtImg
        :src="category.cover"
        densities="x1 x2"
        format="webp"
        quality="80"
        preload
        loading="lazy"
        class="rounded-box h-full w-full object-cover object-center brightness-75"
      />
    </figure>
  </NuxtLink>
</template>
