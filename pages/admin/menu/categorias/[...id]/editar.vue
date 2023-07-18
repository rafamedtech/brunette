<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
const eventId = useRoute().params.id[0];

const { events } = await useEvents();

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
const supabase = useSupabaseClient();

// const event = events.value.find((event) => event.id === Number(eventId));
const id = Number(useRoute().params.id[0]);
const { data: category } = await supabase.from('categories').select('*').eq('id', id);

const updatedCategory = reactive({
  title: '',
  slug: '',
  cover: '',
});

// event.value = events.value.find((event) => event.id === Number(eventId));

onMounted(() => {
  isLoading.value = false;
  updatedCategory.title = category[0].title;
  updatedCategory.slug = category[0].slug;
  updatedCategory.cover = category[0].cover;
});

async function updateCategory() {
  isLoading.value = true;
  try {
    const { data, error } = await supabase
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

// async function deleteCurrentEvent() {
//   events.value = events.value.filter((event) => event.id !== Number(eventId));
//   await navigateTo('/admin/eventos');
// }

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
      <!-- <div class="w-full text-center lg:mb-0">
        <h2 class="font-handlee text-4xl text-primary">Administrar eventos</h2>
        <div class="divider mx-auto w-1/2"></div>
      </div> -->

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
            <span class="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Escribe aqui"
            class="input-bordered input-primary input w-full text-primary"
            v-model="updatedCategory.title"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text">Slug</span>
          </label>
          <input
            type="text"
            placeholder="Ej. nombre-categoria"
            class="input-bordered input-primary input w-full text-primary"
            v-model="updatedCategory.slug"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
          <label class="label">
            <span class="label-text">Imagen (URL)</span>
            <!-- <span class="label-text-alt">Alt label</span> -->
          </label>
          <input
            type="text"
            class="input-bordered input-primary input w-full text-primary"
            v-model="updatedCategory.cover"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
        </div>
        <figure class="w-full px-2 lg:w-96">
          <img :src="updatedCategory.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure>
        <section class="flex gap-2">
          <button class="btn-error btn w-40 bg-red-500 text-white" onclick="my_modal_5.showModal()">
            <span>Eliminar</span>
            <Icon name="ic:outline-delete" size="28" />
          </button>
          <button class="btn-primary btn w-40 text-white" @click="updateCategory">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <div v-else class="flex items-center gap-2">
              <span>Guardar</span>
              <Icon name="carbon:save" size="28" />
            </div>
          </button>
        </section>
      </div>
    </div>
    <CustomModal type="category" />
  </main>
</template>
