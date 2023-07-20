<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf, helpers } from '@vuelidate/validators';
import { uid } from 'uid';
const sectionId = useRoute().params.id[0];

const store = useMainStore();
const { isLoading } = storeToRefs(store);
const supabase = useSupabaseClient();

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

onMounted(() => {
  isLoading.value = false;
  updatedItem.name = item[0].name;
  updatedItem.description = item[0].description;
  updatedItem.price = item[0].price;
  updatedItem.section = item[0].section;
  updatedItem.variants = item[0].variants;
});

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
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;
  try {
    const { error } = await supabase
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

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    section: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    price: {
      required: helpers.withMessage(
        'Este campo es obligatorio',
        requiredIf(updatedItem.variants.length < 1)
      ),
    },

    variants: {
      $each: helpers.forEach({
        name: {
          required: helpers.withMessage(
            'Este campo es obligatorio',
            requiredIf(!updatedItem.price)
          ),
        },
        price: {
          required: helpers.withMessage(
            'Este campo es obligatorio',
            requiredIf(!updatedItem.price)
          ),
        },
      }),
    },
  };
});

const v$ = useVuelidate(rules, updatedItem);

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
            <label class="label">
              <span v-if="v$.name.$error" class="label-text-alt text-error">{{
                v$.name.$errors[0].$message
              }}</span>
            </label>
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
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Sección</span>
            </label>

            <select
              v-model="updatedItem.section"
              id="mesero"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            >
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.title }}
              </option>
            </select>
            <label class="label">
              <span v-if="v$.section.$error" class="label-text-alt text-error">{{
                v$.section.$errors[0].$message
              }}</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Precio</span>
            </label>
            <div class="join w-full">
              <label class="btn-secondary join-item btn border text-xl text-white">$</label>
              <input
                type="number"
                class="input-bordered input join-item w-full border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                v-model="updatedItem.price"
              />
            </div>
            <label class="label">
              <span v-if="v$.price.$error" class="label-text-alt text-error">{{
                v$.price.$errors[0].$message
              }}</span>
            </label>
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
                <label class="label">
                  <span
                    v-for="error in v$.variants.$each.$response.$errors[index].name"
                    :key="error"
                    class="label-text-alt text-error"
                    >{{ error.$message }}</span
                  >
                </label>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-primary">Precio</span>
                </label>
                <div class="join w-full">
                  <label class="btn-secondary join-item btn border text-xl text-white">$</label>
                  <input
                    v-model="variant.price"
                    type="number"
                    class="input-bordered input join-item w-full border-[#d1d5db] transition-all focus:ring focus:ring-primary"
                  />
                </div>
                <label class="label">
                  <span
                    class="label-text-alt text-error"
                    v-for="error in v$.variants.$each.$response.$errors[index].price"
                    :key="error"
                    >{{ error.$message }}</span
                  >
                </label>
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
              <span class="normal-case">Eliminar</span>
              <Icon name="ic:outline-delete" size="28" />
            </button>

            <button class="btn-primary btn mx-auto w-44" @click="updateItem">
              <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
              <div v-else class="flex items-center gap-2">
                <span class="normal-case">Guardar</span>
                <Icon name="icon-park-outline:save-one" size="28" />
              </div>
            </button>
          </section>
        </form>
      </div>
    </div>
    <CustomModal type="item" />
  </section>
</template>
