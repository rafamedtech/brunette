<script setup lang="ts">
const store = useEventStore();
const { eventModal } = storeToRefs(store);

const modalImage =
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706122283/events/allyoucaneat_rbxihs.jpg';

function closeModal() {
  eventModal.value = false;
}
</script>

<template>
  <section
    class="fixed inset-0 z-[99999] grid min-h-screen w-screen place-content-center px-4 backdrop-brightness-[.2]"
  >
    <dialog class="bg-dark-strong h-9/10 card relative w-full max-w-lg rounded-xl shadow-xl">
      <figure class="rounded-xl lg:w-80">
        <img :src="modalImage" alt="" />
      </figure>
      <button
        class="btn btn-primary absolute -top-4 right-0 rounded-xl normal-case"
        @click="closeModal"
      >
        Cerrar
      </button>
    </dialog>
  </section>
</template>
