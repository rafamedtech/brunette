import { defineStore } from 'pinia';

export const useMainStore = defineStore('menu', () => {
  const modal = ref(false);

  const languageModal = ref(true);
  const isLoading = ref(false);
  const language = ref('es');
  const events = reactive([]);
  const surveys = ref<any>([]);

  const currentCategory = ref(null);
  const currentSection = ref(null);

  const getSurveys = async () => {
    const supabase = useSupabaseClient();
    try {
      const { data: surveysData, error } = await supabase.from('surveys').select('*').order('created_at');

      surveys.value = surveysData;

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const reservations = ref<any>([]);
  async function getReservations() {
    const supabase = useSupabaseClient();
    try {
      const { data: reservationsData, error } = await supabase.from('reservations').select('*');
      reservations.value = reservationsData;

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

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
    currentCategory,
    currentSection,
    getSurveys,
    getReservations,
    getByCategory,
    getByCategoryEn,
  };
});
