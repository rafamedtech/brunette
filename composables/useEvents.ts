export async function useEvents() {
  const supabase = useSupabaseClient();
  const events = ref([]);

  async function getEvents() {
    try {
      const { data, error } = await supabase.from('events').select('*').order('id');
      events.value = data as any;

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  await getEvents();

  function getCurrentEvent(id: any) {
    return events.value.find((event: any) => event.id === id);
  }

  async function deleteEvent(id: any) {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);

      const newEvents = events.value.filter((event: any) => event.id !== id);
      events.value = newEvents;

      await getEvents();
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    events,
    getEvents,
    getCurrentEvent,
    deleteEvent,
  };
}
