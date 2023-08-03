<script setup>
import { uid } from 'uid';
const props = defineProps({
  section: {
    type: Object,
  },
});

// const items = ref([]);

// console.log(props.section.id);

const supabase = useSupabaseClient();
const { data: items } = await useAsyncData(
  `items ${props.section.id}`,
  async () => await supabase.from('items').select('*, sections(*)').eq('section', props.section.id),
  {
    transform: (result) => result.data,
  }
);

// onMounted(() => {
//   items.value = data.value;
//   console.log(items.value);
// });
</script>

<template>
  <ul class="grid grid-cols-2 gap-4 p-4 lg:px-0">
    <li v-for="item in items" :key="item.id">
      <div>
        <h4 class="text-base font-bold uppercase text-primary">{{ item.name }}</h4>
        <p v-if="item.description">{{ item.description }}</p>
        <p class="text-secondary" :class="{ 'text-black': !item.description }" v-if="item.price">
          ${{ item.price }}
        </p>
        <div v-if="item.variants">
          <div
            v-for="variant in item.variants"
            :key="variant.id"
            class="flex justify-between text-secondary"
          >
            <p class="text-black">{{ variant.name }}</p>
            <p>${{ variant.price }}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
