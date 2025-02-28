<script lang="ts" setup>
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const { auth } = useSupabaseAuthClient();
const { query } = useRoute();
const user = useSupabaseUser();

const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
  } catch (error) {
    errorMsg.value = error as string;
    setTimeout(() => {
      errorMsg.value = '';
    }, 3000);
  }
};

watchEffect(async () => {
  if (user.value) {
    email.value = '';
    password.value = '';

    await navigateTo('/admin', { replace: true });
  }
});

useHead({
  title: 'Brunette Administración | Iniciar sesión',
});

definePageMeta({
  layout: false,
  layoutTransition: {
    name: 'up',
    mode: 'out-in',
  },
});
</script>

<template>
  <main>
    <section class="container mx-auto flex flex-col flex-wrap items-center justify-center px-5 py-24 text-gray-400">
      <section class="flex flex-col items-center">
        <!-- <figure class="text-2xl text-neutral-content">
          <img class="h-14" src="@/assets/images/logo.png" alt="logo" />
        </figure> -->
        <h1 class="w-fit text-3xl text-primary">Administración</h1>
      </section>
      <form
        @submit.prevent="userLogin"
        class="bg-opacity-50 mt-10 flex w-full flex-col rounded-lg bg-white p-8 shadow-xl md:mt-0 md:w-1/2 lg:w-2/6"
      >
        <h2 class="mb-5 text-xl font-medium text-primary">Iniciar sesión</h2>
        <div class="relative mb-4">
          <label for="full-name" class="text-sm leading-7 text-black">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent px-3 py-1 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:border-primary focus:bg-transparent focus:ring-2 focus:ring-transparent"
            required
          />
        </div>

        <div class="relative mb-4">
          <label for="password" class="text-sm leading-7 text-black">Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent px-3 py-1 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:border-[#42b883] focus:bg-transparent focus:ring-2 focus:ring-transparent"
            required
          />
        </div>

        <button
          type="submit"
          class="rounded border-0 bg-primary px-8 py-2 font-sans font-bold text-white transition-colors duration-500 hover:bg-primary/75 focus:outline-none"
        >
          Entrar
        </button>

        <!-- <span
          class="bg-opacity-50 absolute right-8 top-8 rounded-lg bg-[#242424] p-8 px-4 py-2 text-red-500"
          v-if="errorMsg"
          >{{ errorMsg }}</span
        > -->
      </form>
    </section>
  </main>
</template>
