<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import events from '@/data/events.json';

const store = useMainStore();
const { language } = storeToRefs(store);

const title = computed(() => `Brunette Kitchen & Drinks | ${language.value === 'es' ? 'Eventos' : 'Events'} 📅`);
const content = computed(() => (language.value === 'es' ? 'Nuestros eventos más recientes' : 'Our latest events'));

useHead({
  title,
  meta: [
    {
      name: 'description',
      content,
    },
    // Facbebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://brunette.com.mx/eventos',
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content,
    },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
    },
  ],
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
});
</script>

<template>
  <main class="mt-4 pb-16 lg:mt-8">
    <section class="container mt-4 flex items-center">
      <h1
        class="mx-auto w-fit border-b-4 border-primary px-2 text-center font-montserrat text-4xl font-semibold uppercase lg:px-32 lg:text-3xl"
      >
        {{ language === 'es' ? 'Eventos' : 'Events' }}
      </h1>
    </section>

    <!-- <div class="container hero-content w-full flex-col items-center justify-center pt-4 text-center lg:flex-row">
      <p class="text-center text-xl text-black">
        {{ language === 'es' ? 'Conoce los próximos eventos' : 'Find the next events' }}
      </p>
    </div> -->

    <section class="w-full pb-4 pt-8">
      <div class="container rounded-box hidden gap-8 bg-base-100 p-4 pb-8 md:grid md:grid-cols-2">
        <div v-for="{ id, title, cover } in events" :key="id" class="w-full flex-col p-4 lg:px-0">
          <h2 class="text-center text-2xl text-primary">{{ title }}</h2>
          <img class="mt-4 h-[40rem] w-full rounded-2xl shadow-md md:max-w-full md:object-cover" :src="cover" alt="" />
        </div>
      </div>

      <div class="carousel carousel-center mx-auto w-screen max-w-md md:hidden">
        <div
          v-for="{ id, title, cover } in events"
          :key="id"
          class="carousel-item relative min-h-full w-80 flex-col p-2"
        >
          <h2 class="text-center text-2xl text-primary">{{ title }}</h2>
          <nuxt-img
            :src="cover"
            densities="x1 x2"
            format="webp"
            quality="80"
            loading="lazy"
            class="mt-4 h-full w-full rounded-2xl object-cover md:mx-auto md:h-96 md:w-96"
          />
        </div>
      </div>
    </section>
  </main>
</template>
