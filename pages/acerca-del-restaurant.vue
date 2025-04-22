<script setup lang="ts">
import mainCover from '@/assets/images/brunette-portada.jpg';
import { restInfo } from '@/utils/restInfo';

useSeoMeta({
  title: 'Brunette Kitchen & Drinks',
  description: 'Conoce nuestros deliciosos platillos y mixología.',
  ogTitle: 'Brunette Kitchen & Drinks',
  ogImage: 'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
});
</script>

<template>
  <main class="p-4">
    <AppHeading title="Acerca del restaurant" />
    <section class="text-dark-strong dark:text-base-100 lg:mt-4">
      <section class="md:mx-auto md:w-1/2">
        <figure class="relative mt-4 w-full rounded-xl">
          <img :src="mainCover" class="h-36 w-full min-w-full rounded-xl object-cover brightness-50 lg:h-52" alt="" />

          <section
            class="absolute bottom-0 z-10 flex h-1/3 w-full flex-col justify-center rounded-b-xl bg-gradient-to-t from-black to-transparent pl-4"
          >
            <p class="font-montserrat text-3xl font-bold text-gray-100">
              {{ restInfo.es.name }}
            </p>
            <p class="pb-8 font-bold text-primary">{{ restInfo.es.description }}</p>
          </section>
        </figure>
        <section class="mt-8 flex justify-center gap-4 text-primary">
          <NuxtLink
            v-for="{ id, name, icon, url } in restInfo.es.socials"
            :key="id"
            :to="url"
            target="_blank"
            class="flex flex-col items-center"
          >
            <Icon :name="icon" size="32" />
            <span class="text-dark-strong dark:text-gray-100">{{ name }}</span>
          </NuxtLink>
        </section>
        <section class="py-8 text-primary">
          <h3 class="font-bold">
            Ubicación:
            <span class="text-dark-strong block font-normal dark:text-gray-100">{{ restInfo.es.address }}</span>
          </h3>
          <h4 class="mt-4 font-bold">
            Teléfono:
            <span class="text-dark-strong block font-normal dark:text-gray-100">{{ restInfo.es.phone }}</span>
          </h4>
        </section>
      </section>

      <section class="my-4 dark:text-gray-100 md:mx-auto md:w-1/2">
        <h3 class="text-xl font-bold text-primary">Horario:</h3>
        <section v-for="{ id, name, time } in restInfo.es.schedule" :key="id" class="flex justify-between gap-4">
          <h4>{{ name }}</h4>
          <span>{{ time }}</span>
        </section>
      </section>
    </section>
  </main>
</template>
