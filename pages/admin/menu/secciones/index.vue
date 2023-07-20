<script setup>
const isLoading = ref(true);

const store = useMainStore();
const { currentCategory } = storeToRefs(store);

const sections = ref([]);
const supabase = useSupabaseClient();
const { data } = await useAsyncData(
  'sections',
  async () => await supabase.from('sections').select('id, title'),
  { transform: (result) => result.data }
);

onMounted(() => {
  sections.value = data.value;
  isLoading.value = false;
});

function newSection() {
  currentCategory.value = null;
  return navigateTo('/admin/menu/secciones/nueva-seccion');
}

const modal = ref(null);

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
              <li><a>Secciones</a></li>
              <li>
                <a>Todas</a>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          @click="newSection"
        >
          Nueva sección
        </button>
      </div>

      <section class="mb-24 mt-8 grid w-full gap-8">
        <div
          v-if="sections.length"
          :class="{ 'lg:grid-cols-2': sections.length }"
          class="grid w-full gap-8 p-4"
        >
          <Suspense>
            <template #default>
              <LazyAdminSectionBanner
                v-for="section in sections"
                :key="section.title"
                :section="section"
              />
            </template>
            <template #fallback>
              <div class="grid w-full gap-8 p-4">Cargando...</div>
            </template>
          </Suspense>
        </div>
        <div v-if="!sections.length && !isLoading">
          <NoData>No hay ninguna sección</NoData>
        </div>
        <div v-if="!sections.length && isLoading" class="grid w-full gap-8 p-4">
          <Loader />
        </div>
      </section>
    </section>
    <button ref="modal" class="hidden" onclick="my_modal_5.showModal()"></button>
    <CustomModal type="no-sections" />
  </main>
</template>
