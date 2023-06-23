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
  <main class="container flex w-full justify-center">
    <div class="mt-8 hidden justify-between lg:flex lg:w-1/5">
      <Transition name="up" appear>
        <ul class="fixed flex w-fit flex-col gap-4">
          <li>
            <figure class="text-2xl text-neutral-content">
              <img class="h-20" src="@/assets/images/logo.png" alt="logo" />
            </figure>
          </li>
          <!-- <li>
            <NuxtLink
              :to="{ path: '/admin' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:display" /> <span>Inicio</span>
            </NuxtLink>
          </li> -->
          <li>
            <NuxtLink
              :to="{ path: language === 'es' ? '/' : '/en' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:brochure" /> <span>Menú</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'eventos' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:calendar" />
              <span>Eventos</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'encuesta' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:editor" />
              <span>Encuesta</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'reservar' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:book" />
              <span>Reservar</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="btn-primary btn h-fit flex-col gap-0 px-2 text-base-100 opacity-0 transition-all duration-500 lg:flex-row lg:gap-2"
              :class="{
                'opacity-100 transition-all duration-700':
                  route.path === '/' || route.path === '/en',
              }"
              :to="{ path: route.path === '/' ? '/en' : '/' }"
            >
              <Icon name="clarity:language-solid" class="text-2xl" />
              <span v-if="route.path === '/'" class="text-xs">ENGLISH</span>
              <span v-if="route.path === '/en'" class="text-xs">ESPANOL</span>
            </NuxtLink>
          </li>
        </ul>
      </Transition>
    </div>
    <div class="divider"></div>

    <div class="w-full lg:w-4/5">
      <!-- <section class="background flex items-center px-2 py-4">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn-ghost btn-square btn w-full text-accent">
            <Icon name="charm:menu-hamburger" class="text-3xl" />
          </label>
        </div>

        <img src="@/assets/images/logo.png" alt="" class="mx-auto w-32 lg:hidden" />
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
      </section> -->

      <div class="background navbar w-full bg-base-100 lg:hidden">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn-ghost btn-circle btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-80 bg-base-100 p-2 shadow"
            >
              <!-- <li><img class="mx-auto h-28 w-fit" src="@/assets/images/logo.png" alt="logo" /></li> -->
              <li class="flex w-full flex-row justify-center gap-4 text-5xl active:bg-transparent">
                <NuxtLink to="https://www.facebook.com/brunette.realdelmar" target="_blank"
                  ><Icon name="ri:facebook-circle-fill" size="34"
                /></NuxtLink>
                <NuxtLink to="https://www.instagram.com/brunette.realdelmar/" target="_blank"
                  ><Icon name="ri:instagram-line" size="34"
                /></NuxtLink>
              </li>
              <li><p class="mx-auto text-center font-bold text-primary">(664) 974 6842</p></li>
              <li>
                <div class="flex flex-col text-center">
                  <h4 class="font-handlee text-2xl uppercase text-black">
                    {{ language === 'es' ? 'Horario' : 'Opening hours' }}
                  </h4>
                  <article>
                    <p class="text-lg font-bold uppercase text-primary">
                      {{ language === 'es' ? 'Lunes - Martes' : 'Monday - Tuesday' }}
                    </p>
                    <span>{{ language === 'es' ? 'CERRADO' : 'CLOSED' }}</span>
                  </article>
                  <article>
                    <p class="text-lg font-bold uppercase text-primary">
                      {{ language === 'es' ? 'Miercoles - Jueves' : 'Wednesday - Thursday' }}
                    </p>
                    <span>9:00 AM - 10:00 PM</span>
                  </article>
                  <article>
                    <p class="text-lg font-bold uppercase text-primary">
                      {{ language === 'es' ? 'Viernes - Sabado' : 'Friday - Saturday' }}
                    </p>
                    <span>9:00 AM - 12:00 AM</span>
                  </article>
                  <article>
                    <p class="text-lg font-bold uppercase text-primary">
                      {{ language === 'es' ? 'Domingo' : 'Sunday' }}
                    </p>
                    <span>8:00 AM - 8:00 PM</span>
                  </article>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <figure class="text-2xl text-neutral-content">
            <img class="h-20" src="@/assets/images/logo.png" alt="logo" />
          </figure>
        </div>
        <div class="navbar-end">
          <NuxtLink
            class="btn-primary btn h-fit flex-col gap-0 px-2 text-base-100 opacity-0 transition-all duration-500 lg:flex-row lg:gap-2"
            :class="{
              'opacity-100 transition-all duration-700': route.path === '/' || route.path === '/en',
            }"
            :to="{ path: route.path === '/' ? '/en' : '/' }"
          >
            <Icon name="clarity:language-solid" class="text-2xl" />
            <span v-if="route.path === '/'" class="text-xs">EN</span>
            <span v-if="route.path === '/en'" class="text-xs">ES</span>
          </NuxtLink>
        </div>
      </div>
      <slot> </slot>
      <BottomNav />
      <!-- <Sidebar /> -->
    </div>
  </main>
</template>
