<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { isLoading, currentCategory } = storeToRefs(store);
const supabase = useSupabaseClient();

const { data: categories } = await supabase.from('categories').select('*');

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

async function createSection() {
  isLoading.value = true;
  // console.log(section);
  try {
    const { error } = await supabase.from('sections').insert([section]);

    // console.log(data);
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
    appear: true,
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

      <div class="card mx-auto mb-20 mt-8 w-full max-w-sm flex-shrink-0 px-2 lg:mb-8">
        <form @submit.prevent class="card-body flex flex-col p-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Escribe aqui"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="section.title"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Categoria</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
            <!-- <input
              type="text"
              class="input-bordered input-primary input w-full text-primary"
              placeholder="ej. nombre-categoria"
              v-model="category.slug"
            /> -->
            <select
              v-model="section.category"
              id="mesero"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            >
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.title }}
              </option>
            </select>
            <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
          </div>

          <button class="btn-primary btn mx-auto my-4 w-44" @click="createSection">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <span v-else>Crear seccion</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
