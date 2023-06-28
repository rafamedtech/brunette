<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { modal, language, isLoading } = storeToRefs(store);
function createEvent() {
  console.log('event submitted');
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}
</script>

<template>
  <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="min-h-16 modal-box">
      <h3 class="text-lg font-bold text-primary">Nuevo evento</h3>
      <div class="mt-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Titulo</span>
            <!-- <span class="label-text-alt">Top Right label</span> -->
          </label>
          <input
            type="text"
            placeholder="Escribe aqui"
            class="input-bordered input-primary input w-full max-w-xs"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Imagen</span>
            <!-- <span class="label-text-alt">Alt label</span> -->
          </label>
          <input
            type="file"
            class="file-input-bordered file-input-primary file-input w-full max-w-xs"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
        </div>
      </div>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Cerrar</button>
        <button class="btn-primary btn" @click="createEvent">Crear</button>
      </div>
    </form>
  </dialog>
</template>
