<script setup>
async function userLogout() {
  const user = useSupabaseUser();
  const { auth } = useSupabaseAuthClient();
  const { error } = await auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null },
    });
    user.value = null;
  } catch (error) {}

  await navigateTo('/admin/login');
}
</script>

<template>
  <main class="container mt-8 flex w-full justify-center">
    <div class="hidden justify-between lg:flex lg:w-1/4">
      <Transition name="up" appear>
        <ul class="fixed flex w-fit flex-col gap-4">
          <li>
            <figure class="text-2xl text-neutral-content">
              <img class="h-14" src="@/assets/images/logo.png" alt="logo" />
            </figure>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:display" /> <span>Inicio</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/menu' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:brochure" /> <span>Menú</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/eventos' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:calendar" /> <span>Eventos</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ path: '/admin/encuestas' }"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:editor" />
              <span>Encuestas</span></NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/admin/reservaciones"
              active-class="text-secondary"
              class="flex items-center gap-2"
            >
              <Icon class="text-xl text-primary" name="gala:book" />
              <span>Reservaciones</span></NuxtLink
            >
          </li>
          <li>
            <div class="divider"></div>
          </li>
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
      <img src="@/assets/images/logo.png" alt="" class="mx-auto mb-8 w-32 lg:hidden" />
      <h1 class="text-center text-3xl text-primary">Administración</h1>
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
          <button for="my-modal-6" class="btn-primary btn text-white" @click="userLogout">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
