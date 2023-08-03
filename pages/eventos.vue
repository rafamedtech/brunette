<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import events from '@/data/events.json';

const store = useMainStore();
const { language } = storeToRefs(store);
// const { events, language } = storeToRefs(store);

const title = computed(
  () => `Brunette Kitchen & Drinks | ${language.value === 'es' ? 'Eventos' : 'Events'} 📅`
);
const content = computed(() =>
  language.value === 'es' ? 'Nuestros eventos más recientes' : 'Our latest events'
);

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
      content:
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1675470741/menu/logobackground_qugh9v.png',
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
      <button class="absolute my-auto ml-5 text-primary" @click="$router.back()">
        <i class="fa-solid fa-arrow-left-long text-3xl"></i>
      </button>
      <h1 class="mx-auto px-2 text-center font-handlee text-4xl text-primary lg:px-32">
        {{ language === 'es' ? 'Eventos' : 'Events' }}
      </h1>
    </section>
    <div class="divider mx-auto w-1/2"></div>
    <div
      class="container hero-content w-full flex-col items-center justify-center text-center lg:flex-row"
    >
      <p class="text-center text-2xl text-black">
        {{ language === 'es' ? 'Conoce los próximos eventos' : 'Find the next events' }}
      </p>
    </div>

    <section class="mb-8 w-full">
      <div
        class="container rounded-box hidden gap-8 bg-[#ffffff] p-4 pb-8 shadow-pinterest lg:grid lg:grid-cols-2"
      >
        <div
          v-for="{ id, title, cover } in events"
          :key="id"
          class="carousel-item w-full flex-col p-4 lg:px-0"
        >
          <h2 class="text-center text-2xl uppercase text-primary">{{ title }}</h2>
          <!-- <img class="h-[40rem] rounded-2xl md:mx-auto md:object-cover" :src="cover" alt="" /> -->
          <nuxt-img
            :src="cover"
            densities="x1 x2"
            format="webp"
            quality="80"
            loading="lazy"
            class="h-[40rem] rounded-2xl md:mx-auto md:object-cover"
          />
        </div>
      </div>
      <div class="carousel-center carousel mx-auto w-screen max-w-md lg:hidden">
        <div
          v-for="(event, index) in events"
          :key="event.id"
          :id="`slide${index + 1}`"
          class="carousel-item relative w-80 flex-col p-2"
        >
          <h2 class="text-center text-2xl uppercase text-primary">{{ event.title }}</h2>
          <!-- <img
            class="w-full rounded-2xl md:mx-auto md:h-96 md:w-96 md:object-cover"
            :src="event.cover"
            alt=""
          /> -->
          <nuxt-img
            :src="event.cover"
            densities="x1 x2"
            format="webp"
            quality="80"
            loading="lazy"
            class="w-full rounded-2xl md:mx-auto md:h-96 md:w-96 md:object-cover"
          />
          <div
            class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
          >
            <a :href="index === 0 ? '#' : `#slide${index}`" class="btn-secondary btn-circle btn"
              >❮</a
            >
            <a
              :href="index + 1 === events.length ? '#' : `#slide${index + 2}`"
              class="btn-secondary btn-circle btn"
              >❯</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
