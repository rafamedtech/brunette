<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const store = useMainStore();
const { isLoading, language } = storeToRefs(store);

const supabase = useSupabaseClient();

const category = reactive({
  title: '',
  slug: '',
  cover: '',
});

const toSlug = (value) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a dash
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
    .replace(/-{2,}/g, '-'); // Replace consecutive dashes with a single dash
};

const slugValue = computed(() => toSlug(category.title));

watchEffect(() => {
  if (slugValue.value) {
    category.slug = slugValue.value;
  }
});

// watchEffect(() => {
//   if (category.cover) {
//     isLoading.value = true;
//     setTimeout(() => {
//       isLoading.value = false;
//     }, 1000);
//   }
// });

async function createCategory() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;

  try {
    const { error } = await supabase
      .from(`${language.value === 'es' ? 'categories' : 'categories_en'}`)
      .insert([category]);

    isLoading.value = false;
    await navigateTo('/admin/menu/categorias');

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    slug: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    cover: {
      required: helpers.withMessage('Este campo es obligatorio', required),
      validImage: helpers.withMessage(
        'El enlace a la imagen no es válido',
        helpers.regex(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i)
      ),
    },
  };
});

const v$ = useVuelidate(rules, category);

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
  },
  layout: 'admin-layout',
});
</script>

<template>
  <section class="w-full">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <div class="">
      <div class="relative mx-auto flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h2 class="text-2xl">Crear nueva categoría</h2>
      </div>

      <div class="mx-auto mt-8 flex w-fit items-center">
        <label for="" class="">La categoría se guardará en el menú en</label>
        <span
          class="flex flex-col gap-2 px-2 font-bold text-base-100 text-primary lg:flex-row lg:items-center lg:gap-2"
          @click="changeLanguage"
        >
          <span class="">{{ language === 'es' ? 'Español' : 'Inglés' }}</span>
          <Icon
            :name="
              language === 'es'
                ? 'emojione-v1:flag-for-mexico'
                : 'emojione-v1:flag-for-united-states'
            "
            class="text-2xl"
          />
        </span>
      </div>

      <div class="card mx-auto mb-20 mt-8 w-full max-w-sm flex-shrink-0 px-2 lg:mb-8">
        <form @submit.prevent class="card-body flex flex-col p-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Escribe aquí"
              class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="category.title"
            />
            <label class="label">
              <span v-if="v$.title.$error" class="label-text-alt text-error">{{
                v$.title.$errors[0].$message
              }}</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Slug</span>
            </label>
            <input
              type="text"
              class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary disabled:border-[#d1d5db] disabled:bg-transparent disabled:italic"
              placeholder="Se crea automaticamente"
              :value="slugValue"
              disabled
            />
            <label class="label">
              <span v-if="v$.slug.$error" class="label-text-alt text-error">{{
                v$.slug.$errors[0].$message
              }}</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Imagen (URL)</span>
            </label>
            <input
              type="text"
              class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="category.cover"
              @input="v$.cover.$touch"
              placeholder="Ej. https://image-url.com/image-name.jpg"
            />
            <label v-if="v$.cover.$error" class="label">
              <span
                v-for="error in v$.cover.$errors"
                :key="error"
                class="label-text-alt text-error"
                >{{ error.$message }}</span
              >
            </label>
            <label v-if="category.cover && !v$.cover.$error" class="label flex w-fit gap-2">
              <span class="label-text-alt text-green-500">Formato de imagen correcto</span>
              <Icon name="icon-park-outline:check-one" class="text-green-500" />
            </label>
          </div>

          <!-- Cover preview -->
          <figure class="mt-4 w-full" v-if="category.cover && !v$.cover.$error">
            <img :src="category.cover" alt="" class="w-full rounded-xl shadow-xl" />
          </figure>
          <div
            v-if="!category.cover | (!v$.cover.$error && !category.cover)"
            class="background mt-4 flex h-[40rem] flex-col items-center justify-center gap-2 rounded-xl bg-base-100 shadow-pinterest"
          >
            <Icon name="tabler:photo-exclamation" size="48" class="text-secondary" />
            Vista previa no disponible
          </div>

          <div
            v-if="v$.cover.$error && category.cover"
            class="background mt-4 flex h-[40rem] flex-col items-center justify-center gap-2 rounded-xl bg-base-100 shadow-pinterest"
          >
            <Icon name="tabler:photo-exclamation" size="48" class="text-error" />
            Imagen NO válida
          </div>

          <button class="btn btn-primary mx-auto mt-4 w-44" @click="createCategory">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <div v-else class="flex w-full items-center gap-2">
              <span class="normal-case">Crear categoría</span>
              <Icon name="icon-park-outline:save-one" size="24" />
            </div>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
