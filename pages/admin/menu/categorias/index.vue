<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const isLoading = ref(true);

// isLoading.value = true;

const menu = ref([]);
const supabase = useSupabaseClient();
const { data } = await useAsyncData(
  'menu',
  async () => await supabase.from('categories').select('*'),
  { transform: (result) => result.data }
);

onMounted(() => {
  menu.value = data.value;
  isLoading.value = false;
});
// const { data: menu } = await supabase.from('categories').select('*').order('id');

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
  <main class="">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section>
      <div
        class="flex w-full flex-col justify-center p-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex w-fit items-center justify-center gap-2">
          <NuxtLink class="text-primary" to="/admin/menu">
            <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
          </NuxtLink>
          <!-- <h2 class="text-2xl">Todas las categorias</h2> -->
          <div class="breadcrumbs text-2xl">
            <ul>
              <li><a>Categorías</a></li>
              <li><a>Todas</a></li>
            </ul>
          </div>
        </div>

        <NuxtLink
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          to="/admin/menu/categorias/nueva-categoria"
        >
          Nueva categoría
        </NuxtLink>
      </div>

      <div class="mb-24 mt-8 w-full p-4" :class="{ 'lg:grid-cols-2': menu.length }">
        <div v-if="menu.length && !isLoading" class="grid grid-cols-2 gap-8">
          <AdminCategoryItem v-for="category in menu" :category="category" :key="category.title" />
        </div>
        <div v-else class="py-32">
          <Loader />
        </div>

        <div v-if="!menu.length && !isLoading">
          <NoData>No hay ninguna categoría</NoData>
        </div>
      </div>
    </section>
  </main>
</template>
