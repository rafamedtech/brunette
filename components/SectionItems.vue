<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
  oneColumn: {
    type: Boolean,
    default: () => false,
  },
});

// const sortedItems = props.items.sort((a, b) => a.id - b.id);
</script>

<template>
  <ul
    class="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2"
    :class="{ 'grid-cols-2 text-left': !oneColumn }"
  >
    <li :class="{ 'mx-auto': items.length === 1 }" v-for="item in items" :key="item.name">
      <div>
        <h4 class="text-base font-bold uppercase text-primary">{{ item.name }}</h4>
        <p v-if="item.description">{{ item.description }}</p>
        <p class="font-bold" :class="{ 'text-black': !item.description }" v-if="item.price">
          {{ item.price }}
        </p>
        <div>
          <div v-for="variant in item.variants" :key="variant.id" class="flex justify-between">
            <p>{{ variant.name }}</p>
            <p class="font-bold">{{ variant.price }}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
