<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { isLoading } = storeToRefs(store);
const supabase = useSupabaseClient();

const event = reactive({
  title: '',
  cover: '',
});

async function createEvent() {
  isLoading.value = true;
  // console.log(event);
  try {
    const { data, error } = await supabase.from('events').insert([event]);

    console.log(data);
    await navigateTo('/admin/eventos/');

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

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
  <section class="w-full">
    <!-- <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" /> -->
    <div class="">
      <div class="w-full text-center lg:mb-0">
        <h2 class="font-handlee text-4xl text-primary">Configuración de eventos</h2>
        <div class="divider mx-auto w-1/2"></div>
      </div>
      <div class="relative mx-auto flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h2 class="text-2xl">Crear nuevo evento</h2>
      </div>

      <div class="card mx-auto mb-20 mt-8 w-full max-w-sm flex-shrink-0 px-2 lg:mb-8">
        <form @submit.prevent class="card-body flex flex-col p-2">
          <div class="form-control w-full">
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
          <div class="form-control">
            <label class="label">
              <span class="label-text">Imagen (URL)</span>
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
          <figure class="mt-8 w-full" v-if="event.cover">
            <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
          </figure>
          <div
            v-else
            class="mt-8 flex h-[40rem] flex-col items-center justify-center rounded-xl bg-white shadow-pinterest"
          >
            <Icon name="tabler:photo-exclamation" size="48" class="text-secondary" />
            Vista previa no disponible
          </div>
          <button class="btn-primary btn mx-auto my-4 w-40" @click="createEvent">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <span v-else>Crear evento</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
