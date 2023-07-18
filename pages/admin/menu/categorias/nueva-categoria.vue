<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { isLoading } = storeToRefs(store);
const supabase = useSupabaseClient();

const category = reactive({
  title: '',
  slug: '',
  cover: '',
});

async function createCategory() {
  isLoading.value = true;
  // console.log(event);
  try {
    const { error } = await supabase.from('categories').insert([category]);

    // console.log(data);
    isLoading.value = false;
    await navigateTo('/admin/menu/categorias');

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
        <h2 class="text-2xl">Crear nueva categoría</h2>
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
              class="input-bordered input-primary input w-full text-primary"
              v-model="category.title"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Slug</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
            <input
              type="text"
              class="input-bordered input-primary input w-full text-primary"
              placeholder="ej. nombre-categoria"
              v-model="category.slug"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Imagen (URL)</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
            <input
              type="text"
              class="input-bordered input-primary input w-full text-primary"
              v-model="category.cover"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
          </div>
          <figure class="mt-8 w-full" v-if="category.cover">
            <img :src="category.cover" alt="" class="w-full rounded-xl shadow-xl" />
          </figure>
          <div
            v-else
            class="background mt-8 flex h-[40rem] flex-col items-center justify-center rounded-xl bg-base-100 shadow-pinterest"
          >
            <Icon name="tabler:photo-exclamation" size="48" class="text-secondary" />
            Vista previa no disponible
          </div>
          <button class="btn-primary btn mx-auto my-4 w-44" @click="createCategory">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <span v-else>Crear categoria</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
