<script setup>
const store = useMainStore();

const { currentCategory, language } = storeToRefs(store);

const isLoading = ref(true);

const supabase = useSupabaseClient();

// const slug = ref(useRoute().params.slug);
const id = Number(useRoute().params.id);

const sections = ref([]);

const { data: category } = await useAsyncData(
  'category',
  async () =>
    await supabase
      .from(`${language.value === 'es' ? 'categories' : 'categories_en'}`)
      .select('id, title')
      .eq('id', id),
  { transform: (result) => result.data }
);
const { data } = await useAsyncData(
  'sections',
  async () =>
    await supabase
      .from(`${language.value === 'es' ? 'sections' : 'sections_en'}`)
      .select('*')
      .eq('category', id)
      .order('id'),
  { transform: (result) => result.data }
);

onMounted(() => {
  sections.value = data.value;
  // console.log(category.value[0].id);

  isLoading.value = false;
});

function newSection() {
  currentCategory.value = id;

  return navigateTo('/admin/menu/secciones/nueva-seccion', { replace: true });
}

/* Metadata */
useHead({
  title: `Menú - ${category.value[0].title}`,
  meta: [
    {
      name: 'description',

      content: `Nuestro menú de ${category.value[0].title}`,
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
          <NuxtLink class="text-primary" to="/admin/menu/categorias">
            <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
          </NuxtLink>
          <!-- <h2 class="text-2xl">Detalle de {{ category[0].title }}</h2> -->
          <div class="breadcrumbs text-xs lg:text-2xl">
            <ul>
              <li><a>Categorías</a></li>

              <li>
                <a>{{ category[0].title }}</a>
                <!-- <a>{{ currentCategory.title }}</a> -->
              </li>
            </ul>
          </div>
        </div>

        <button
          class="btn btn-primary mx-auto mt-4 text-lg normal-case lg:mx-0"
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
          <AdminSectionBanner v-for="section in sections" :key="section.id" :section="section" />
        </div>
        <div v-if="!sections.length && !isLoading">
          <NoData>No hay ninguna sección</NoData>
        </div>
        <div v-if="!sections.length && isLoading" class="py-32">
          <Loader />
        </div>
      </section>
    </section>
  </main>
</template>
