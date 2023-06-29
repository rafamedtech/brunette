<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const route = useRoute();
const { language, isLoading } = storeToRefs(store);

const changeLanguage = () => {
  isLoading.value = true;
  setTimeout(() => {
    store.$patch({
      language: language.value === 'es' ? 'en' : 'es',
    });
  }, 1000);

  setTimeout(() => {
    store.$patch({
      isLoading: false,
    });
  }, 1000);
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

          <li>
            <!-- :to="{ path: language === 'es' ? '/' : '/en' }" -->
            <NuxtLink to="/" active-class="text-secondary" class="flex items-center gap-2">
              <Icon class="text-xl text-primary" name="gala:brochure" />
              <span>{{ language === 'es' ? 'Menú' : 'Menu' }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'eventos' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:calendar" />
              <span>{{ language === 'es' ? 'Eventos' : 'Events' }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'encuesta' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:editor" />
              <span>{{ language === 'es' ? 'Encuesta' : 'Survey' }}</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'reservar' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:book" />
              <span>{{ language === 'es' ? 'Reservar' : 'Reservation' }}</span></NuxtLink
            >
            <div class="divider"></div>
          </li>
          <!-- <li>
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
          </li> -->
          <li>
            <div>
              <p
                class="opacity-0 transition-all duration-500"
                :class="{
                  'opacity-100 transition-all duration-700':
                    route.path === '/' || route.path === '/en',
                }"
              >
                {{ language === 'es' ? 'Idioma' : 'Language' }}
              </p>
              <button
                class="btn-primary btn h-fit flex-col gap-0 px-2 text-base-100 opacity-0 transition-all duration-500 lg:flex-row lg:gap-2"
                :class="{
                  'opacity-100 transition-all duration-700':
                    route.path === '/' || route.path === '/en',
                }"
                @click="changeLanguage"
              >
                <Icon
                  :name="
                    language === 'es'
                      ? 'emojione-v1:flag-for-mexico'
                      : 'emojione-v1:flag-for-united-states'
                  "
                  class="text-2xl"
                />
                <span class="text-xs">{{ language === 'es' ? 'ESPANOL' : 'ENGLISH' }}</span>
              </button>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
    <div class="divider"></div>

    <div class="w-full lg:w-4/5">
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
              class="dropdown-content menu rounded-box menu-sm z-50 mt-3 w-80 bg-[#f5f5f5] p-2 shadow"
            >
              <!-- <li><img class="mx-auto h-28 w-fit" src="@/assets/images/logo.png" alt="logo" /></li> -->
              <li class="flex w-full flex-row justify-center gap-4 text-5xl active:bg-transparent">
                <NuxtLink to="https://www.facebook.com/brunette.realdelmar" target="_blank">
                  <Icon name="ri:facebook-circle-fill" size="34" />
                </NuxtLink>
                <NuxtLink to="https://www.instagram.com/brunette.realdelmar/" target="_blank">
                  <Icon name="ri:instagram-line" size="34" />
                </NuxtLink>
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
          <button
            class="btn-primary btn h-fit flex-col gap-0 px-2 text-base-100 opacity-0 transition-all duration-500 lg:flex-row lg:gap-2"
            :class="{
              'opacity-100 transition-all duration-700': route.path === '/' || route.path === '/en',
            }"
            @click="changeLanguage"
          >
            <Icon
              :name="
                language === 'es'
                  ? 'emojione-v1:flag-for-mexico'
                  : 'emojione-v1:flag-for-united-states'
              "
              class="text-2xl"
            />
            <span class="text-xs">{{ language === 'es' ? 'ES' : 'EN' }}</span>
          </button>
        </div>
      </div>
      <slot> </slot>
      <BottomNav />
    </div>
    <Transition name="fade-in">
      <div
        v-if="isLoading"
        class="absolute inset-0 z-[99999] grid min-h-screen w-screen place-content-center backdrop-blur-xl"
      >
        <Loader />
      </div>
    </Transition>
  </main>
</template>
