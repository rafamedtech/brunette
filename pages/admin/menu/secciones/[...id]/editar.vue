<script setup>
// import { useMainStore } from '@/stores/menu';
// import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
const sectionId = useRoute().params.id[0];

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
const supabase = useSupabaseClient();

const { data: categories } = await supabase.from('categories').select('*');
const id = Number(useRoute().params.id[0]);
const { data: section } = await supabase.from('sections').select('*').eq('id', id);

const updatedSection = reactive({
  title: '',
  category: '',
});

onMounted(() => {
  isLoading.value = false;
  updatedSection.title = section[0].title;
  updatedSection.category = section[0].category;
});

// watchEffect(() => {
//   if (currentCategory.value) {
//     updatedSection.category = currentCategory.value;
//   }
// });

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

const v$ = useVuelidate(rules, updatedSection);

async function updateSection() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;

  try {
    const { data, error } = await supabase
      .from('sections')
      .update(updatedSection)
      .eq('id', Number(sectionId))
      .select();

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
  <main class="w-full">
    <AdminPageTitle> Administrar Menú </AdminPageTitle>
    <div class="mb-8">
      <div class="relative mx-auto mt-4 flex w-fit items-center justify-center">
        <button class="absolute -left-16 text-primary" @click="$router.back()">
          <Icon name="ri:arrow-left-line" class="text-4xl font-bold text-secondary" />
        </button>
        <h3 class="text-2xl">Actualizar sección</h3>
      </div>

      <div class="mb-20 mt-8 flex w-full flex-col items-center gap-4 rounded-xl lg:mb-8">
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text text-primary">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Escribe aquí"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            v-model="updatedSection.title"
          />
          <label v-if="v$.title.$error" class="label">
            <span class="label-text-alt text-error">{{ v$.title.$errors[0].$message }}</span>
          </label>
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text text-primary">Categoría</span>
          </label>

          <select
            v-model="updatedSection.category"
            id="mesero"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
          >
            <option value="" selected>Selecciona una opción</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
          <label v-if="v$.category.$error" class="label">
            <span class="label-text-alt text-error">{{ v$.category.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- <figure class="w-full px-2 lg:w-96">
          <img :src="updatedSection.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure> -->
        <section class="flex gap-2">
          <button class="btn-error btn w-40 bg-red-500 text-white" onclick="my_modal_5.showModal()">
            <span class="normal-case">Eliminar</span>
            <Icon name="ic:outline-delete" size="28" />
          </button>
          <button class="btn-primary btn w-40 text-white" @click="updateSection">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <div v-else class="flex items-center gap-2">
              <span class="normal-case">Guardar</span>
              <Icon name="icon-park-outline:save-one" size="28" />
            </div>
          </button>
        </section>
      </div>
    </div>
    <CustomModal type="section" />
  </main>
</template>
