<script setup>
const { id } = useRoute().params;
const sectionId = Number(id[0]);

const supabase = useSupabaseClient();
const { data: section } = await supabase.from('sections').select('*').eq('id', sectionId);

const { data: items } = await supabase
  .from('items')
  .select('*, sections(*)')
  .eq('section', sectionId);

console.log(items);

/* Metadata */
useHead({
  title: `Menú - ${section.title}`,
  meta: [
    {
      name: 'description',
      content: `Nuestro menú de ${section.title}`,
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
          <!-- <h2 class="text-2xl">Detalle de {{ section[0].title }}</h2> -->
          <div class="lg:text-2lx breadcrumbs">
            <ul>
              <li><a>Secciones</a></li>

              <li>
                <a>{{ section[0].title }}</a>
              </li>
            </ul>
          </div>
        </div>

        <NuxtLink
          class="btn-primary btn mx-auto mt-4 text-lg normal-case lg:mx-0"
          to="/admin/menu/secciones/nueva-seccion"
        >
          Nuevo platillo
        </NuxtLink>
      </div>

      <section class="mb-24 mt-8 grid w-full gap-8 p-4">
        <div
          :to="`/admin/menu/secciones/${section.id}`"
          class="background card relative mx-auto flex h-32 w-full flex-col justify-center rounded-xl px-8 py-2 shadow-xl"
        >
          <h2 class="text-center font-handlee text-3xl text-black">Platillos</h2>
          <p
            class="text-center font-handlee text-lg font-extralight uppercase text-gray-50"
            v-if="section.description"
          >
            {{ section.description }}
          </p>
        </div>
        <div>
          <AdminSectionItems :items="items" />
        </div>
        <div>
          <NoData>No hay ningun platillo</NoData>
        </div>
      </section>
    </section>
  </main>
</template>
