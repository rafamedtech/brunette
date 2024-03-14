<script setup>
import logo from '@/assets/images/logo-new.svg';

const store = useMainStore();
const route = useRoute();
const { language, isLoading } = storeToRefs(store);

const dropdown = ref(false);

const changeLanguage = () => {
  isLoading.value = true;
  setTimeout(() => {
    store.$patch({
      language: language.value === 'es' ? 'en' : 'es',
    });
  }, 1000);

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <main class="container flex w-full justify-center lg:px-4">
    <div class="hidden justify-between pt-8 lg:flex lg:w-1/5">
      <Transition name="up" appear>
        <ul class="fixed flex w-fit flex-col gap-4">
          <li>
            <figure class="text-2xl text-neutral-content">
              <img class="h-20 invert" :src="logo" alt="logo" />
            </figure>
          </li>

          <li>
            <NuxtLink
              to="/"
              active-class="text-primary font-bold underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:brochure" />
              <span>{{ language === 'es' ? 'Menú' : 'Menu' }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'eventos' }"
              active-class="text-primary font-bold underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:calendar" />
              <span>{{ language === 'es' ? 'Eventos' : 'Events' }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'encuesta' }"
              active-class="text-primary font-bold underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:editor" />
              <span>{{ language === 'es' ? 'Encuesta' : 'Survey' }}</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'reservar' }"
              active-class="text-primary font-bold underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:book" />
              <span>{{ language === 'es' ? 'Reservar' : 'Reservation' }}</span></NuxtLink
            >
            <div class="divider"></div>
          </li>

          <li>
            <div class="form-control gap-2">
              <label class="transition-all duration-500">
                {{ language === 'es' ? 'Idioma' : 'Language' }}
              </label>
              <button
                class="btn btn-primary h-fit flex-col gap-0 px-2 normal-case text-base-100 transition-all duration-500 lg:flex-row lg:gap-2"
                @click="changeLanguage"
              >
                <Icon name="heroicons-outline:switch-vertical" class="text-2xl" />
                <span class="text-xs">{{ language === 'es' ? 'Español' : 'English' }}</span>
              </button>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
    <div class="divider"></div>

    <div class="w-full lg:w-4/5">
      <div class="navbar w-full bg-neutral lg:hidden">
        <div class="navbar-start">
          <details class="dropdown transition-all">
            <summary class="btn btn-neutral p-0" @click="() => (dropdown = !dropdown)">
              <Icon
                :name="dropdown ? 'heroicons-outline:x' : 'heroicons-outline:bars-3-bottom-left'"
                size="28"
                class="text-primary"
              />
            </summary>
            <ul
              class="menu dropdown-content rounded-box menu-sm z-50 mt-3 h-fit w-72 border border-base-100/25 bg-neutral p-2 text-base-100 shadow transition-all"
            >
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
                  <h4 class="font-handlee text-2xl uppercase">
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
            <!-- <Sidebar /> -->
          </details>
        </div>
        <div class="navbar-center">
          <figure class="text-2xl text-neutral-content">
            <img class="h-20" :src="logo" alt="logo" />
          </figure>
        </div>
        <div class="navbar-end">
          <button
            class="btn btn-primary h-fit flex-col gap-0 bg-primary/75 px-2 text-base-100 transition-all duration-500 lg:flex-row lg:gap-2"
            :class="{
              'opacity-100 transition-all duration-700': route.path === '/' || route.path === '/en',
            }"
            @click="changeLanguage"
          >
            <Icon name="heroicons-outline:switch-vertical" class="text-2xl" />
            <span class="text-xs normal-case">{{ language === 'es' ? 'English' : 'Español' }}</span>
          </button>
        </div>
      </div>

      <!-- Page content -->

      <slot> </slot>

      <BottomNavbar />
    </div>
    <Transition name="fade-in">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[99999] grid min-h-screen w-screen place-content-center backdrop-blur-xl"
      >
        <Loader />
      </div>
    </Transition>
  </main>
</template>
