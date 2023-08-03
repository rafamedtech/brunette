<script lang="ts" setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const { query } = useRoute();

const store = useMainStore();
const { language } = storeToRefs(store);

async function selectLanguage(lang: string) {
  // store.$patch({
  //   language: lang,
  // });
  language.value = lang;

  await navigateTo('/');

  // await navigateTo(query.redirectTo as string);

  // if (language.value === 'es') {
  //   return await navigateTo('/');
  // } else {
  //   return await navigateTo('/en');
  // }
}

definePageMeta({
  layout: 'empty',
  // layoutTransition: {
  //   name: 'up',
  //   mode: 'out-in',
  //   appear: true,
  // },
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
});
</script>

<template>
  <section class="background grid h-screen place-content-center bg-white">
    <Transition name="up">
      <article class="card-body items-center rounded-2xl lg:w-[30rem]">
        <figure class="text-2xl text-neutral-content">
          <img class="h-24" src="@/assets/images/logo.png" alt="logo" />
        </figure>
        <h1 class="text-4xl text-accent">Menú</h1>
        <h2>Selecciona idioma / Select language</h2>
        <div class="flex justify-center gap-4">
          <button class="btn btn-primary text-white" @click="selectLanguage('es')">Español</button>
          <button class="btn btn-primary text-white" @click="selectLanguage('en')">English</button>
        </div>
      </article>
    </Transition>
  </section>
</template>
