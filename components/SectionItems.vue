<script setup>
defineProps({
  items: {
    type: Array,
  },
});

// const sortedItems = props.items.sort((a, b) => a.id - b.id);
</script>

<template>
  <ul class="grid gap-4 p-4" :class="{ 'grid-cols-2': items.length > 1 }">
    <li :class="{ 'mx-auto': items.length === 1 }" v-for="item in items" :key="item.name">
      <div>
        <h4 class="text-base font-bold uppercase text-primary">{{ item.name }}</h4>
        <p v-if="item.description" v-html="item.description"></p>
        <p class="text-secondary" :class="{ 'text-black': !item.description }" v-if="item.price">
          {{ item.price }}
        </p>
        <div v-if="item.variants">
          <div
            v-for="variant in item.variants"
            :key="variant.id"
            class="flex justify-between text-secondary"
          >
            <p class="text-black">{{ variant.name }}</p>
            <p>{{ variant.price }}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
