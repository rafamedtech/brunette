<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { language } = storeToRefs(store);
</script>

<template>
  <div class="flex w-screen justify-center lg:hidden">
    <div class="btm-nav z-40 bg-primary shadow-pinterest">
      <nuxt-link :to="{ path: '/admin' }" active-class="active border-primary">
        <!-- class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary" -->
        <Icon name="gala:display" class="text-xl text-white" />
        <span class="btm-nav-label text-xs">{{ language === 'es' ? 'Inicio' : 'Home' }}</span>
      </nuxt-link>
      <nuxt-link :to="{ path: '/admin/menu' }" active-class="active border-primary">
        <!-- class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary" -->
        <Icon name="gala:brochure" class="text-xl text-white" />
        <span class="btm-nav-label text-xs">{{ language === 'es' ? 'Menu' : 'Menu' }}</span>
      </nuxt-link>
      <nuxt-link :to="{ path: '/admin/eventos' }" active-class="active border-primary">
        <!-- class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary" -->
        <Icon name="gala:calendar" class="text-xl text-white" />
        <span class="btm-nav-label text-xs">{{ language === 'es' ? 'Eventos' : 'Events' }}</span>
      </nuxt-link>
      <nuxt-link :to="{ path: '/admin/encuestas' }" active-class="active border-primary">
        <!-- class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary" -->
        <Icon name="gala:editor" class="text-xl text-white" />
        <span class="btm-nav-label text-xs">{{ language === 'es' ? 'Encuestas' : 'Survey' }}</span>
      </nuxt-link>
      <nuxt-link :to="{ path: '/admin/reservaciones' }" active-class="active border-primary">
        <!-- class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary" -->
        <Icon name="gala:book" class="text-xl text-white" />
        <span class="btm-nav-label text-xs">{{
          language === 'es' ? 'Reserv' : 'Reservation'
        }}</span>
      </nuxt-link>
    </div>
    <!-- <ul
      class="menu rounded-box menu-horizontal fixed bottom-2 mx-auto hidden gap-3 bg-primary/75 px-4 py-2 text-base-100"
    >
      <li class="w-fit justify-center" key="1">
        <nuxt-link
          :to="{ path: '/admin' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:home-3-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Inicio' : 'Home' }}</span>
        </nuxt-link>
      </li>
      <li class="w-fit justify-center" key="2">
        <nuxt-link
          :to="{ path: '/admin/eventos' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:calendar-todo-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Eventos' : 'Events' }}</span>
        </nuxt-link>
      </li>
      <li class="w-fit justify-center" key="3">
        <nuxt-link
          :to="{ path: '/admin/encuestas' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:survey-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Encuestas' : 'Survey' }}</span>
        </nuxt-link>
      </li>
      <li class="w-fit justify-center" key="4">
        <nuxt-link
          :to="{ path: '/admin/reservaciones' }"
          active-class="text-black underline"
          class="flex flex-col items-center justify-between gap-0 p-0 focus:bg-transparent active:text-primary"
        >
          <Icon name="ri:health-book-fill" class="text-xl" />
          <span>{{ language === 'es' ? 'Reservaciones' : 'Reservation' }}</span>
        </nuxt-link>
      </li>
      
    </ul> -->
  </div>
</template>

<!-- @PopDoc
  ### AdminBottomNav
  This is a component used only on the `admin-layout` layout when the device is a mobile

  ### Props
  - There are no props for this component

  ### Examples
  ```vue
  <template>
    <div>Test</div>
  </template>
  ```

 -->
