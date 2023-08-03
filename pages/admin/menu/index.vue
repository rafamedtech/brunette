<script setup>
const store = useMainStore();
const { currentCategory, currentSection, language, isLoading } = storeToRefs(store);

function newSection() {
  currentCategory.value = null;
  return navigateTo('/admin/menu/secciones/nueva-seccion');
}
function newItem() {
  currentSection.value = null;
  return navigateTo('/admin/menu/platillos/nuevo-platillo');
}

function changeLanguage(lang) {
  store.$patch({
    language: lang,
  });
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
  <main class="w-full">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section class="flex justify-end gap-2 pr-4">
      <div class="dropdown-left dropdown">
        <label tabindex="0" class="btn btn-primary mx-auto w-32 normal-case">
          Nuevo
          <Icon name="icon-park-outline:file-addition-one" size="24" />
        </label>
        <ul
          tabindex="0"
          class="menu dropdown-content rounded-box z-[1] w-fit bg-base-100 p-2 shadow"
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

      <div class="dropdown dropdown-end dropdown-bottom dropdown-bottom">
        <label
          tabindex="0"
          class="btn btn-primary btn-outline mx-auto w-32 justify-between normal-case"
        >
          <span class="text-black">{{ language === 'es' ? 'Español' : 'Inglés' }}</span>
          <Icon
            name="material-symbols:language-chinese-dayi-rounded"
            size="24"
            class="text-secondary"
          />
        </label>
        <ul
          tabindex="0"
          class="menu dropdown-content rounded-box z-[1] w-fit bg-base-100 p-2 shadow"
        >
          <span class="pl-2 pt-2 text-primary">Idioma del menú</span>
          <li>
            <button @click="changeLanguage('es')" class="flex justify-between active:btn-primary">
              Español
              <Icon name="emojione-v1:flag-for-mexico" size="24" />
            </button>
          </li>
          <li>
            <button @click="changeLanguage('en')" class="flex justify-between active:btn-primary">
              Inglés
              <Icon name="emojione-v1:flag-for-united-states" size="24" />
            </button>
          </li>
        </ul>
      </div>
      <!-- <div class="form-control">
        <button
          class="btn btn-primary h-fit items-center gap-2 px-2 text-base-100"
          @click="changeLanguage"
        >
          <span class="normal-case">{{ language === 'es' ? 'Español' : 'Inglés' }}</span>
          <Icon
            :name="
              language === 'es'
                ? 'emojione-v1:flag-for-mexico'
                : 'emojione-v1:flag-for-united-states'
            "
            class="text-2xl"
          />
        </button>
        <label for="" class="mt-2">Idioma del menú</label>
      </div> -->
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
    <div
      v-if="isLoading"
      class="absolute inset-0 z-[99999] min-h-screen w-screen pt-96 backdrop-blur-xl"
    >
      <Loader />
    </div>
  </main>
</template>
