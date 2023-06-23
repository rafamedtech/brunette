<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
// await store.fetchCategories();

const { modal, language, isLoading } = storeToRefs(store);
const lang = computed(() => (language.value ? language.value : 'es'));

useHead({ htmlAttrs: { lang } });
</script>

<template>
  <section class="relative min-h-screen overflow-x-hidden bg-[#F5F5F5]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Modal v-if="modal" />

    <Loader v-if="isLoading" />
  </section>
</template>
