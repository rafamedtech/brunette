<script setup>
const store = useMainStore();
const isLoading = ref(true);

const { language } = storeToRefs(store);

const { categories, getCategories } = useMenu();
await getCategories(language.value);

isLoading.value = true;

const menu = ref([]);
onMounted(() => {
  menu.value = categories.value;
  isLoading.value = false;
});

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
          <div class="breadcrumbs text-xs lg:text-2xl">
            <ul>
              <li><a>Categorías</a></li>
              <li><a>Todas</a></li>
              <li>
                <a
                  ><span
                    class="flex items-center gap-2 px-2 font-bold text-base-100 text-primary lg:gap-2"
                    @click="changeLanguage"
                  >
                    <span class="">{{ language === 'es' ? 'Español' : 'Inglés' }}</span>
                    <Icon
                      :name="
                        language === 'es'
                          ? 'emojione-v1:flag-for-mexico'
                          : 'emojione-v1:flag-for-united-states'
                      "
                      class="text-2xl"
                    /> </span
                ></a>
              </li>
            </ul>
          </div>
        </div>

        <NuxtLink
          class="btn btn-primary mx-auto mt-4 text-lg normal-case lg:mx-0"
          to="/admin/menu/categorias/nueva-categoria"
        >
          Nueva categoría
        </NuxtLink>
      </div>

      <div class="mb-24 mt-8 w-full p-4" :class="{ 'lg:grid-cols-2': menu.length }">
        <div v-if="menu.length && !isLoading" class="grid gap-8 lg:grid-cols-2">
          <LazyAdminCategoryItem
            v-for="category in menu"
            :category="category"
            :key="category.title"
          />
        </div>
        <div v-if="!menu.length && isLoading" class="py-32">
          <Loader />
        </div>

        <div v-if="!menu.length && !isLoading">
          <NoData>No hay ninguna categoría</NoData>
        </div>
      </div>
    </section>
  </main>
</template>
