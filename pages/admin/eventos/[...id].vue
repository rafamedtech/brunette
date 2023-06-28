<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
const eventId = useRoute().params.id[0];

const { events } = await useEvents();

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

const event = events.value.find((event) => event.id === Number(eventId));
// event.value = events.value.find((event) => event.id === Number(eventId));

onMounted(() => (isLoading.value = false));

// async function deleteCurrentEvent() {
//   events.value = events.value.filter((event) => event.id !== Number(eventId));
//   await navigateTo('/admin/eventos');
// }

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
});
</script>

<template>
  <main class="w-full">
    <!-- <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" /> -->
    <div class="w-full p-4 text-center lg:mt-8">
      <h2 class="text-4xl font-handlee text-primary">Actualizar evento</h2>
      <div class="relative mx-auto mt-4 flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h3 class="text-xl">Detalles del evento</h3>
      </div>
      <div v-if="isLoading" class="mt-32">
        <Loader />
      </div>
      <div v-else class="relative mt-8 flex flex-col items-center gap-4 rounded-xl">
        <!-- <h4 class="text-2xl text-primary">{{ event.title }}</h4> -->
        <div class="form-control w-96">
          <label class="label">
            <span class="label-text">Titulo</span>
          </label>
          <input
            type="text"
            placeholder="Escribe aqui"
            class="input-bordered input-primary input w-full text-primary"
            v-model="event.title"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
        </div>
        <div class="form-control w-96">
          <label class="label">
            <span class="label-text">Imagen</span>
            <!-- <span class="label-text-alt">Alt label</span> -->
          </label>
          <input
            type="text"
            class="input-bordered input-primary input w-full text-primary"
            v-model="event.cover"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
        </div>
        <figure class="w-96">
          <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure>
        <button class="btn-error btn bg-red-500 text-white" onclick="my_modal_5.showModal()">
          <span>Eliminar</span>
          <Icon name="ic:outline-delete" size="28" />
        </button>
      </div>
    </div>
    <CustomModal />
  </main>
</template>
