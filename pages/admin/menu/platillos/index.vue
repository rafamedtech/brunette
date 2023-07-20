<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { currentSection } = storeToRefs(store);

const supabase = useSupabaseClient();
const { data: items } = await supabase.from('items').select('*');

function newItem() {
  currentSection.value = null;
  return navigateTo('/admin/menu/platillos/nuevo-platillo');
}

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
  layout: 'admin-layout',
});
</script>

<template>
  <main>
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section>
      <div
        class="flex w-full flex-col justify-center p-2 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex w-fit items-center justify-center gap-2">
          <NuxtLink class="text-primary" to="/admin/menu">
            <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
          </NuxtLink>
          <!-- <h2 class="text-2xl">Todas las secciones</h2> -->
          <div class="breadcrumbs lg:text-2xl">
            <ul>
              <li><a>Platillos</a></li>
              <li>
                <a>Todos</a>
              </li>
            </ul>
          </div>
        </div>

        <button class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0" @click="newItem">
          Nuevo platillo
        </button>
      </div>

      <section class="mb-24 mt-8 grid w-full gap-8 p-4">
        <div v-if="items.length">
          <ul class="grid gap-8 p-4 lg:grid-cols-3">
            <LazyAdminSectionItems v-for="item in items" :key="item.id" :item="item" />
          </ul>
        </div>
        <div v-else>
          <NoData>No hay ningún platillo</NoData>
        </div>
      </section>
    </section>
  </main>
</template>
