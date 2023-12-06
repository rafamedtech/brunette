<script setup lang="ts">
import promo from 'https://res.cloudinary.com/rafamed-dev/image/upload/v1701888850/events/NewYearsLogoa_g8oi9x.jpg';
const store = useMainStore();
const { eventModal } = storeToRefs(store);

function closeModal() {
  eventModal.value = false;
}
</script>

<template>
  <section
    class="fixed inset-0 z-[99999] grid min-h-screen w-screen place-content-center px-4 backdrop-brightness-[.2]"
  >
    <dialog class="bg-dark-strong card relative w-full max-w-lg rounded-xl shadow-xl">
      <figure class="rounded-xl">
        <img :src="promo" alt="" />
      </figure>
      <button class="btn btn-primary absolute -top-4 right-0 rounded-xl" @click="closeModal">
        Cerrar
      </button>
    </dialog>
  </section>
</template>
