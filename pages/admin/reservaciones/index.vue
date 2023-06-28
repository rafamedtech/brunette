<script setup>
import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';

const store = useMainStore();

// Reservations handling
const { getReservations } = store;
await getReservations();

const {
  reservations,
  filteredReservations,
  sortedReservations,
  unconfirmedReservations,
  canceledReservations,
  todayReservations,
} = await useReservation();

// console.log(reservations.value);

const loadReservations = ref(false);
function refreshReservations() {
  loadReservations.value = true;

  setTimeout(async () => {
    loadReservations.value = false;
    await getReservations();
  }, 1000);
}

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
});
</script>

<template>
  <section class="w-full">
    <section class="min-w-full">
      <div class="w-full text-center">
        <h2 class="font-handlee text-4xl text-primary">Reservaciones</h2>

        <div class="mx-auto mt-4 grid h-12 place-items-center rounded-xl">
          <Icon
            class="cursor-pointer text-2xl text-secondary"
            :class="{ 'animate-spin': loadReservations }"
            name="ri:refresh-line"
            @click="refreshReservations"
          />
          <span>Actualizar</span>
        </div>
        <div class="background stats stats-vertical mt-4 shadow-xl lg:stats-horizontal">
          <div class="stat">
            <div class="stat-figure text-secondary"></div>
            <div class="stat-title font-bold text-primary">Total</div>
            <div class="stat-value">{{ reservations.length }}</div>
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

        <!-- Desktop reservations -->
        <ReservationsTable>
          <ReservationRow
            v-for="reservation in reservations"
            :key="reservation.id"
            :reservation="reservation"
          />

          <tr v-if="reservations.length === 0">
            <td>No hay reservaciones</td>
          </tr>
        </ReservationsTable>
      </div>
    </section>

    <!-- Mobile reservations -->
    <div class="mb-20 mt-8 flex flex-col gap-4 p-4 lg:hidden">
      <ReservationCard
        v-for="reservation in reservations"
        :key="reservation"
        :reservation="reservation"
      />
    </div>
  </section>
</template>

<style>
.table tr.active th,
.table tr.active td {
  @apply border-b-primary bg-primary text-white;
}
</style>
