<script setup>
import { useMainStore } from '@/stores/menu';

const props = defineProps({
  reservation: {
    type: Object,
    required: true,
  },
});

const store = useMainStore();
const supabase = useSupabaseClient();

// Reservations handling
const { getReservations } = store;

// Status icon
const statusIcon = computed(() => {
  if (props.reservation.status === 'Accepted') {
    return 'ri:checkbox-circle-line';
  }

  if (props.reservation.status === 'Cancelado') {
    return 'ri:indeterminate-circle-line';
  }

  return 'ri:error-warning-line';
});

// Accept reservation
const { getMessage, getSuggestion } = useGetMessage();

async function changeStatus(reservation) {
  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'Accepted' })
      .eq('id', reservation.id);

    reservation.status = 'Accepted';

    setTimeout(() => {
      showDropdown();
    }, 50);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

// cancel reservation
async function cancelReservation(reservation) {
  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'Cancelada' })
      .eq('id', reservation.id);

    reservation.status = 'Cancelada';

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

// Delete current reservation
async function deleteReservation(reservation) {
  try {
    const { error } = await supabase.from('reservations').delete().eq('id', reservation.id);

    await getReservations();

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div
    class="relative flex w-full flex-col gap-2 rounded-xl p-4 shadow-pinterest"
    :class="{
      'bg-primary ': new Date(reservation.date).getDate() === new Date(Date.now()).getDate(),
    }"
  >
    <div class="tooltip tooltip-secondary absolute right-4 top-4" :data-tip="reservation.status">
      <Icon
        :name="statusIcon"
        class="cursor-pointer text-3xl hover:font-bold"
        :class="{
          'text-green-500': reservation.status === 'Aceptada',
          'text-red-500': reservation.status === 'Cancelada',
        }"
      />
    </div>
    <section class="flex">
      <div class="basis-1/3 text-black">
        <p>Fecha</p>
        <p>Hora</p>
        <p>Nombre</p>
        <p>Teléfono</p>
        <p>Personas</p>
      </div>
      <div
        class="basis-2/3 text-primary"
        :class="{
          'text-white ': new Date(reservation.date).getDate() === new Date(Date.now()).getDate(),
        }"
      >
        <p>
          {{
            new Date(reservation.date).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'long',
            })
          }}
        </p>
        <p>{{ useTime(reservation.time) }}</p>
        <p>{{ reservation.name }}</p>
        <p>{{ reservation.phone }}</p>
        <p>{{ reservation.qty }}</p>
      </div>
    </section>
    <section class="w-full">
      <ul
        class="rounded-box grid w-full grid-cols-2 place-items-center gap-4 bg-base-100 p-4 text-base shadow"
      >
        <li>
          <NuxtLink
            :to="getMessage(reservation)"
            class="flex w-full justify-around"
            @click="changeStatus(reservation)"
          >
            <span>Aceptar</span>
            <Icon
              name="ri:checkbox-circle-line"
              class="cursor-pointer text-2xl text-green-500 hover:font-bold"
              :class="{ 'text-green-500': reservation.status === 'Aceptada' }"
            />
          </NuxtLink>
        </li>
        <li>
          <div class="flex w-full justify-around" @click="cancelReservation(reservation)">
            <span>Cancelar</span>
            <Icon
              name="ri:indeterminate-circle-line"
              class="cursor-pointer text-2xl text-red-500 hover:font-bold"
            />
          </div>
        </li>
        <li>
          <NuxtLink
            :to="getSuggestion(reservation)"
            target="_blank"
            class="flex w-full justify-between"
          >
            <span>Sugerir</span>
            <Icon
              name="ri:question-line"
              class="cursor-pointer text-2xl text-yellow-500 hover:font-bold"
            />
          </NuxtLink>
        </li>
        <li>
          <div class="flex w-full justify-around" @click="deleteReservation(reservation)">
            <span>Eliminar</span>
            <Icon
              name="ri:delete-bin-5-line"
              class="cursor-pointer text-2xl text-black hover:font-bold"
            />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
