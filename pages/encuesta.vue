<script setup>
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

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

const openModal = () => {
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

useHead({
  title: 'Brunette Kitchen & Drinks | Encuesta de satisfacción 📋',
  meta: [
    {
      name: 'description',
      content: 'Tu opinión es muy importante para nosotros.',
    },
    // Facebook Meta tags
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
        'https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png',
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
  <main class="mt-8 pb-16">
    <section class="mt-4 flex items-center">
      <h1 class="mx-auto px-2 text-center font-montserrat text-5xl text-primary lg:px-32">
        {{ language === 'es' ? 'Encuesta' : 'Survey' }}
      </h1>
    </section>
    <div class="divider mx-auto w-1/2"></div>

    <section>
      <div class="hero">
        <div class="flex-col px-4">
          <div v-if="language === 'es'" class="text-center">
            <p class="pb-6 text-xl text-black">
              ¡Agradeceríamos tu opinión! Con tus comentarios, podemos mejorar nuestros productos y
              servicios.
            </p>
          </div>
          <div v-else class="text-center">
            <p class="pb-6 text-xl text-black">
              We would appreciate your feedback! With your opinion, we can improve our products and
              services.
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
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
