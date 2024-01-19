<script setup lang="ts">
const store = useMainStore();
const { language } = storeToRefs(store);

interface Props {
  item: SidebarLink;
}
defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="item.to"
    class="text-base-100"
    active-class="text-primary bg-primary/10 rounded-box font-bold "
  >
    <Icon :name="item.icon" class="text-xl" />
    <span class="btm-nav-label text-xs">{{ language === 'es' ? item.name.es : item.name.en }}</span>
  </NuxtLink>
</template>
