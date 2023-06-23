<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const route = useRoute();
const { language } = storeToRefs(store);

const changeLanguage = () => {
  store.$patch({
    isLoading: true,
    language: language.value === 'es' ? 'en' : 'es',
  });

  setTimeout(() => {
    store.$patch({
      isLoading: false,
    });
  }, 1500);
};
</script>

<template>
  <section class="drawer relative h-full min-h-screen">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle max-h-0" />
    <div class="drawer-content flex flex-col overflow-x-hidden">
      <!-- Navbar -->

      <nav class="background navbar w-full justify-between bg-transparent lg:px-32">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn-ghost btn-square btn text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <!-- Logo -->
        <figure class="text-2xl text-neutral-content">
          <img class="h-20" src="@/assets/images/logo.png" alt="logo" />
        </figure>

        <section>
          <!-- Desktop navbar -->

          <NuxtLink
            class="btn-secondary btn h-fit flex-col gap-0 px-2 text-base-100 opacity-0 transition-all duration-500 lg:flex-row lg:gap-2"
            :class="{
              'opacity-100 transition-all duration-700': route.path === '/' || route.path === '/en',
            }"
            :to="{ path: route.path === '/' ? '/en' : '/' }"
          >
            <Icon name="clarity:language-solid" class="text-2xl" />
            <span v-if="route.path === '/'" class="text-xs">EN</span>
            <span v-if="route.path === '/en'" class="text-xs">ES</span>
          </NuxtLink>

          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              <li>
                <nuxt-link :to="{ path: route.path === '/' ? '/' : '/en' }">Menu</nuxt-link>
              </li>
              <li><nuxt-link :to="{ name: 'eventos' }">Eventos</nuxt-link></li>
              <li><nuxt-link :to="{ name: 'encuesta' }">Encuesta</nuxt-link></li>
              <li><nuxt-link :to="{ name: 'reservar' }">Reservación</nuxt-link></li>
            </ul>
          </div>
        </section>
      </nav>

      <!-- Page content  -->
      <slot></slot>
    </div>
    <!-- Mobile Sidebar -->
    <Sidebar />
  </section>
</template>
