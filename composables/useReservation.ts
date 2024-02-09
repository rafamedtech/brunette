export const useReservation = async () => {
  const supabase = useSupabaseClient();
  const store = useMainStore();

  const { reservations } = storeToRefs(store);

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('date', { ascending: false });

  reservations.value = data;

  if (error) {
    console.log(error);
  }

  const filteredReservations = computed(() => {
    return reservations.value.filter((r: any) => new Date(r.date) >= new Date(Date.now()));
  });

  const sortedReservations = computed(() =>
    reservations.value.sort(
      (a: any, b: any) => new Date(a.date).getDate() - new Date(b.date).getDate()
    )
  );

  const unconfirmedReservations = computed(
    () => reservations.value.filter((r: any) => r.status === 'Solicitud').length
  );
  const canceledReservations = computed(
    () => reservations.value.filter((r: any) => r.status === 'Cancelada').length
  );
  const todayReservations = computed(
    () =>
      reservations.value.filter(
        (r: any) => new Date(r.date).getDate() === new Date(Date.now()).getDate()
      ).length
  );

  return {
    reservations,
    filteredReservations,
    sortedReservations,
    unconfirmedReservations,
    canceledReservations,
    todayReservations,
  };
};
