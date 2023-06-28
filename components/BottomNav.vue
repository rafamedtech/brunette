<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { language } = storeToRefs(store);
</script>

<template>
  <div class="flex w-screen justify-center lg:hidden">
    <ul
      class="menu rounded-box menu-horizontal fixed bottom-2 z-40 mx-auto gap-3 bg-primary/75 px-4 py-2 text-base-100"
    >
      <li class="w-fit justify-center" key="1">
        <NuxtLink
          :to="language === 'es' ? '/' : '/en'"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:home-3-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Inicio' : 'Home' }}</span>
        </NuxtLink>
      </li>
      <li class="w-fit justify-center" key="2">
        <NuxtLink
          :to="{ name: 'eventos' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:calendar-todo-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Eventos' : 'Events' }}</span>
        </NuxtLink>
      </li>
      <li class="w-fit justify-center" key="3">
        <NuxtLink
          :to="{ name: 'encuesta' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:survey-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Encuesta' : 'Survey' }}</span>
        </NuxtLink>
      </li>
      <li class="w-fit justify-center" key="4">
        <NuxtLink
          :to="{ name: 'reservar' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:health-book-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Reservar' : 'Reservation' }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
