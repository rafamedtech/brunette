<script setup>
const supabase = useSupabaseClient();
const { data: sections } = await supabase.from('sections').select('*, categories(*)');

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
      <div class="relative mx-auto flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h2 class="text-2xl">Todas las secciones</h2>
      </div>
    </section>

    <div class="flex w-full">
      <NuxtLink
        class="btn-primary btn mx-auto mt-4 text-lg normal-case"
        to="/admin/menu/nueva-categoria"
      >
        Nueva seccion
      </NuxtLink>
    </div>

    <section class="mb-24 mt-8 grid w-full gap-8 p-4 lg:grid-cols-2">
      <!-- <div v-for="section in sections" :key="section.title"> -->
      <AdminSectionBanner v-for="section in sections" :key="section.title" :section="section" />
      <!-- </div> -->
    </section>
  </main>
</template>
