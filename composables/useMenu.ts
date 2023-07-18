import menuEs from '@/data/menuDataEs';
import menuEn from '@/data/menuDataEn';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/menu';

export const useMenu = (lang: string | null) => {
  const supabase = useSupabaseClient();
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

  // Handle categories
  async function deleteCategory(id: any) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSection(id: any) {
    try {
      const { error } = await supabase.from('sections').delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteItem(id: any) {
    try {
      const { error } = await supabase.from('items').delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  // Handle items
  async function createNewItem(item: never) {
    try {
      const { error } = await supabase.from('items').insert([item]);

      if (error) throw error;
    } catch (error) {}
  }

  return { menu, deleteCategory, deleteSection, createNewItem, deleteItem };
};
