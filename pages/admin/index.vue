<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { getReservations, getSurveys } = store;
const { surveys } = storeToRefs(store);

const promises = await Promise.allSettled([getReservations(), getSurveys()]);

// await getReservations();
// await getSurveys();

// const todayReservations = reservations.value.filter(
//   (reservation) => new Date(reservation.date).toDateString() === new Date(Date.now()).toDateString()
// );

const {
  reservations,
  filteredReservations,
  sortedReservations,
  unconfirmedReservations,
  canceledReservations,
  todayReservations,
} = await useReservation();

const unreadSurveys = computed(() => surveys.value.filter((survey) => survey.complete === false));

// console.log(firstWaiter.value);

useHead({
  title: 'Brunette Kitchen & Drinks | Administración',
  meta: [
    {
      name: 'description',
      content: 'Panel de administración.',
    },
    // Facbebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://brunette.com.mx/admin',
    },
    {
      property: 'og:title',
      content: 'Brunette Kitchen & Drinks | Administración',
    },
    {
      property: 'og:description',
      content: 'Panel de administración.',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1675470741/menu/logobackground_qugh9v.png',
    },
  ],
});

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
  // layoutTransition: {
  //   name: 'up',
  //   mode: 'out-in',
  // },
});
</script>

<template>
  <section class="w-full">
    <section class="shadow-pinterest mx-4 mb-8 rounded-3xl">
      <div class="w-full text-center">
        <h2 class="font-handlee text-4xl text-primary">Inicio</h2>
        <div class="divider w-full"></div>
        <div class="mt-0 grid w-full grid-cols-1 place-items-center gap-0 p-4">
          <NuxtLink :to="{ path: '/admin/reservaciones' }" class="card-body grid w-full pt-0">
            <h3 class="text-3xl">Reservaciones</h3>

            <div
              class="background stats stats-vertical mt-4 rounded-2xl shadow-xl shadow-primary/30 lg:stats-horizontal"
            >
              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Total</div>
                <div class="stat-value">{{ sortedReservations.length }}</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Sin confirmar</div>
                <div class="stat-value">{{ unconfirmedReservations }}</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Canceladas</div>
                <div class="stat-value">{{ canceledReservations }}</div>
              </div>
              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Para hoy</div>
                <div class="stat-value">{{ todayReservations }}</div>
              </div>
            </div>
          </NuxtLink>
          <div class="divider w-full"></div>
          <NuxtLink :to="{ path: '/admin/encuestas' }" class="card-body mb-10 w-full pt-0 lg:mb-0">
            <h3 class="text-3xl">Encuestas</h3>
            <div class="background mx-auto mt-8 rounded-2xl shadow-xl shadow-primary/30 lg:stats">
              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Total</div>
                <div class="stat-value">{{ surveys.length }}</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Sin leer</div>
                <div class="stat-value">{{ unreadSurveys.length }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="divider"></div>
      </div>
    </section>
  </section>
</template>
