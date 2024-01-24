<script setup>
import { useVuelidate } from '@vuelidate/core';
import VueDatepickerUi from 'vue-datepicker-ui';
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import colors from 'tailwindcss/colors';
import { Resend } from 'resend';

const store = useMainStore();
const reservationStore = useReservationStore();
const { language } = storeToRefs(store);
const { reservationRules: rules } = storeToRefs(reservationStore);

const reservationData = reactive({
  date: '',
  time: '12:00',
  name: '',
  phone: '',
  qty: 1,
});

const errorBorder = computed(() => (v$.value.date.$error ? colors.red[500] : colors.gray[300]));
const v$ = useVuelidate(rules, reservationData);

// Confirmation Modal
const confirmationModal = ref(false);
const confirmation = ref(false);
const openModal = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  confirmationModal.value = !confirmationModal.value;
  confirmation.value = true;
};

const supabase = useSupabaseClient();

async function sendReservationSupabase() {
  const resend = new Resend('re_8AG4wH61_Gcwsb5uaEtX9mXUyAphddkHD');
  const dateString = computed(
    () =>
      `${new Date(reservationData.date).getFullYear()}-${new Date(
        reservationData.date
      ).getMonth()}-${new Date(reservationData.date).getDay()}`
  );

  try {
    const { error } = await supabase.from('reservations').insert([reservationData]);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rafamed.tech@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

// Opens the thank you message and sends data to database
const sendReservation = () => {
  confirmation.value = false;
  // Send to database logic here
  sendReservationSupabase();
};

// Close the modal and redirect user to home
const submitReservation = async () => {
  confirmationModal.value = false;
  await navigateTo('/');
};

useHead({
  title: 'Brunette Kitchen & Drinks | Reservar 🗓️',
  meta: [
    {
      name: 'description',
      content: 'Reserva tu fecha especial con nosotros.',
    },
    // Facbebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://brunette.com.mx/reservar',
    },
    {
      property: 'og:title',
      content: 'Brunette Kitchen & Drinks | Reservar 🗓️',
    },
    {
      property: 'og:description',
      content: 'Reserva tu fecha especial con nosotros.',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
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
      <h1 class="mx-auto px-2 text-center font-montserrat text-4xl text-primary lg:px-32">
        {{ language === 'es' ? 'Reservación' : 'Reservation' }}
      </h1>
    </section>

    <div class="divider mx-auto w-1/2"></div>

    <div class="hero-content mx-auto flex-col pt-0 lg:flex-row">
      <p class="text-center text-xl text-black">
        {{ language === 'es' ? 'Asegura tu fecha especial' : 'Save your special date' }}
      </p>
    </div>

    <div class="card mx-auto w-full max-w-sm flex-shrink-0">
      <form
        @submit.prevent
        class="card-body flex flex-col gap-4 rounded-xl bg-base-100 p-0 px-4 pb-4"
      >
        <div class="relative flex flex-col">
          <label class="text-primary" for="">{{ language === 'es' ? 'Fecha' : 'Date' }}</label>
          <VueDatepickerUi
            v-model="reservationData.date"
            lang="es"
            :placeholder="language === 'es' ? 'Selecciona una fecha' : 'Select a date'"
            :class="{ 'border-red-500': v$.date.$error }"
          />
          <Icon
            v-if="v$.date.$error"
            name="heroicons-solid:exclamation"
            class="absolute right-2 h-full text-xl"
            :class="{ 'text-yellow-500': v$.date.$error }"
          />
          <span v-if="v$.date.$error" class="text-red-500">{{ v$.date.$errors[0].$message }}</span>
        </div>

        <div class="flex flex-col">
          <label class="text-primary" for="">{{ language === 'es' ? 'Hora' : 'Time' }}</label>
          <input
            v-model="reservationData.time"
            class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            type="time"
            name=""
            id=""
          />
        </div>

        <div class="relative flex flex-col">
          <label class="text-primary" for="name">{{ language === 'es' ? 'Nombre' : 'Name' }}</label>
          <input
            v-model="reservationData.name"
            type="text"
            placeholder="Ej. Juan Perez"
            class="input input-bordered w-full border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            :class="{ 'border-red-500': v$.name.$error }"
          />
          <Icon
            v-if="v$.name.$error"
            name="heroicons-solid:exclamation"
            class="absolute right-2 h-full text-xl"
            :class="{ 'text-yellow-500': v$.name.$error }"
          />
          <span v-if="v$.name.$error" class="text-red-500">{{ v$.name.$errors[0].$message }}</span>
        </div>

        <div class="relative flex flex-col">
          <label class="text-primary" for="name">{{
            language === 'es' ? 'Teléfono (con Whatsapp)' : 'Phone (Whatsapp needed)'
          }}</label>
          <input
            v-model="reservationData.phone"
            type="number"
            placeholder="Ej 6641234567"
            class="input input-bordered w-full border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            :class="{ 'border-red-500': v$.phone.$error }"
          />
          <Icon
            v-if="v$.phone.$error"
            name="heroicons-solid:exclamation"
            class="absolute right-2 h-full text-xl"
            :class="{ 'text-yellow-500': v$.phone.$error }"
          />
          <span v-if="v$.phone.$error" class="text-red-500">{{
            v$.phone.$errors[0].$message
          }}</span>
        </div>

        <div class="relative flex flex-col">
          <label class="text-primary" for="name">{{
            language === 'es' ? 'Cantidad de personas' : 'Qty of people'
          }}</label>
          <input
            v-model="reservationData.qty"
            type="number"
            class="input input-bordered w-full border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            :class="{ 'border-red-500': v$.qty.$error }"
          />
          <Icon
            v-if="v$.qty.$error"
            name="heroicons-solid:exclamation"
            class="absolute right-2 h-full text-xl"
            :class="{ 'text-yellow-500': v$.qty.$error }"
          />
          <span v-if="v$.qty.$error" class="text-red-500">{{ v$.qty.$errors[0].$message }}</span>
        </div>
        <button @click="openModal" for="my-modal-6" class="btn btn-primary text-base-100">
          {{ language === 'es' ? 'Reservar' : 'Submit' }}
        </button>
      </form>
    </div>

    <section
      v-if="confirmationModal"
      class="absolute inset-0 z-[99999] grid place-items-center bg-white"
    >
      <Transition name="up" mode="out-in" appear>
        <div v-if="confirmation" class="bg-base card-body mx-4 rounded-2xl shadow-xl">
          <div>
            <h3 class="text-center text-xl uppercase text-primary">
              {{
                language === 'es' ? 'Confirmacion de la reservación' : 'Confirm your reservation'
              }}
            </h3>
            <p class="text-center">
              {{
                language === 'es'
                  ? 'Revisa que la información este correcta ya que no se podrá corregir después'
                  : 'Check that the information is correct as it cannot be corrected later'
              }}
            </p>
          </div>
          <ul class="my-4 flex flex-col gap-4">
            <li>
              <label class="text-primary" for="">{{ language === 'es' ? 'Fecha' : 'Date' }}</label>
              <p>
                {{
                  new Date(reservationData.date).toLocaleDateString(
                    `${language}-${language === 'es' ? 'MX' : 'US'}`,
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )
                }}
              </p>
            </li>
            <li>
              <label class="text-primary" for="">{{ language === 'es' ? 'Hora' : 'Time' }}</label>
              <p>{{ useTime(reservationData.time) }}</p>
            </li>
            <li>
              <label class="text-primary" for="">{{ language === 'es' ? 'Nombre' : 'Name' }}</label>
              <p class="capitalize">{{ reservationData.name }}</p>
            </li>
            <li>
              <label class="text-primary" for="">{{
                language === 'es' ? 'Teléfono' : 'Phone'
              }}</label>
              <p class="">
                {{ reservationData.phone }}
              </p>
            </li>
            <li>
              <label class="text-primary" for="">
                {{ language === 'es' ? 'Cantidad de personas' : 'Qty of people' }}
              </label>
              <p>
                {{ reservationData.qty }}
              </p>
            </li>
          </ul>
          <div class="flex justify-center gap-4">
            <button class="btn btn-primary text-white" @click="openModal">
              {{ language === 'es' ? 'Editar' : 'Edit' }}
            </button>
            <label class="btn btn-accent text-white" @click="sendReservation">
              {{ language === 'es' ? 'Enviar' : 'Send' }}
            </label>
          </div>
        </div>
        <div v-else class="card-body mx-4 rounded-2xl bg-base-100 shadow-xl">
          <div>
            <h3 class="text-center text-xl uppercase text-primary">
              {{ language === 'es' ? 'Gracias por su solicitud' : 'Thanks for your request' }}
            </h3>
            <p class="text-center">
              {{
                language === 'es'
                  ? 'Recibirá un mensaje en Whatsapp cuando su reservación haya sido confirmada.'
                  : 'You will receive a Whatsapp message when your reservation has been confirmed.'
              }}
            </p>
          </div>
          <button class="btn btn-accent text-white" @click="submitReservation">
            {{ language === 'es' ? 'Aceptar' : 'Accept' }}
          </button>
        </div>
      </Transition>
    </section>
  </main>
</template>

<style>
:root {
  --v-calendar-datepicker-icon-color: #baa476;
  --v-calendar-active-bg-color: #7a8a3a;
}

.v-calendar,
.v-calendar .input-field {
  min-width: 100%;
}

.v-calendar .input-field input {
  @apply input input-bordered pl-10 transition-all focus:ring focus:ring-primary;
  border-color: v-bind(errorBorder);
}

input[type='time'] {
  min-width: 100%;
}
</style>
