<script setup>
import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';
import events from '@/data/events.json';

const store = useMainStore();
// const { events } = storeToRefs(store);

// useHead({
//   title: 'Eventos',
//   meta: [
//     {
//       name: 'description',
//       content: 'Nuestros eventos mas recientes',
//     },
//   ],
// });

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
    <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" />

    <section class="mt-8">
      <div class="mb-20 w-full text-center lg:mb-0">
        <h2 class="text-2xl">Configuración de Eventos</h2>
        <div class="mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
          <div v-for="event in events" :key="event.id" class="flex flex-col gap-4 rounded-xl">
            <h4 class="text-2xl text-primary">{{ event.title }}</h4>
            <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
            <!-- <span>Date</span> -->
          </div>
        </div>
      </div>
    </section>
    <!-- <BottomNav /> -->
  </section>
</template>
