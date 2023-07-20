<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
const supabase = useSupabaseClient();

const id = Number(useRoute().params.id[0]);
const { data: category } = await supabase.from('categories').select('*').eq('id', id);

const updatedCategory = reactive({
  title: '',
  slug: '',
  cover: '',
});

onMounted(() => {
  isLoading.value = false;
  updatedCategory.title = category[0].title;
  updatedCategory.slug = category[0].slug;
  updatedCategory.cover = category[0].cover;
});

async function updateCategory() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;
  try {
    const { error } = await supabase
      .from('categories')
      .update(updatedCategory)
      .eq('id', id)
      .select();

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

const v$ = useVuelidate(rules, updatedCategory);

definePageMeta({
  pageTransition: {
    name: 'up',
    mode: 'out-in',
    appear: true,
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
        <h3 class="text-2xl">Actualizar categoría</h3>
      </div>

      <div class="mb-20 mt-8 flex w-full flex-col items-center gap-4 rounded-xl lg:mb-8">
        <!-- <h4 class="text-2xl text-primary">{{ event.title }}</h4> -->
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text text-primary">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Escribe aqui"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            v-model="updatedCategory.title"
          />
          <label class="label">
            <span v-if="v$.title.$error" class="label-text-alt text-error">{{
              v$.title.$errors[0].$message
            }}</span>
          </label>
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text text-primary">Slug</span>
          </label>
          <input
            type="text"
            placeholder="Ej. nombre-categoria"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary disabled:border-[#d1d5db] disabled:bg-transparent disabled:italic"
            v-model="updatedCategory.slug"
            disabled
          />
          <label class="label">
            <span v-if="v$.slug.$error" class="label-text-alt text-error">{{
              v$.slug.$errors[0].$message
            }}</span>
          </label>
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text text-primary">Imagen (URL)</span>
          </label>
          <input
            type="text"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            @input="v$.cover.$touch"
            placeholder="Ej. https://image-url.com/image-name.jpg"
            v-model="updatedCategory.cover"
          />
          <label v-if="v$.cover.$error" class="label">
            <span
              v-for="error in v$.cover.$errors"
              :key="error"
              class="label-text-alt text-error"
              >{{ error.$message }}</span
            >
          </label>
        </div>

        <!-- Cover preview -->
        <figure class="mt-4 w-full lg:w-96" v-if="updatedCategory.cover && !v$.cover.$error">
          <img :src="updatedCategory.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure>
        <div
          v-if="!updatedCategory.cover | (!v$.cover.$error && !updatedCategory.cover)"
          class="background mt-4 flex h-[40rem] w-96 flex-col items-center justify-center gap-2 rounded-xl bg-base-100 shadow-pinterest"
        >
          <Icon name="tabler:photo-exclamation" size="48" class="text-secondary" />
          Vista previa no disponible
        </div>

        <div
          v-if="v$.cover.$error && updatedCategory.cover"
          class="background mt-4 flex h-[40rem] w-96 flex-col items-center justify-center gap-2 rounded-xl bg-base-100 shadow-pinterest"
        >
          <Icon name="tabler:photo-exclamation" size="48" class="text-error" />
          Imagen NO válida
        </div>
        <section class="flex gap-2">
          <button class="btn-error btn w-40 bg-red-500 text-white" onclick="my_modal_5.showModal()">
            <span class="normal-case">Eliminar</span>
            <Icon name="ic:outline-delete" size="28" />
          </button>
          <button class="btn-primary btn w-40 text-white" @click="updateCategory">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <div v-else class="flex items-center gap-2">
              <span class="normal-case">Guardar</span>
              <Icon name="icon-park-outline:save-one" size="28" />
            </div>
          </button>
        </section>
      </div>
    </div>
    <CustomModal type="category" />
  </main>
</template>
