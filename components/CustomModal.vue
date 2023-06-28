<script setup>
// import { useEventStore } from '@/stores/events';
// import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';

// const store = useMainStore();

// const { isLoading } = storeToRefs(store);
const eventId = useRoute().params.id[0];
const { events, deleteEvent } = await useEvents();

async function deleteCurrentEvent() {
  await deleteEvent(Number(eventId));

  events.value = events.value.filter((event) => event.id !== Number(eventId));
  // console.log(events.value);

  await navigateTo('/admin/eventos');
}
</script>

<template>
  <dialog id="my_modal_5" ref="modal" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box bg-[#f5f5f5]">
      <h3 class="text-lg font-bold text-primary">Eliminar evento</h3>
      <p class="py-4">Seguro que deseas eliminar este evento?</p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Cancelar</button>
        <button class="btn-primary btn" @click="deleteCurrentEvent()">Aceptar</button>
      </div>
    </form>
  </dialog>
</template>
