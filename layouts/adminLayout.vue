<script setup>
// const user = useSupabaseUser();

async function userLogout() {
  const user = useSupabaseUser();
  const { auth } = useSupabaseAuthClient();
  try {
    const { error } = await auth.signOut();

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null },
    });
    user.value = null;
  } catch (error) {
    console.error(error);
  }

  await navigateTo('/admin/login');
}
</script>

<template>
  <main class="container flex w-full justify-center lg:mt-8">
    <div class="hidden justify-between lg:flex lg:w-1/4">
      <Transition name="up" appear>
        <ul class="fixed flex w-fit flex-col gap-4">
          <li>
            <!-- <figure class="text-2xl text-neutral-content">
              <img class="h-24" src="@/assets/images/logo.png" alt="logo" />
            </figure> -->
            <p class="text-center font-handlee text-xl text-primary">Administración</p>
            <div class="divider mt-0"></div>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin' }"
              active-class="font-bold text-primary underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:display" /> <span>Inicio</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/menu' }"
              active-class="font-bold text-primary"
              class="flex items-center gap-2"
              :class="{ 'font-bold text-primary underline': $route.path.includes('/menu') }"
            >
              <Icon class="text-xl text-primary" name="gala:brochure" /> <span>Menú</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/eventos' }"
              active-class="font-bold text-primary"
              class="flex items-center gap-2"
              :class="{ 'font-bold text-primary underline': $route.path.includes('/eventos') }"
            >
              <Icon class="text-xl text-primary" name="gala:calendar" />
              <p>Eventos</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/encuestas' }"
              active-class="font-bold text-primary underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:editor" />
              <span>Encuestas</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/admin/reservaciones"
              active-class="font-bold text-primary underline"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:book" />
              <span>Reservaciones</span></NuxtLink
            >
          </li>
          <li>
            <div class="divider"></div>
          </li>
          <!-- <li>
            <NuxtLink
              class="flex items-center gap-2"
              to="/admin/configuracion"
              active-class="font-bold text-primary"
            >
              <Icon class="text-xl text-primary" name="fluent-emoji-high-contrast:gear" />
              <label for="my-modal-6" class="cursor-pointer">Configuración</label>
            </NuxtLink>
          </li>-->
          <li>
            <button class="flex items-center gap-2">
              <Icon class="text-xl text-primary" name="ri:logout-box-line" />
              <label for="my-modal-6" class="cursor-pointer">Cerrar sesión</label>
            </button>
          </li>
        </ul>
      </Transition>
    </div>

    <div class="lg:w-3/4">
      <!-- <figure class="">
        <img src="@/assets/images/logo.png" alt="" class="mx-auto mt-4 w-32 lg:hidden" />
      </figure> -->
      <!-- <p class="text-center font-handlee text-xl text-primary">Administración</p> -->
      <h1 class="text-center text-lg lg:hidden">Administración</h1>
      <div class="divider mx-auto w-1/2 lg:hidden"></div>
      <slot> </slot>
      <AdminBottomNav />
    </div>
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg">Seguro que quieres cerrar sesión?</h3>
        <!-- <p class="py-4">
          You've been selected for a chance to get one year of subscription to use Wikipedia for
          free!
        </p> -->
        <div class="modal-action">
          <label
            for="my-modal-6"
            class="btn border border-gray-300 bg-gray-300 text-black hover:border-gray-300 hover:bg-gray-300/75"
            >Cancelar</label
          >
          <button for="my-modal-6" class="btn btn-primary text-white" @click="userLogout">Aceptar</button>
        </div>
      </div>
    </div>
  </main>
</template>
