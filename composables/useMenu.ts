import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';

export const useMenu = (lang: string | null) => {
  const menu = ref();

  if (lang === 'es') {
    menu.value = menuEs;
  }

  if (lang === 'en') {
    menu.value = menuEn;
  }

  return { menu };
};
