<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

const { events } = await useEvents();

onMounted(() => {
  isLoading.value = false;
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
});
</script>

<template>
  <section class="w-full">
    <AdminPageTitle> Administrar eventos </AdminPageTitle>
    <section>
      <div class="mb-24 w-full text-center lg:mb-8">
        <NuxtLink class="btn-primary btn mt-4" to="/admin/eventos/nuevo"> Agregar evento </NuxtLink>

        <div v-if="isLoading" class="mt-32">
          <Loader />
        </div>
        <div v-else class="mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
          <div
            v-for="event in events"
            :key="event.id"
            class="relative flex flex-col gap-4 rounded-xl"
          >
            <NuxtLink class="absolute right-0 cursor-pointer" :to="`/admin/eventos/${event.id}`">
              <Icon name="solar:pen-outline" size="28" class="text-secondary" />
            </NuxtLink>
            <h4 class="text-2xl">{{ event.title }}</h4>
            <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
