import { defineStore } from 'pinia';

export const useEventStore = defineStore('events', () => {
  const currentEvent = ref(null);
  return {
    currentEvent,
  };
});
