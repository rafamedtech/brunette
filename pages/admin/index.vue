<script setup>
const store = useMainStore();
const { getReservations, getSurveys } = store;
const { surveys } = storeToRefs(store);

const promises = await Promise.allSettled([getReservations(), getSurveys()]);

// await getReservations();
// await getSurveys();

// const todayReservations = reservations.value.filter(
//   (reservation) => new Date(reservation.date).toDateString() === new Date(Date.now()).toDateString()
// );

const { sortedReservations, unconfirmedReservations, canceledReservations, todayReservations } =
  await useReservation();

const unreadSurveys = computed(() => surveys.value.filter((survey) => survey.complete === false));

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
    <AdminPageTitle> Inicio </AdminPageTitle>
    <section class="mx-4 mb-8 rounded-3xl">
      <div class="w-full text-center">
        <div class="mt-0 grid w-full grid-cols-1 place-items-center gap-0 rounded-xl">
          <NuxtLink :to="{ path: '/admin/reservaciones' }" class="card-body grid w-full p-2 pt-0">
            <h3 class="text-3xl">Reservaciones</h3>

            <div class="grid grid-cols-2 place-content-center gap-4 lg:grid-cols-4">
              <div
                class="background stat items-center justify-center gap-0 rounded-xl bg-base-100 text-center shadow-xl"
              >
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Total</div>
                <div class="stat-value">{{ sortedReservations.length }}</div>
              </div>

              <div
                class="background stat items-center justify-center gap-0 rounded-xl bg-base-100 text-center shadow-xl"
              >
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Sin confirmar</div>
                <div class="stat-value">{{ unconfirmedReservations }}</div>
              </div>

              <div
                class="background stat items-center justify-center gap-0 rounded-xl bg-base-100 text-center shadow-xl"
              >
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Canceladas</div>
                <div class="stat-value">{{ canceledReservations }}</div>
              </div>
              <div
                class="background stat items-center justify-center gap-0 rounded-xl bg-base-100 text-center shadow-xl"
              >
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Para hoy</div>
                <div class="stat-value">{{ todayReservations }}</div>
              </div>
            </div>
          </NuxtLink>

          <div class="divider"></div>

          <NuxtLink
            :to="{ path: '/admin/encuestas' }"
            class="card-body mb-10 w-full p-2 pt-0 lg:mb-0"
          >
            <h3 class="text-3xl">Encuestas</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="background stat rounded-xl shadow-xl">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title font-bold text-primary">Total</div>
                <div class="stat-value">{{ surveys.length }}</div>
              </div>

              <div class="indicator w-full">
                <span
                  class="badge badge-secondary indicator-item"
                  v-if="unreadSurveys.length > 0"
                ></span>
                <div class="background stat rounded-xl shadow-xl">
                  <div class="stat-figure text-secondary"></div>
                  <div class="stat-title font-bold text-primary">Sin leer</div>
                  <div class="stat-value">{{ unreadSurveys.length }}</div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </section>
</template>
