<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { language } = storeToRefs(store);

if (process.client) {
  const showMenu = () => {
    if (window.scrollY > 50) {
      showButton.value = true;
    } else {
      showButton.value = false;
    }
  };
  window.addEventListener('scroll', showMenu);
}

const showButton = ref(false);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <li v-show="showButton" class="w-fit border-l-2 pl-2">
    <button
      @click="scrollToTop"
      class="fflex flex-col items-center gap-0 p-0 focus:bg-transparent active:text-primary"
    >
      <i class="fa-solid fa-chevron-up text-xl"></i> {{ language === 'es' ? 'Arriba' : 'Top' }}
    </button>
  </li>
</template>
