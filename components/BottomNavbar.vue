<script setup>
import { sidebarLinks } from '@/data/sidebarLinks';
</script>

<template>
  <div class="flex w-screen max-w-full justify-center lg:hidden">
    <div class="btm-nav z-[999] max-w-full border-t bg-neutral dark:border-base-100/10">
      <BottomNavbarItem v-for="link in sidebarLinks" :item="link" :key="link.id" />
    </div>
  </div>
</template>
