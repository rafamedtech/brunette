<script setup>
const store = useMainStore();
const { language } = storeToRefs(store);

function changeLanguage(lang) {
  language.value = lang;
  console.log(language.value);
}
</script>

<template>
  <section
    class="fixed inset-0 z-[99999] grid min-h-screen w-screen place-content-center backdrop-blur-xl"
  >
    <form class="modal-box w-full">
      <h3 class="text-lg font-bold text-primary">Idioma/Language</h3>
      <p class="py-4">Elija un idioma/Choose a language</p>
      <div class="modal-action justify-between">
        <!-- if there is a button in form, it will close the modal -->
        <button type="button" class="btn-primary btn" @click="changeLanguage('es')">Espanol</button>
        <button type="button" class="btn-primary btn" @click="changeLanguage('en')">English</button>
      </div>
    </form>
  </section>
</template>
