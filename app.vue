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
  <section class="relative min-h-screen overflow-x-hidden bg-base-100">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Modal v-if="modal" />
    <!-- <div
      v-if="isLoading"
      class="absolute inset-0 z-[99999] min-h-screen w-screen pt-96 backdrop-blur-xl"
    >
      <Loader />
    </div> -->
  </section>
</template>
