import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

export const useMenu = (lang: string | null) => {
  const store = useMainStore();
  const { language } = storeToRefs(store);
  const menu = computed(() => {
    if (language.value === 'es') {
      return menuEs;
    }

    if (language.value === 'en') {
      return menuEn;
    }
  });

  // if (lang === 'es') {
  //   menu.value = menuEs;
  // }

  // if (lang === 'en') {
  //   menu.value = menuEn;
  // }

  return { menu };
};
