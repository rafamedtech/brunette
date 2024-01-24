<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { language } = storeToRefs(store);
</script>

<template>
  <div class="z-50 w-screen min-w-max">
    <label for="my-drawer-3" class="drawer-overlay"></label>
    <ul class="background menu min-h-screen w-full min-w-max overflow-y-auto p-4">
      <!-- Sidebar content here -->
      <li><img class="mx-auto h-28 w-fit" src="@/assets/images/logo.png" alt="logo" /></li>
      <li class="flex w-full flex-row justify-center gap-4 text-5xl active:bg-transparent">
        <NuxtLink to="https://www.facebook.com/brunette.realdelmar" target="_blank"
          ><Icon name="ri:facebook-circle-fill"
        /></NuxtLink>
        <NuxtLink to="https://www.instagram.com/brunette.realdelmar/" target="_blank"
          ><Icon name="ri:instagram-line"
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
      <!-- <span class="mt-20 text-center">Created by Rafamed</span> -->
    </ul>
  </div>
</template>
