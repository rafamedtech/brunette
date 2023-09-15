<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
// import { useVuelidate } from '@vuelidate/core';
// import { required, helpers } from '@vuelidate/validators';

const store = useMainStore();
const { modal, language } = storeToRefs(store);

// Survey handling
const surveyData = reactive({
  name: '',
  phone: '',
  mesero: 'No lo sé',
  firstQuestion: null,
  secondQuestion: null,
  thirdQuestion: null,
  fourthQuestion: null,
  fifthQuestion: null,
  comment: '',
});

const supabase = useSupabaseClient();
async function sendSurvey() {
  try {
    const { error } = await supabase.from('surveys').insert([surveyData]);
    // console.log(data);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

// Validation Messages
// const nameRequired = computed(() =>
//   language.value === 'es' ? 'Es necesario ingresar un nombre' : 'Name field is required'
// );
// const meseroRequired = computed(() =>
//   language.value === 'es' ? 'Es necesario ingresar un nombre' : 'Name field is required'
// );

//Form validation
// const rules = computed(() => {
//   return {
//     name: {
//       required: helpers.withMessage(nameRequired, required),
//     },
//     mesero: {
//       required: helpers.withMessage(meseroRequired, required),
//     },
//   };
// });

// const v$ = useVuelidate(rules, surveyData);

// const modalToggle = computed(() => (v$.value.$error ? '' : 'my-modal-6'));
const openModal = () => {
  // v$.value.$validate();
  // if (v$.value.$error) {
  //   return;
  // }
  // console.log(surveyData);
  if (
    !surveyData.firstQuestion ||
    !surveyData.secondQuestion ||
    !surveyData.thirdQuestion ||
    !surveyData.fourthQuestion ||
    !surveyData.fifthQuestion
  ) {
    return alert('Por favor ayúdanos contestando las 5 preguntas.');
  }
  sendSurvey();
  modal.value = true;
};

const meseroLog = () => {
  console.log(surveyData.mesero);
};

// OAuth Authentication
// const { auth } = useSupabaseClient();
// const user = useSupabaseUser();

// const googleAuth = async () => {
//   try {
//     const { error } = await auth.signInWithOAuth({
//       provider: 'google',
//     });

//     if (error) throw error;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const logout = async () => {
//   const { error } = await auth.signOut();

//   if (error) {
//     console.log(error);
//     return;
//   }
//   // console.log(user.value);

//   try {
//     await $fetch('/api/_supabase/session', {
//       method: 'POST',
//       body: { event: 'SIGNED_OUT', session: null },
//     });

//     user.value = null;
//   } catch (error) {
//     console.error(error);
//   }
// };

useHead({
  title: 'Brunette Kitchen & Drinks | Encuesta de satisfacción 📋',
  meta: [
    {
      name: 'description',
      content: 'Tu opinión es muy importante para nosotros.',
    },
    // Facbebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://brunette.com.mx/encuesta',
    },
    {
      property: 'og:title',
      content: 'Brunette Kitchen & Drinks | Encuesta de satisfacción 📋',
    },
    {
      property: 'og:description',
      content: 'Tu opinión es muy importante para nosotros.',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1675470741/menu/logobackground_qugh9v.png',
    },
  ],
});

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
  },
});
</script>

<template>
  <main class="mt-4 pb-16 lg:mt-8">
    <section class="mt-4 flex items-center">
      <button class="absolute my-auto ml-5 text-primary" @click="$router.back()">
        <i class="fa-solid fa-arrow-left-long text-3xl"></i>
      </button>
      <h1 class="mx-auto px-2 text-center font-handlee text-4xl text-primary lg:px-32">
        {{ language === 'es' ? 'Encuesta' : 'Survey' }}
      </h1>
    </section>
    <div class="divider mx-auto w-1/2"></div>
    <!-- 
    <button class="btn-accent btn flex items-center text-white" @click="logout">
      Iniciar sesion con <Icon name="mdi:apple" class="mx-2 text-3xl" />
    </button> -->

    <section>
      <div class="hero">
        <div class="flex-col">
          <div v-if="language === 'es'" class="text-center">
            <h1 class="text-2xl text-secondary">Agradeceríamos tu opinión</h1>
            <p class="pb-6 text-black">
              Con tus comentarios, podemos mejorar nuestros productos y servicios.
            </p>
          </div>
          <div v-else class="text-center">
            <h1 class="text-2xl text-primary">We would appreciate your feedback.</h1>
            <p class="pb-6 text-black">
              With your opinion, we can improve our products and services.
            </p>
          </div>

          <div class="card mx-auto w-full max-w-sm flex-shrink-0 px-2">
            <form class="card-body rounded-xl bg-base-100 shadow-pinterest">
              <div class="form-control relative flex flex-col">
                <label class="text-primary" for="name">{{
                  language === 'es' ? 'Tu nombre (opcional)' : 'Your name (optional)'
                }}</label>
                <input
                  v-model="surveyData.name"
                  type="text"
                  id="name"
                  class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                />
              </div>
              <div class="form-control relative flex flex-col">
                <label class="text-primary" for="name">{{
                  language === 'es' ? 'Teléfono (opcional)' : 'Phone (optional)'
                }}</label>
                <input
                  v-model="surveyData.phone"
                  type="text"
                  id="name"
                  class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                />
              </div>
              <div class="form-control relative flex flex-col">
                <label class="text-primary" for="mesero">{{
                  language === 'es' ? 'Mesero' : 'Waiter'
                }}</label>

                <select
                  v-model="surveyData.mesero"
                  id="mesero"
                  class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                >
                  <option value="No lo sé">
                    {{ language === 'es' ? 'No lo sé' : "I don't know" }}
                  </option>
                  <option value="Diego Vargas">Diego Vargas</option>
                  <option value="Giovanny Gómez">Giovanny Gómez</option>
                  <option value="Christian Pérez">Christian Pérez</option>
                </select>
              </div>
              <div class="divider"></div>

              <!-- First Question -->
              <div class="form-control">
                <label class="label">
                  <span class="font-bold text-primary">{{
                    language === 'es'
                      ? '1.- La bienvenida por parte de nuestro mesero fue:'
                      : '1.- The welcome from our waiter was:'
                  }}</span>
                </label>

                <section>
                  <fieldset class="flex w-full flex-col gap-2 px-2 text-xs">
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="first-bad" class="text-base">{{
                        language === 'es' ? 'Mala' : 'Bad'
                      }}</label>
                      <input
                        type="radio"
                        id="first-bad"
                        name="radio-1"
                        class="radio-primary radio"
                        v-model="surveyData.firstQuestion"
                        value="Mala"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="first-regular" class="text-base">Regular</label>
                      <input
                        type="radio"
                        id="first-regular"
                        name="radio-1"
                        class="radio-primary radio"
                        v-model="surveyData.firstQuestion"
                        value="Regular"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="first-good" class="text-base">{{
                        language === 'es' ? 'Buena' : 'Good'
                      }}</label>
                      <input
                        type="radio"
                        id="first-good"
                        name="radio-1"
                        class="radio-primary radio"
                        v-model="surveyData.firstQuestion"
                        value="Buena"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="first-excellent" class="text-base">{{
                        language === 'es' ? 'Excelente' : 'Excellent'
                      }}</label>
                      <input
                        type="radio"
                        id="first-excellent"
                        name="radio-1"
                        class="radio-primary radio"
                        v-model="surveyData.firstQuestion"
                        value="Excelente"
                      />
                    </div>
                  </fieldset>
                </section>
              </div>
              <div class="divider"></div>

              <!-- Second Question -->
              <div class="form-control">
                <label class="label">
                  <span class="font-bold text-primary">{{
                    language === 'es'
                      ? '2.- La calidad y temperatura de los alimentos fue:'
                      : '2.- The quality and temperature of the food was:'
                  }}</span>
                </label>

                <section>
                  <fieldset class="flex w-full flex-col gap-2 px-2 text-xs">
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Mala' : 'Bad'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-2"
                        class="radio-primary radio"
                        v-model="surveyData.secondQuestion"
                        value="Mala"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">Regular</label>
                      <input
                        type="radio"
                        name="radio-2"
                        class="radio-primary radio"
                        v-model="surveyData.secondQuestion"
                        value="Regular"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Buena' : 'Good'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-2"
                        class="radio-primary radio"
                        v-model="surveyData.secondQuestion"
                        value="Buena"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Excelente' : 'Excellent'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-2"
                        class="radio-primary radio"
                        v-model="surveyData.secondQuestion"
                        value="Excelente"
                      />
                    </div>
                  </fieldset>
                </section>
              </div>
              <div class="divider"></div>

              <!-- Third Question -->
              <div class="form-control">
                <label class="label">
                  <span class="font-bold text-primary">{{
                    language === 'es'
                      ? '3.- La calidad de sus bebidas fue:'
                      : '3.- The quality of their drinks was:'
                  }}</span>
                </label>

                <section>
                  <fieldset class="flex w-full flex-col gap-2 px-2 text-xs">
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Mala' : 'Bad'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-3"
                        class="radio-primary radio"
                        v-model="surveyData.thirdQuestion"
                        value="Mala"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">Regular</label>
                      <input
                        type="radio"
                        name="radio-3"
                        class="radio-primary radio"
                        v-model="surveyData.thirdQuestion"
                        value="Regular"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Buena' : 'Good'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-3"
                        class="radio-primary radio"
                        v-model="surveyData.thirdQuestion"
                        value="Buena"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Excelente' : 'Excellent'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-3"
                        class="radio-primary radio"
                        v-model="surveyData.thirdQuestion"
                        value="Excelente"
                      />
                    </div>
                  </fieldset>
                </section>
              </div>
              <div class="divider"></div>

              <!-- Fourth Question -->
              <div class="form-control">
                <label class="label">
                  <span class="font-bold text-primary">{{
                    language === 'es'
                      ? '4.- La limpieza del restaurante la considera:'
                      : '4.- The cleanliness of the restaurant is considered:'
                  }}</span>
                </label>

                <section>
                  <fieldset class="flex w-full flex-col gap-2 px-2 text-xs">
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Mala' : 'Bad'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-4"
                        class="radio-primary radio"
                        v-model="surveyData.fourthQuestion"
                        value="Mala"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">Regular</label>
                      <input
                        type="radio"
                        name="radio-4"
                        class="radio-primary radio"
                        v-model="surveyData.fourthQuestion"
                        value="Regular"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Buena' : 'Good'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-4"
                        class="radio-primary radio"
                        v-model="surveyData.fourthQuestion"
                        value="Buena"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Excelente' : 'Excellent'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-4"
                        class="radio-primary radio"
                        v-model="surveyData.fourthQuestion"
                        value="Excelente"
                      />
                    </div>
                  </fieldset>
                </section>
              </div>
              <div class="divider"></div>

              <!-- Fifth Question -->
              <div class="form-control">
                <label class="label">
                  <span class="font-bold text-primary">{{
                    language === 'es'
                      ? '5.- Como califica nuestro servicio?'
                      : '5.- How do you rate our service?'
                  }}</span>
                </label>

                <section>
                  <fieldset class="flex w-full flex-col gap-2 px-2 text-xs">
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Malo' : 'Bad'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-5"
                        class="radio-primary radio"
                        v-model="surveyData.fifthQuestion"
                        value="Malo"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">Regular</label>
                      <input
                        type="radio"
                        name="radio-5"
                        class="radio-primary radio"
                        v-model="surveyData.fifthQuestion"
                        value="Regular"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Bueno' : 'Good'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-5"
                        class="radio-primary radio"
                        v-model="surveyData.fifthQuestion"
                        value="Bueno"
                      />
                    </div>
                    <div class="flex w-1/2 items-center justify-between">
                      <label for="" class="text-base">{{
                        language === 'es' ? 'Excelente' : 'Excellent'
                      }}</label>
                      <input
                        type="radio"
                        name="radio-5"
                        class="radio-primary radio"
                        v-model="surveyData.fifthQuestion"
                        value="Excelente"
                      />
                    </div>
                  </fieldset>
                </section>
              </div>
              <div class="divider"></div>

              <!-- Adicional Comments -->
              <div class="form-control">
                <label class="label" for="comment">
                  <span class="font-bold text-primary">{{
                    language === 'es' ? 'Comentarios adicionales (opcional)' : 'Comments (optional)'
                  }}</span>
                </label>
                <textarea
                  v-model="surveyData.comment"
                  class="textarea textarea-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                  name="comment"
                  id="comment"
                  :placeholder="language === 'es' ? 'Escribe aquí...' : 'Write here...'"
                ></textarea>
              </div>

              <div class="form-control mt-6">
                <label @click="openModal" for="my-modal-6" class="btn btn-primary text-base-100">{{
                  language === 'es' ? 'Enviar' : 'Submit'
                }}</label>
              </div>
            </form>
            <!-- <div v-else class="card-body">
              <h2 class="text-center text-2xl text-primary">
                Inicia sesion para contestar la encuesta.
              </h2>
              <button class="btn-accent btn flex items-center text-white" @click="googleAuth">
                Iniciar sesion con <Icon name="logos:google-icon" class="mx-2 text-2xl" />
              </button>
              <button class="btn-accent btn flex items-center text-white" @click="googleAuth">
                Iniciar sesion con <Icon name="mdi:apple" class="mx-2 text-3xl" />
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
