<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
});

// const sortedItems = props.items.sort((a, b) => a.id - b.id);
</script>

<template>
  <li class="background relative mx-auto grid w-full place-items-center rounded-xl bg-base-200 p-4">
    <NuxtLink
      class="btn-circle btn absolute -right-4 -top-4 z-50 cursor-pointer border-transparent bg-transparent text-secondary hover:btn-primary"
      :to="`/admin/menu/platillos/${item.id}/editar`"
    >
      <Icon name="solar:pen-outline" size="24" />
    </NuxtLink>
    <div
      class="flex h-full w-full flex-col justify-between rounded-xl bg-white p-2 backdrop-opacity-50"
    >
      <div>
        <h4 class="text-base font-bold uppercase text-primary">{{ item.name }}</h4>
        <p v-if="item.description" v-html="item.description"></p>
        <p class="text-secondary" :class="{ 'text-black': !item.description }" v-if="item.price">
          ${{ item.price }}
        </p>
      </div>
      <div v-if="item.variants" class="mt-4">
        <div
          v-for="variant in item.variants"
          :key="variant.id"
          class="flex justify-between text-secondary"
        >
          <p class="text-black">{{ variant.name }}</p>
          <p>${{ variant.price }}</p>
        </div>
      </div>

      <Suspense>
        <template #default>
          <LazyAdminBadgesSection :section="Number(item.section)" />
        </template>

        <template #fallback>
          <Suspense>
            <div class="mt-8 grid h-28 place-content-center">
              <Loader />
            </div>
          </Suspense>
        </template>
      </Suspense>
    </div>
  </li>
</template>
