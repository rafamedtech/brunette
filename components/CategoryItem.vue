<script lang="ts" setup>
export interface Category {
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
      path: `${$route.path === '/' ? '/' : '/en/'}${category.slug}`,
    }"
    class="h-fit w-full text-center"
  >
    <span class="font-handlee text-xl text-primary lg:text-2xl">{{ category.title }}</span>
    <figure class="card h-52 shadow-xl lg:h-80">
      <img
        :src="category.cover"
        class="rounded-box h-full w-full object-cover"
        alt="item picture"
      />
    </figure>
  </NuxtLink>
</template>
