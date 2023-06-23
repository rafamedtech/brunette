import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const supabase = useSupabaseClient();
  const modal = ref(false);
  const languageModal = ref(true);
  const isLoading = ref(true);

  const language = ref<string>('es');
  const events = reactive([]);
  const surveys = ref<any>([]);

  const getSurveys = async () => {
    try {
      const { data: surveysData, error } = await supabase.from('surveys').select('*');

      surveys.value = surveysData;

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const reservations = ref<any>([]);
  async function getReservations() {
    try {
      const { data: reservationsData, error } = await supabase.from('reservations').select('*');
      reservations.value = reservationsData;

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  const currentMenu = ref([]);

  const menu = ref<any>([]);

  const menu_en = reactive<any>([]);

  const getByCategory = (id: string) => menu.value?.find((category: any) => category.slug === id);

  const getByCategoryEn = (id: string) => menu.value?.find((category: any) => category.slug === id);

  return {
    modal,
    languageModal,
    isLoading,
    language,
    menu,
    menu_en,
    events,
    surveys,
    reservations,
    getSurveys,
    getReservations,

    getByCategory,
    getByCategoryEn,
  };
});
