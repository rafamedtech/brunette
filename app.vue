<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { modal, language, eventModal } = storeToRefs(store);

const lang = computed(() => (language.value ? language.value : 'es'));

useHead({ htmlAttrs: { lang } });
</script>

<template>
  <section class="relative min-h-screen overflow-x-hidden bg-base-100">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Modal v-if="modal" />
    <EventModal v-if="eventModal" />
  </section>
</template>
