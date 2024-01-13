import { defineStore } from 'pinia';

export const useEventStore = defineStore('events', () => {
  const currentEvent = ref(null);

  const eventModal = ref(true);

  return {
    currentEvent,
    eventModal,
  };
});
