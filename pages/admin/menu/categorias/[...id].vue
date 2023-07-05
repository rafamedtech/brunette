<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

const store = useMainStore();
const { language } = storeToRefs(store);
const supabase = useSupabaseClient();

const { id } = useRoute().params;
const { data: category } = await supabase.from('categories').select('*').eq('id', Number(id[0]));

const { data: sections } = await supabase
  .from('sections')
  .select('*, categories(*)')
  .eq('category', Number(id[0]));

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
          <div class="breadcrumbs text-sm lg:text-lg">
            <ul>
              <li><a>Categorias</a></li>
              <li>
                <a>Todas </a>
              </li>
              <li>
                <a>{{ category[0].title }}</a>
              </li>
            </ul>
          </div>
        </div>

        <NuxtLink
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          to="/admin/menu/nueva-categoria"
        >
          Nueva seccion
        </NuxtLink>
      </div>

      <section class="mb-24 mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
        <div v-for="section in sections" :key="section.title">
          <AdminSectionBanner :section="section" />
        </div>
      </section>
    </section>
  </main>
</template>
