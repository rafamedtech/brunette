<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { currentCategory, currentSection } = storeToRefs(store);

function newSection() {
  currentCategory.value = null;
  return navigateTo('/admin/menu/secciones/nueva-seccion');
}
function newItem() {
  currentSection.value = null;
  return navigateTo('/admin/menu/platillos/nuevo-platillo');
}

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
  layout: 'admin-layout',
});
</script>

<template>
  <main class="w-full">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section class="flex justify-center">
      <div class="dropdown-right dropdown-hover dropdown">
        <label tabindex="0" class="btn-primary btn mx-auto text-lg normal-case">Nuevo</label>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <NuxtLink to="/admin/menu/categorias/nueva-categoria" class="active:btn-primary"
              >Categoría</NuxtLink
            >
          </li>
          <li><button @click="newSection" class="active:btn-primary">Sección</button></li>
          <li><button @click="newItem" class="active:btn-primary">Platillo</button></li>
        </ul>
      </div>
    </section>

    <section class="mb-24 mt-8 grid w-full gap-8 p-4 lg:grid-cols-3">
      <NuxtLink
        to="/admin/menu/categorias"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Categorías</span>
      </NuxtLink>
      <NuxtLink
        to="/admin/menu/secciones"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Secciones</span>
      </NuxtLink>
      <NuxtLink
        to="/admin/menu/platillos"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Platillos</span>
      </NuxtLink>
    </section>
  </main>
</template>
