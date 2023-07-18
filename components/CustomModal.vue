<script setup>
// import { useEventStore } from '@/stores/events';
// import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';

// const store = useMainStore();

// const { isLoading } = storeToRefs(store);
const props = defineProps({
  type: String,
});

const headingText = computed(() => {
  if (props.type === 'category') {
    return 'Eliminar categoría';
  }
  if (props.type === 'section') {
    return 'Eliminar sección';
  }

  if (props.type === 'no-sections') {
    return 'Aun no tienes ninguna sección';
  }

  if (props.type === 'item') {
    return 'Eliminar platillo';
  }

  return 'Eliminar evento';
});

const descriptionText = computed(() => {
  if (props.type === 'no-sections') {
    return 'Para acceder a las secciones primero necesitas tener al menos una categoría.';
  }
  return 'Seguro que deseas eliminar esto?';
});

const { events, deleteEvent } = await useEvents();
const { deleteCategory, deleteSection, deleteItem } = useMenu();

async function deleteCurrentEvent() {
  const id = useRoute().params.id[0];
  await deleteEvent(Number(id));

  events.value = events.value.filter((event) => event.id !== Number(id));
  // console.log(events.value);

  await navigateTo('/admin/eventos');
}

async function deleteCurrentCategory() {
  const id = useRoute().params.id[0];
  await deleteCategory(Number(id));

  await navigateTo('/admin/menu/categorias');
}
async function deleteCurrentSection() {
  const id = useRoute().params.id[0];
  await deleteSection(Number(id));

  await navigateTo('/admin/menu/secciones');
}
async function deleteCurrentItem() {
  const id = useRoute().params.id[0];
  await deleteItem(Number(id));

  await navigateTo('/admin/menu/platillos');
}

async function onAction() {
  if (props.type === 'category') {
    await deleteCurrentCategory();
    return;
  }
  if (props.type === 'section') {
    await deleteCurrentSection();
    return;
  }

  if (props.type === 'no-sections') {
    return navigateTo('/admin/menu/categorias');
  }

  if (props.type === 'item') {
    await deleteCurrentItem();
    return;
  }

  await deleteCurrentEvent();
}
</script>

<template>
  <dialog id="my_modal_5" ref="modal" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box bg-[#f5f5f5]">
      <h3 class="text-lg font-bold text-primary">{{ headingText }}</h3>
      <p class="py-4">{{ descriptionText }}</p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn" v-if="type !== 'no-sections'">Cancelar</button>
        <button class="btn-primary btn" @click="onAction">Aceptar</button>
      </div>
    </form>
  </dialog>
</template>
