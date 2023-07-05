<script setup>
// const supabase = useSupabaseClient();

// const { data: menu } = await supabase.from('categories').select('*');

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
  <main class="w-full">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <section class="flex justify-center">
      <div class="dropdown-right dropdown-hover dropdown">
        <label tabindex="0" class="btn-primary btn mx-auto text-lg normal-case">Nuevo</label>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
        >
          <li><a>Categoria</a></li>
          <li><a>Seccion</a></li>
          <li><a>Platillo</a></li>
        </ul>
      </div>
    </section>

    <section class="mb-24 mt-8 grid w-full gap-8 p-4 lg:grid-cols-3">
      <NuxtLink
        to="/admin/menu/categorias"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Categorias</span>
      </NuxtLink>
      <NuxtLink
        to="/admin/menu/secciones"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Secciones</span>
      </NuxtLink>
      <NuxtLink
        to="/"
        class="background card mx-auto flex h-32 w-full items-center justify-center bg-base-100 text-center shadow-xl"
      >
        <span class="font-handlee text-3xl">Platillos</span>
      </NuxtLink>
    </section>
  </main>
</template>
