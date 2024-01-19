<script setup>
const store = useMainStore();
const { language } = storeToRefs(store);

const navItems = [
  {
    name: {
      es: 'Menú',
      en: 'Menu',
    },
    icon: 'gala:brochure',
    to: '/',
  },
  {
    name: {
      es: 'Eventos',
      en: 'Events',
    },
    icon: 'ri:calendar-todo-fill',
    to: '/eventos',
  },
  {
    name: {
      es: 'Encuesta',
      en: 'Survey',
    },
    icon: 'ri:survey-fill',
    to: '/encuesta',
  },
  {
    name: {
      es: 'Reservar',
      en: 'Reservation',
    },
    icon: 'ri:health-book-fill',
    to: '/reservar',
  },
];
</script>

<template>
  <div class="flex w-screen justify-center lg:hidden">
    <ul
      class="menu rounded-box menu-horizontal fixed bottom-2 z-40 mx-auto gap-3 bg-neutral px-4 py-2"
    >
      <li v-for="{ name, icon, to } in navItems" class="w-fit justify-center" :key="name">
        <NuxtLink
          :to="to"
          active-class="active:text-red-500 focus:text-base-100"
          class="flex flex-col items-center justify-between gap-0 p-0 text-base-100 hover:text-primary focus:text-base-100 active:text-base-100"
        >
          <Icon :name="icon" class="text-xl text-primary" />
          <span>{{ language === 'es' ? name.es : name.en }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
