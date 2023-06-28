<script setup>
// event.value = events.value.find((event) => event.id === Number(eventId));

// async function deleteCurrentEvent() {
//   events.value = events.value.filter((event) => event.id !== Number(eventId));
//   await navigateTo('/admin/eventos');
// }
const event = reactive({
  title: '',
  cover: '',
});

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
      <div class="relative mx-auto mt-4 flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h2 class="text-2xl">Crear nuevo evento</h2>
      </div>

      <div class="relative mt-8 flex flex-col items-center gap-4 rounded-xl">
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
        <figure class="w-96" v-if="event.cover">
          <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure>
        <div
          v-else
          class="flex h-[40rem] w-96 flex-col items-center justify-center rounded-xl bg-white shadow-xl"
        >
          <Icon name="tabler:photo-exclamation" size="48" class="text-secondary" />
          Vista previa no disponible
        </div>
      </div>
    </div>
  </main>
</template>
