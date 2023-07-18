<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

const store = useMainStore();
const { currentCategory } = storeToRefs(store);

const isLoading = ref(true);

const supabase = useSupabaseClient();

const categoryId = Number(useRoute().params.id[0]);

const { data: category } = await supabase.from('categories').select('*').eq('id', categoryId);

const sections = ref([]);
const { data } = await useAsyncData(
  'sections',
  async () => await supabase.from('sections').select('*, categories(*)').eq('category', categoryId),
  { transform: (result) => result.data }
);

onMounted(() => {
  sections.value = data.value;
  isLoading.value = false;
});

function newSection() {
  // console.log('new section from category');
  currentCategory.value = categoryId;
  return navigateTo('/admin/menu/secciones/nueva-seccion');
}

/* Metadata */
useHead({
  title: `Menú - ${category.title}`,
  meta: [
    {
      name: 'description',
      content: `Nuestro menú de ${category.title}`,
    },
  ],
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
  layout: 'admin-layout',
});
</script>

<template>
  <main class="container">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section>
      <div
        class="flex w-full flex-col justify-center p-2 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex w-fit items-center justify-center gap-2">
          <button class="text-primary" @click="$router.back()">
            <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
          </button>
          <!-- <h2 class="text-2xl">Detalle de {{ category[0].title }}</h2> -->
          <div class="breadcrumbs text-2xl">
            <ul>
              <li><a>Categorías</a></li>
              <li>
                <a>Todas </a>
              </li>
              <li>
                <a>{{ category[0].title }}</a>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          @click="newSection"
        >
          <!-- to="/admin/menu/secciones/nueva-seccion" -->
          Nueva sección
        </button>
      </div>

      <section class="mb-24 mt-8 grid w-full gap-8 p-4">
        <div
          v-if="sections.length && !isLoading"
          :class="{ 'lg:grid-cols-2': sections.length }"
          class="grid w-full gap-8 p-4"
        >
          <AdminSectionBanner v-for="section in sections" :key="section.title" :section="section" />
        </div>
        <div v-else class="pt-32">
          <Loader />
        </div>
        <div v-if="!sections.length && !isLoading" class="grid place-content-center lg:mt-24">
          <NoData>No hay ninguna sección</NoData>
        </div>
      </section>
    </section>
  </main>
</template>
