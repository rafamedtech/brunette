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
    class="relative flex h-52 w-full items-center justify-center rounded-xl text-center shadow-xl"
  >
    <img
      :src="category.cover"
      class="rounded-box absolute inset-0 h-full w-full object-cover brightness-50 transition-all"
      alt="item picture"
    />

    <NuxtLink
      class="btn-primary btn-circle btn absolute -right-2 -top-2 cursor-pointer text-white"
      :to="`/admin/menu/categorias/${category.id}/editar`"
    >
      <Icon name="solar:pen-outline" size="28" />
    </NuxtLink>
    <span class="z-[99] font-handlee text-3xl text-white">{{ category.title }}</span>
  </NuxtLink>
</template>
