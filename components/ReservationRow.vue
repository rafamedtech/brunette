<script setup>
import { useMainStore } from '@/stores/menu';

const store = useMainStore();
const supabase = useSupabaseClient();

const props = defineProps({
  reservation: {
    type: Object,
    required: true,
  },
});

// Reservations handling
const { getReservations } = store;

// Status icon
const statusIcon = computed(() => {
  if (props.reservation.status === 'Aceptada') {
    return 'ri:checkbox-circle-line';
  }

  if (props.reservation.status === 'Cancelada') {
    return 'ri:indeterminate-circle-line';
  }

  return 'ri:error-warning-line';
});

// Hide dropdown on click
const dropdown = ref(false);
function showDropdown() {
  dropdown.value = !dropdown.value;
}

// Accept reservation
const { getMessage, getSuggestion } = useGetMessage();

async function changeStatus(reservation) {
  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'Aceptada' })
      .eq('id', reservation.id);

    showDropdown();

    reservation.status = 'Aceptada';

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

    showDropdown();

    reservation.status = 'Cancelada';

    setTimeout(() => {
      showDropdown();
    }, 50);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

// Delete current reservation
async function deleteReservation(reservation) {
  showDropdown();
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
  <tr
    class="text-center"
    :class="{
      'font-bold text-primary':
        new Date(reservation.date).getDate() === new Date(Date.now()).getDate(),
      ' text-red-500': reservation.status === 'Cancelada',
    }"
  >
    <td>
      {{
        new Date(reservation.date).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
        })
      }}
    </td>
    <td>
      {{ useTime(reservation.time) }}
    </td>
    <td>
      {{ reservation.name }}
    </td>
    <td>
      {{ reservation.phone }}
    </td>
    <td>
      {{ reservation.qty }}
    </td>

    <td class="flex items-center gap-4 text-2xl">
      <div class="tooltip tooltip-primary" :data-tip="reservation.status">
        <Icon
          :name="statusIcon"
          class="cursor-pointer hover:font-bold"
          :class="{
            'text-green-500': reservation.status === 'Aceptada',
            'text-red-500': reservation.status === 'Cancelada',
          }"
        />
      </div>

      <div class="dropdown-end dropdown font-normal text-black">
        <label tabindex="0" class="cursor-pointer"><Icon name="mdi:dots-vertical" /></label>
        <ul
          tabindex="0"
          :class="{ hidden: dropdown }"
          class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base shadow"
        >
          <li>
            <NuxtLink
              :to="getMessage(reservation)"
              target="_blank"
              class="flex w-full justify-between"
              @click="changeStatus(reservation)"
            >
              <span>Aceptar</span>
              <Icon
                name="ri:checkbox-circle-line"
                class="cursor-pointer text-2xl text-green-500 hover:font-bold"
              />
            </NuxtLink>
          </li>
          <li>
            <div class="flex w-full justify-between" @click="cancelReservation(reservation)">
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
            <div class="flex w-full justify-between" @click="deleteReservation(reservation)">
              <span>Eliminar</span>
              <Icon
                name="ri:delete-bin-5-line"
                class="cursor-pointer text-2xl text-black hover:font-bold"
              />
            </div>
          </li>
        </ul>
      </div>
    </td>
    <!-- </tr> -->
  </tr>
</template>
