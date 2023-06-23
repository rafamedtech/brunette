<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { menu } = storeToRefs(store);

const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const items = menu.value.filter((item) => item.title === title);
</script>

<template>
  <div class="card image-full w-96 bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title capitalize">{{ title }}</h2>
      <p>{{ `${menu.length} ${title}` }}</p>
      <div class="card-actions justify-end">
        <!-- <button class="btn-primary btn">Add category</button> -->
        <label for="my-drawer" class="btn-primary drawer-button btn">Add category</label>
      </div>
    </div>
  </div>
</template>
