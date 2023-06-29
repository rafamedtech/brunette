<script setup>
import { useEventStore } from '@/stores/events';
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const eventStore = useEventStore();
const { isLoading } = storeToRefs(mainStore);
const modal = ref(null);

const { events, deleteEvent } = await useEvents();
console.log(events.value);

const { currentEvent } = storeToRefs(eventStore);
// console.log(currentEvent);

function setCurrentEvent(event) {
  currentEvent.value = event;
}

onMounted(() => {
  isLoading.value = false;
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
  <section class="w-full">
    <!-- <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" /> -->

    <section class="">
      <div class="mb-20 w-full text-center lg:mb-8">
        <h2 class="font-handlee text-4xl text-primary">Eventos</h2>
        <div class="divider mx-auto w-1/2"></div>
        <NuxtLink class="btn-primary btn mt-4" to="/admin/eventos/nuevo"> Agregar evento </NuxtLink>
        <EventDialog />
        <div v-if="isLoading" class="mt-32">
          <Loader />
        </div>
        <div v-else class="mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
          <div
            v-for="event in events"
            :key="event.id"
            class="relative flex flex-col gap-4 rounded-xl"
          >
            <NuxtLink class="absolute right-0 cursor-pointer" :to="`/admin/eventos/${event.id}`">
              <Icon name="solar:pen-outline" size="28" class="text-secondary" />
            </NuxtLink>
            <h4 class="text-2xl">{{ event.title }}</h4>
            <img :src="event.cover" alt="" class="w-full rounded-xl shadow-xl" />
          </div>
        </div>
      </div>
    </section>
    <!-- <CustomModal /> -->
  </section>
</template>
