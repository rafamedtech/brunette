<script setup lang="ts">
const store = useEventStore();
const { eventModal } = storeToRefs(store);

const modalImage = 'https://res.cloudinary.com/rafamed-dev/image/upload/v1741120031/jueves-italiano_shyyv7.jpg';

function closeModal() {
  eventModal.value = false;
}
</script>

<template>
  <section
    class="fixed inset-0 z-[99999] grid min-h-screen w-screen place-content-center px-4 backdrop-brightness-[.2]"
  >
    <dialog class="bg-dark-strong h-9/10 card relative w-full max-w-lg rounded-xl shadow-xl">
      <figure class="w-80 rounded-xl">
        <img :src="modalImage" alt="" />
      </figure>
      <button class="btn btn-primary absolute -top-4 right-0 rounded-xl normal-case" @click="closeModal">Cerrar</button>
    </dialog>
  </section>
</template>
