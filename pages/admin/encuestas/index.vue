<script setup>
import { useMainStore } from '@/stores/menu';

const supabase = useSupabaseClient();

const store = useMainStore();
const { getSurveys } = store;

const { data: surveys } = await useAsyncData(
  'surveys',
  async () => supabase.from('surveys').select('*'),
  { transform: (result) => result.data }
);

const ascendingSurveys = ref(false);

const sortedSurveys = computed(() => {
  return surveys.value.sort((a, b) => {
    if (ascendingSurveys.value) {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });
});
await getSurveys();

const loadSurveys = ref(false);
async function refreshSurveys() {
  loadSurveys.value = true;

  setTimeout(async () => {
    loadSurveys.value = false;
    await getSurveys();
  }, 1000);
}
const unreadSurveys = computed(() => surveys.value.filter((survey) => survey.complete === false));

const firstQuestionAnswers = reactive({
  mala: surveys.value.filter((survey) => survey.firstQuestion === 'Mala'),
  regular: surveys.value.filter((survey) => survey.firstQuestion === 'Regular'),
  buena: surveys.value.filter((survey) => survey.firstQuestion === 'Buena'),
  excelente: surveys.value.filter((survey) => survey.firstQuestion === 'Excelente'),
});

const secondQuestionAnswers = reactive({
  mala: surveys.value.filter((survey) => survey.secondQuestion === 'Mala'),
  regular: surveys.value.filter((survey) => survey.secondQuestion === 'Regular'),
  buena: surveys.value.filter((survey) => survey.secondQuestion === 'Buena'),
  excelente: surveys.value.filter((survey) => survey.secondQuestion === 'Excelente'),
});

const thirdQuestionAnswers = reactive({
  mala: surveys.value.filter((survey) => survey.thirdQuestion === 'Mala'),
  regular: surveys.value.filter((survey) => survey.thirdQuestion === 'Regular'),
  buena: surveys.value.filter((survey) => survey.thirdQuestion === 'Buena'),
  excelente: surveys.value.filter((survey) => survey.thirdQuestion === 'Excelente'),
});

const fourthQuestionAnswers = reactive({
  mala: surveys.value.filter((survey) => survey.fourthQuestion === 'Mala'),
  regular: surveys.value.filter((survey) => survey.fourthQuestion === 'Regular'),
  buena: surveys.value.filter((survey) => survey.fourthQuestion === 'Buena'),
  excelente: surveys.value.filter((survey) => survey.fourthQuestion === 'Excelente'),
});

const fifthQuestionAnswers = reactive({
  malo: surveys.value.filter((survey) => survey.fifthQuestion === 'Malo'),
  regular: surveys.value.filter((survey) => survey.fifthQuestion === 'Regular'),
  bueno: surveys.value.filter((survey) => survey.fifthQuestion === 'Bueno'),
  excelente: surveys.value.filter((survey) => survey.fifthQuestion === 'Excelente'),
});

const firstWaiter = computed(() =>
  surveys.value.filter((survey) => survey.mesero === 'Diego Vargas')
);
const firstWaiterAnswers = reactive({
  mala: computed(
    () => firstWaiter.value.filter((survey) => survey.firstQuestion === 'Mala').length
  ),
  regular: computed(
    () => firstWaiter.value.filter((survey) => survey.firstQuestion === 'Regular').length
  ),
  buena: computed(
    () => firstWaiter.value.filter((survey) => survey.firstQuestion === 'Buena').length
  ),
  excelente: computed(
    () => firstWaiter.value.filter((survey) => survey.firstQuestion === 'Excelente').length
  ),
});

const secondWaiter = computed(() =>
  surveys.value.filter((survey) => survey.mesero === 'Giovanny Gómez')
);
const secondWaiterAnswers = reactive({
  mala: computed(
    () => secondWaiter.value.filter((survey) => survey.firstQuestion === 'Mala').length
  ),
  regular: computed(
    () => secondWaiter.value.filter((survey) => survey.firstQuestion === 'Regular').length
  ),
  buena: computed(
    () => secondWaiter.value.filter((survey) => survey.firstQuestion === 'Buena').length
  ),
  excelente: computed(
    () => secondWaiter.value.filter((survey) => survey.firstQuestion === 'Excelente').length
  ),
});

const thirdWaiter = computed(() =>
  surveys.value.filter((survey) => survey.mesero === 'Christian Pérez')
);
const thirdWaiterAnswers = reactive({
  mala: computed(
    () => thirdWaiter.value.filter((survey) => survey.firstQuestion === 'Mala').length
  ),
  regular: computed(
    () => thirdWaiter.value.filter((survey) => survey.firstQuestion === 'Regular').length
  ),
  buena: computed(
    () => thirdWaiter.value.filter((survey) => survey.firstQuestion === 'Buena').length
  ),
  excelente: computed(
    () => thirdWaiter.value.filter((survey) => survey.firstQuestion === 'Excelente').length
  ),
});

const iDontKnowAnswers = computed(() =>
  surveys.value.filter((survey) => survey.mesero === 'No lo sé')
);
const iDontKnowWaiterAnswers = reactive({
  mala: computed(
    () => iDontKnowAnswers.value.filter((survey) => survey.firstQuestion === 'Mala').length
  ),
  regular: computed(
    () => iDontKnowAnswers.value.filter((survey) => survey.firstQuestion === 'Regular').length
  ),
  buena: computed(
    () => iDontKnowAnswers.value.filter((survey) => survey.firstQuestion === 'Buena').length
  ),
  excelente: computed(
    () => iDontKnowAnswers.value.filter((survey) => survey.firstQuestion === 'Excelente').length
  ),
});

definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
  layout: 'admin-layout',
});
</script>

<template>
  <section class="container w-full">
    <AdminPageTitle> Administrar encuestas </AdminPageTitle>
    <section class="mb-24 lg:mb-8">
      <div class="w-full text-center">
        <div>
          <div class="mx-auto mt-4 grid h-12 place-items-center rounded-xl">
            <Icon
              class="cursor-pointer text-2xl text-secondary"
              :class="{ 'animate-spin': loadSurveys }"
              name="ri:refresh-line"
              @click="refreshSurveys"
            />
            <span>Actualizar</span>
          </div>
        </div>
        <div class="background stats mt-4 shadow-xl shadow-primary/30">
          <div class="stat">
            <div class="stat-figure text-secondary"></div>
            <div class="stat-title font-bold text-primary">Total</div>
            <div class="stat-value">{{ surveys.length }}</div>
            <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary"></div>
            <div class="stat-title font-bold text-primary">Sin leer</div>
            <div class="stat-value">{{ unreadSurveys.length }}</div>
            <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
          </div>
        </div>

        <h4 class="mt-8 text-2xl text-black">Por pregunta</h4>

        <!-- Desktop stats -->
        <div
          class="background mt-4 hidden w-full rounded-2xl p-4 shadow-xl shadow-primary/30 lg:block"
        >
          <section class="stats flex justify-center bg-base-100 lg:w-full">
            <div class="stat flex w-full flex-col p-4 lg:justify-between">
              <h5 class="h-24 text-left text-primary">
                La bienvenida por parte de nuestro mesero fue:
              </h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    firstQuestionAnswers.mala.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    firstQuestionAnswers.regular.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    firstQuestionAnswers.buena.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    firstQuestionAnswers.excelente.length
                  }}</span>
                </p>
              </section>
            </div>
            <div class="stat flex w-full flex-col justify-between p-4">
              <h5 class="h-24 text-left text-primary">
                La calidad y temperatura de los alimentos fue:
              </h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    secondQuestionAnswers.mala.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    secondQuestionAnswers.regular.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    secondQuestionAnswers.buena.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    secondQuestionAnswers.excelente.length
                  }}</span>
                </p>
              </section>
            </div>
            <div class="stat flex w-full flex-col justify-between p-4">
              <h5 class="h-24 text-left text-primary">La calidad de sus bebidas fue:</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    thirdQuestionAnswers.mala.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    thirdQuestionAnswers.regular.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    thirdQuestionAnswers.buena.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    thirdQuestionAnswers.excelente.length
                  }}</span>
                </p>
              </section>
            </div>
            <div class="stat flex w-full flex-col justify-between p-4">
              <h5 class="h-24 text-left text-primary">La limpieza del restaurante la considera:</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    fourthQuestionAnswers.mala.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    fourthQuestionAnswers.regular.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    fourthQuestionAnswers.buena.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    fourthQuestionAnswers.excelente.length
                  }}</span>
                </p>
              </section>
            </div>
            <div class="stat flex w-full flex-col justify-between p-4">
              <h5 class="h-24 text-left text-primary">Como califica nuestro servicio?</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    fifthQuestionAnswers.malo.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    fifthQuestionAnswers.regular.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    fifthQuestionAnswers.bueno.length
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    fifthQuestionAnswers.excelente.length
                  }}</span>
                </p>
              </section>
            </div>
          </section>
        </div>

        <!-- Mobile stats -->
        <div class="background carousel carousel-center w-screen gap-4 p-4 lg:hidden">
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none lg:rounded-bl-xl lg:rounded-tl-xl"
          >
            <h5 class="h-24 text-left text-primary">
              La bienvenida por parte de nuestro mesero fue:
            </h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  firstQuestionAnswers.mala.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  firstQuestionAnswers.regular.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  firstQuestionAnswers.buena.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  firstQuestionAnswers.excelente.length
                }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="h-24 text-left text-primary">
              La calidad y temperatura de los alimentos fue:
            </h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  secondQuestionAnswers.mala.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  secondQuestionAnswers.regular.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  secondQuestionAnswers.buena.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  secondQuestionAnswers.excelente.length
                }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="h-24 text-left text-primary">La calidad de sus bebidas fue:</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  thirdQuestionAnswers.mala.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  thirdQuestionAnswers.regular.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  thirdQuestionAnswers.buena.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  thirdQuestionAnswers.excelente.length
                }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="h-24 text-left text-primary">La limpieza del restaurante la considera:</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  fourthQuestionAnswers.mala.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  fourthQuestionAnswers.regular.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  fourthQuestionAnswers.buena.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  fourthQuestionAnswers.excelente.length
                }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="h-24 text-left text-primary">Como califica nuestro servicio?</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  fifthQuestionAnswers.malo.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  fifthQuestionAnswers.regular.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  fifthQuestionAnswers.bueno.length
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  fifthQuestionAnswers.excelente.length
                }}</span>
              </p>
            </section>
          </div>
        </div>

        <h4 class="mt-8 text-2xl text-black">Por mesero</h4>
        <div class="background mt-4 hidden rounded-2xl p-4 shadow-xl shadow-primary/30 lg:block">
          <section class="stats flex w-full justify-center gap-8 bg-base-100">
            <div class="stat p-4">
              <h5 class="font-bold text-primary">Diego Vargas</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{ firstWaiterAnswers.mala }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    firstWaiterAnswers.regular
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{ firstWaiterAnswers.buena }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    firstWaiterAnswers.excelente
                  }}</span>
                </p>
                <p class="flex justify-between">
                  total:
                  <span class="font-lg font-bold text-primary">{{ firstWaiter.length }}</span>
                </p>
              </section>
            </div>
            <div class="stat p-4">
              <h5 class="font-bold text-primary">Giovanny Gómez</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{ secondWaiterAnswers.mala }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    secondWaiterAnswers.regular
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    secondWaiterAnswers.buena
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    secondWaiterAnswers.excelente
                  }}</span>
                </p>
                <p class="flex justify-between">
                  total:
                  <span class="font-lg font-bold text-primary">{{ secondWaiter.length }}</span>
                </p>
              </section>
            </div>
            <div class="stat p-4">
              <h5 class="font-bold text-primary">Christian Pérez</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{ thirdWaiterAnswers.mala }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    thirdWaiterAnswers.regular
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{ thirdWaiterAnswers.buena }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    thirdWaiterAnswers.excelente
                  }}</span>
                </p>
                <p class="flex justify-between">
                  total:
                  <span class="font-lg font-bold text-primary">{{ thirdWaiter.length }}</span>
                </p>
              </section>
            </div>
            <div class="stat p-4">
              <h5 class="font-bold text-primary">No lo sé</h5>
              <div class="divider"></div>
              <section class="w-full text-left">
                <p class="flex justify-between">
                  Mala:
                  <span class="font-lg font-bold text-primary">{{
                    iDontKnowWaiterAnswers.mala
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Regular:
                  <span class="font-lg font-bold text-primary">{{
                    iDontKnowWaiterAnswers.regular
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Buena:
                  <span class="font-lg font-bold text-primary">{{
                    iDontKnowWaiterAnswers.buena
                  }}</span>
                </p>
                <p class="flex justify-between">
                  Excelente:
                  <span class="font-lg font-bold text-primary">{{
                    iDontKnowWaiterAnswers.excelente
                  }}</span>
                </p>
                <p class="flex justify-between">
                  total:
                  <span class="font-lg font-bold text-primary">{{ iDontKnowAnswers.length }}</span>
                </p>
              </section>
            </div>
          </section>
        </div>

        <div class="background carousel-center carousel w-screen gap-4 p-4 lg:hidden">
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none lg:rounded-bl-xl lg:rounded-tl-xl"
          >
            <h5 class="font-bold text-primary">Diego Vargas</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{ firstWaiterAnswers.mala }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{ firstWaiterAnswers.regular }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{ firstWaiterAnswers.buena }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  firstWaiterAnswers.excelente
                }}</span>
              </p>
              <p class="flex justify-between">
                total:
                <span class="font-lg font-bold text-primary">{{ firstWaiter.length }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="font-bold text-primary">Giovanny Gómez</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{ secondWaiterAnswers.mala }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  secondWaiterAnswers.regular
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{ secondWaiterAnswers.buena }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  secondWaiterAnswers.excelente
                }}</span>
              </p>
              <p class="flex justify-between">
                total:
                <span class="font-lg font-bold text-primary">{{ secondWaiter.length }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="font-bold text-primary">Christian Pérez</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{ thirdWaiterAnswers.mala }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{ thirdWaiterAnswers.regular }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{ thirdWaiterAnswers.buena }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  thirdWaiterAnswers.excelente
                }}</span>
              </p>
              <p class="flex justify-between">
                total:
                <span class="font-lg font-bold text-primary">{{ thirdWaiter.length }}</span>
              </p>
            </section>
          </div>
          <div
            class="carousel-item flex w-1/2 flex-col justify-between rounded-xl bg-base-100 p-2 lg:stat lg:rounded-none"
          >
            <h5 class="font-bold text-primary">No lo sé</h5>
            <div class="divider"></div>
            <section class="w-full text-left">
              <p class="flex justify-between">
                Mala:
                <span class="font-lg font-bold text-primary">{{
                  iDontKnowWaiterAnswers.mala
                }}</span>
              </p>
              <p class="flex justify-between">
                Regular:
                <span class="font-lg font-bold text-primary">{{
                  iDontKnowWaiterAnswers.regular
                }}</span>
              </p>
              <p class="flex justify-between">
                Buena:
                <span class="font-lg font-bold text-primary">{{
                  iDontKnowWaiterAnswers.buena
                }}</span>
              </p>
              <p class="flex justify-between">
                Excelente:
                <span class="font-lg font-bold text-primary">{{
                  iDontKnowWaiterAnswers.excelente
                }}</span>
              </p>
              <p class="flex justify-between">
                total:
                <span class="font-lg font-bold text-primary">{{ iDontKnowAnswers.length }}</span>
              </p>
            </section>
          </div>
        </div>

        <div class="divider mt-32"></div>

        <div class="mt-8 grid w-full gap-8 p-4">
          <div class="flex justify-end">
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-primary m-1 hover:text-white">
                <Icon
                  :name="ascendingSurveys ? 'cil:sort-ascending' : 'cil:sort-descending'"
                  size="28"
                  class="text-white"
                />
                <span class="normal-case text-black"> Ordenar</span>
              </label>
              <ul
                tabindex="0"
                class="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <button @click="ascendingSurveys = true">
                    <Icon name="cil:sort-ascending" size="32" class="text-secondary" />
                    <span>Ascendente</span>
                  </button>
                </li>
                <li>
                  <button @click="ascendingSurveys = false">
                    <Icon name="cil:sort-descending" size="32" class="text-secondary" />
                    <span>Descendente</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <section class="flex flex-col gap-4">
            <h2 class="text-2xl">Todas las encuestas</h2>
            <SurveyCard v-for="survey in sortedSurveys" :key="survey.id" :survey="survey" />
          </section>
        </div>
        <!-- <div class="join grid grid-cols-2">
          <button class="btn-outline join-item btn" @click="previousPage">Anteriores</button>
          <button class="btn-outline join-item btn" @click="nextPage">Siguientes</button>
        </div> -->
      </div>
    </section>
  </section>
</template>
