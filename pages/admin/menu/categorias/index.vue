<script setup>
const supabase = useSupabaseClient();

const { data: menu } = await supabase.from('categories').select('*').order('id');

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
  <main>
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section>
      <div
        class="flex w-full flex-col justify-center p-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex w-fit items-center justify-center gap-2">
          <button class="text-primary" @click="$router.back()">
            <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
          </button>
          <!-- <h2 class="text-2xl">Todas las categorias</h2> -->
          <div class="text-md breadcrumbs lg:text-lg">
            <ul>
              <li><a>Categorias</a></li>
              <li><a>Todas</a></li>
            </ul>
          </div>
        </div>

        <NuxtLink
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          to="/admin/menu/nueva-categoria"
        >
          Nueva categoria
        </NuxtLink>
      </div>

      <div class="mb-24 mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
        <AdminCategoryItem v-for="category in menu" :category="category" :key="category.title" />
      </div>
    </section>
  </main>
</template>
