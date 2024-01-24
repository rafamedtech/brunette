import { defineStore } from 'pinia';
import { required, helpers, minLength, maxLength, minValue } from '@vuelidate/validators';

export const useReservationStore = defineStore('reservation', () => {
  const store = useMainStore();
  const { language } = storeToRefs(store);

  const reservationRules = computed(() => {
    return {
      date: {
        required: helpers.withMessage(dateRequired.value, required),
        minValue: helpers.withMessage(dateMinValue.value, minValue(Date.now())),
      },
      name: {
        required: helpers.withMessage(nameRequired.value, required),
      },
      phone: {
        required: helpers.withMessage(phoneRequired.value, required),
        minLength: helpers.withMessage(phoneLength.value, minLength(10)),
        maxLength: helpers.withMessage(phoneLength.value, maxLength(10)),
      },
      qty: {
        required: helpers.withMessage(qtyRequired.value, required),
        minValue: helpers.withMessage(qtyMinValue.value, minValue(1)),
      },
    };
  });

  const dateRequired = computed(() =>
    language.value === 'es' ? 'Es necesario ingresar una fecha' : 'Date field is needed'
  );
  const dateMinValue = computed(() =>
    language.value === 'es' ? 'La fecha es inválida' : 'Invalid date'
  );
  const nameRequired = computed(() =>
    language.value === 'es' ? 'Es necesario ingresar un nombre' : 'Name field is needed'
  );
  const phoneRequired = computed(() =>
    language.value === 'es' ? 'Es necesario ingresar un teléfono' : 'Phone field is needed'
  );
  const phoneLength = computed(() =>
    language.value === 'es'
      ? 'Favor de ingresar el numero a 10 dígitos'
      : 'Please add a 10 digits number'
  );
  const qtyRequired = computed(() =>
    language.value === 'es' ? 'Este campo es requerido' : 'This field is required'
  );
  const qtyMinValue = computed(() =>
    language.value === 'es' ? 'La cantidad debe ser mínimo 1' : 'Number must be at least 1'
  );

  return {
    reservationRules,
  };
});
