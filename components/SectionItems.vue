<script setup lang="ts">
interface SectionItemsProps {
  items: any[];
}

const { items } = defineProps<SectionItemsProps>();
// const sortedItems = props.items.sort((a, b) => a.id - b.id);
</script>

<template>
  <ul class="grid w-full grid-cols-1 gap-4 px-2 py-4 lg:grid-cols-2">
    <li
      class="flex w-full items-center justify-between"
      :class="{ 'mx-auto': items.length === 1 }"
      v-for="item in items"
      :key="item.name"
    >
      <div class="w-full basis-5/6" :class="{ 'flex-1': !item.price && item.variants?.length }">
        <h4 class="text-base font-bold text-primary">{{ item.name }}</h4>
        <p v-if="item.description">{{ item.description }}</p>

        <div class="w-full">
          <div v-for="variant in item.variants" :key="variant.id" class="flex justify-between">
            <p>{{ variant.name }}</p>
            <p class="font-bold">$ {{ variant.price }}</p>
          </div>
        </div>
      </div>
      <p
        v-if="item.price"
        class="basis-1/6 text-right font-bold"
        :class="{ 'text-black': !item.description, 'basis-2/6': !item.price && !item.variants.length }"
      >
        $ {{ item.price }}
      </p>
    </li>
  </ul>
</template>
