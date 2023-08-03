<script lang="ts" setup>
export interface Category {
  id: number;
  slug: string;
  title: string;
  cover?: string;
}

export interface Props {
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
    class="h-fit w-full text-center"
  >
    <span class="font-handlee text-2xl lg:text-3xl">{{ category.title }}</span>
    <figure class="card h-52 shadow-xl lg:h-80">
      <nuxt-img
        :src="category.cover"
        densities="x1 x2"
        format="webp"
        quality="80"
        preload
        loading="lazy"
        class="rounded-box h-full w-full object-cover"
      />

      <!-- alt="item picture" -->
      <!-- <img
        :src="category.cover"
        class="rounded-box h-full w-full object-cover"
        alt="item picture"
      /> -->
    </figure>
  </NuxtLink>
</template>
