<script setup>
import { useMainStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import { uid } from 'uid';
const sectionId = useRoute().params.id[0];

// const { events } = await useEvents();

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
const supabase = useSupabaseClient();

// const event = events.value.find((event) => event.id === Number(eventId));
const { data: sections } = await supabase.from('sections').select('*');
const { id } = useRoute().params;
const { data: item } = await supabase.from('items').select('*').eq('id', Number(id[0]));

const updatedItem = reactive({
  name: '',
  description: '',
  price: 0,
  section: '',
  variants: [],
});

// event.value = events.value.find((event) => event.id === Number(eventId));

onMounted(() => {
  isLoading.value = false;
  updatedItem.name = item[0].name;
  updatedItem.description = item[0].description;
  updatedItem.price = item[0].price;
  updatedItem.section = item[0].section;
  updatedItem.variants = item[0].variants;
});

// watchEffect(() => {
//   if (currentCategory.value) {
//     updatedSection.category = currentCategory.value;
//   }
// });

function addVariant() {
  if (updatedItem.variants.length === 3) {
    return;
  }
  updatedItem.variants.push({
    id: uid(2),
    name: '',
    price: 0,
  });
}

function removeVariant(id) {
  updatedItem.variants = updatedItem.variants.filter((variant) => variant.id !== id);
}

async function updateItem() {
  isLoading.value = true;
  try {
    const { data, error } = await supabase
      .from('items')
      .update(updatedItem)
      .eq('id', Number(sectionId))
      .select();

    await navigateTo('/admin/menu/platillos');

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
        <h2 class="text-2xl">Actualizar platillo</h2>
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
              v-model="updatedItem.name"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Descripción</span>
            </label>
            <input
              type="text"
              placeholder="Escribe aqui"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="updatedItem.description"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Sección</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
            <!-- <input
              type="text"
              class="input-bordered input-primary input w-full text-primary"
              placeholder="ej. nombre-categoria"
              v-model="section.slug"
            /> -->
            <select
              v-model="updatedItem.section"
              id="mesero"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            >
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.title }}
              </option>
            </select>
            <!-- <label class="label">
            <span class="label-text-alt">Alt label</span>
            <span class="label-text-alt">Alt label</span>
          </label> -->
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Precio</span>
            </label>
            <input
              type="text"
              placeholder="Escribe aqui"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="updatedItem.price"
            />
            <!-- <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label> -->
          </div>

          <section class="mt-8">
            <h5 class="mb-8 text-xl">Variantes (Opcional)</h5>
            <div
              v-for="(variant, index) in updatedItem.variants"
              :key="variant.id"
              class="relative bg-base-100"
            >
              <Icon
                name="ic:round-remove-circle-outline"
                size="28"
                class="absolute right-0 top-0 cursor-pointer text-secondary"
                @click="removeVariant(variant.id)"
                tabindex="0"
              />
              <h6>{{ `Variante ${index + 1}` }}</h6>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-primary">Nombre</span>
                </label>
                <input
                  v-model="variant.name"
                  type="text"
                  class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-primary">Precio</span>
                </label>
                <input
                  v-model="variant.price"
                  type="text"
                  class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                />
              </div>
              <div class="divider"></div>
            </div>
            <div class="flex w-full justify-center">
              <button class="btn-primary btn-sm btn mx-auto w-fit normal-case" @click="addVariant">
                Nueva variante
              </button>
            </div>
          </section>

          <div class="divider"></div>

          <section class="flex gap-2">
            <button
              class="btn-error btn w-40 bg-red-500 text-white"
              onclick="my_modal_5.showModal()"
            >
              <span>Eliminar</span>
              <Icon name="ic:outline-delete" size="28" />
            </button>

            <button class="btn-primary btn mx-auto w-44" @click="updateItem">
              <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
              <span v-else>Actualizar platillo</span>
            </button>
          </section>
        </form>
      </div>
    </div>
    <CustomModal type="item" />
  </section>
</template>
