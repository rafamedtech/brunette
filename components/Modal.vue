<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

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
const closeBtn = computed(() => (language.value === 'es' ? 'Cerrar' : 'Close'));
</script>

<template>
  <div>
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
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
            class="btn-primary btn text-base-100"
            >{{ closeBtn }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
