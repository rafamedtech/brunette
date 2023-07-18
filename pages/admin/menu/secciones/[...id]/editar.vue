<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
const sectionId = useRoute().params.id[0];

// const { events } = await useEvents();

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
const supabase = useSupabaseClient();

// const event = events.value.find((event) => event.id === Number(eventId));
const { data: categories } = await supabase.from('categories').select('*');
const { id } = useRoute().params;
const { data: section } = await supabase.from('sections').select('*').eq('id', Number(id[0]));

const updatedSection = reactive({
  title: '',
  category: '',
});

// event.value = events.value.find((event) => event.id === Number(eventId));

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

async function updateSection() {
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
        <h3 class="text-2xl">Actualizar sección</h3>
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
            v-model="updatedSection.title"
          />
          <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
        </div>
        <div class="form-control w-full px-2 lg:w-96 lg:px-0">
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
            v-model="updatedSection.category"
            id="mesero"
            class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
          >
            <option value="" selected>Selecciona una opcion</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
          <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
        </div>

        <!-- <figure class="w-full px-2 lg:w-96">
          <img :src="updatedSection.cover" alt="" class="w-full rounded-xl shadow-xl" />
        </figure> -->
        <section class="flex gap-2">
          <button class="btn-error btn w-40 bg-red-500 text-white" onclick="my_modal_5.showModal()">
            <span>Eliminar</span>
            <Icon name="ic:outline-delete" size="28" />
          </button>
          <button class="btn-primary btn w-40 text-white" @click="updateSection">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <div v-else class="flex items-center gap-2">
              <span>Guardar</span>
              <Icon name="carbon:save" size="28" />
            </div>
          </button>
        </section>
      </div>
    </div>
    <CustomModal type="section" />
  </main>
</template>
