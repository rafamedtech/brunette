<script setup>
const store = useMainStore();
const { language } = storeToRefs(store);

const modalHeading = computed(() =>
  language.value === 'es' ? 'Gracias por tus comentarios!' : 'Thanks for your comments'
);
const modalDescription = computed(() =>
  language.value === 'es'
    ? 'Esperamos seguir atendiéndote como te mereces la próxima vez.'
    : 'We hope to continue serving you as you deserve next time.'
);
const closeBtn = computed(() => (language.value === 'es' ? 'Regresar al menú' : 'Close'));

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
});
</script>

<template>
  <div class="container grid min-h-screen place-content-center">
    <div class="p-4">
      <h3 class="font-handlee text-xl font-bold text-accent">
        {{ modalHeading }}
      </h3>
      <p class="py-4">
        {{ modalDescription }}
      </p>
      <div class="modal-action">
        <label
          @click="$router.push('/')"
          for="my-modal-6"
          class="btn btn-primary normal-case text-base-100"
          >{{ closeBtn }}</label
        >
      </div>
    </div>
  </div>
</template>
