<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const store = useMainStore();
const { language, isLoading, currentCategory } = storeToRefs(store);
const supabase = useSupabaseClient();

const { data: categories } = await supabase
  .from(`${language.value === 'es' ? 'categories' : 'categories_en'}`)
  .select('id, title');

const section = reactive({
  title: '',
  category: '',
  cover: '',
});

watchEffect(() => {
  if (currentCategory.value) {
    section.category = currentCategory.value;
  }
});

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    category: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
  };
});

const v$ = useVuelidate(rules, section);

async function createSection() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;

  try {
    const { error } = await supabase.from('sections').insert([section]);

    isLoading.value = false;
    await navigateTo('/admin/menu/secciones');

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

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
        <h2 class="text-2xl">Crear nueva sección</h2>
      </div>

      <div class="mx-auto mt-8 flex w-fit items-center">
        <label for="" class="">La sección se guardará en el menú en</label>
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
              v-model="section.title"
            />
            <label v-if="v$.title.$error" class="label">
              <span class="label-text-alt text-error">{{ v$.title.$errors[0].$message }}</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Categoría</span>
            </label>

            <select
              v-model="section.category"
              id="mesero"
              class="input input-bordered border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            >
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.title }}
              </option>
            </select>
            <label v-if="v$.category.$error" class="label">
              <span class="label-text-alt text-error">{{ v$.category.$errors[0].$message }}</span>
            </label>
          </div>

          <button class="btn btn-primary mx-auto my-4 w-44" @click="createSection">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <span v-else class="normal-case">Crear sección</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
