<script setup lang="ts">
const image =
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1701888851/events/Sunday_Brunchhhhh_ckgwuz.jpg';

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
    <dialog class="bg-dark-strong h-9/10 card relative w-full max-w-lg rounded-xl shadow-xl">
      <figure class="rounded-xl lg:w-80">
        <img :src="image" alt="" />
      </figure>
      <button class="btn btn-primary absolute -top-4 right-0 rounded-xl" @click="closeModal">
        Cerrar
      </button>
    </dialog>
  </section>
</template>
