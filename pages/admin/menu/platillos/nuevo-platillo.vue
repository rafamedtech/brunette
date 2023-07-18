<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf, helpers } from '@vuelidate/validators';
import { uid } from 'uid';

const store = useMainStore();
const { isLoading, currentSection } = storeToRefs(store);
const supabase = useSupabaseClient();

const { data: sections } = await supabase.from('sections').select('*');

const item = reactive({
  name: '',
  description: '',
  section: '',
  price: null,
  variants: [],
});

const itemName = ref(null);

onMounted(() => {
  itemName.value.focus();
});
// const variants = ref([])

// function addVariant() {
//   if (variants.value.length === 3) {
//     return;
//   }
//   variants.value.push({
//     id: uid(2),
//     name: '',
//     price: 0,
//   });
// }
function addVariant() {
  if (item.variants.length === 3) {
    return;
  }
  item.variants.push({
    id: uid(2),
    name: null,
    price: 0,
  });
}

// function removeVariant(id) {
//   variants.value = variants.value.filter((variant) => variant.id !== id);
// }
function removeVariant(id) {
  item.variants = item.variants.filter((variant) => variant.id !== id);
}

watchEffect(() => {
  if (currentSection.value) {
    item.section = currentSection.value;
  }
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    section: {
      required: helpers.withMessage('Este campo es obligatorio', required),
    },
    price: {
      // required:  requiredIf(item.variants.length < 1)
      required: helpers.withMessage(
        'Este campo es obligatorio',
        requiredIf(item.variants.length < 1)
      ),
    },

    variants: {
      $each: helpers.forEach({
        name: {
          required: helpers.withMessage('Este campo es obligatorio', requiredIf(!item.price)),
        },
        price: {
          required: helpers.withMessage('Este campo es obligatorio', requiredIf(!item.price)),
        },
      }),
    },
  };
});

const v$ = useVuelidate(rules, item);
// const v$ = useVuelidate(rules, {item, variants: variants.value});

async function createItem() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  isLoading.value = true;
  // console.log(item);
  // // console.log(section);
  try {
    const { error } = await supabase.from('items').insert([item]);

    // console.log(data);
    isLoading.value = false;
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
        <h2 class="text-2xl">Crear nuevo platillo</h2>
      </div>

      <div class="card mx-auto mb-20 mt-8 w-full max-w-sm flex-shrink-0 px-2 lg:mb-8">
        <form @submit.prevent class="card-body flex flex-col p-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-primary">Nombre</span>
            </label>
            <input
              type="text"
              ref="itemName"
              placeholder="Escribe aqui"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
              v-model="item.name"
            />
            <label class="label">
              <span v-if="v$.name.$error" class="label-text-alt text-error">{{
                v$.name.$errors[0].$message
              }}</span>
              <!-- <span class="label-text-alt">Bottom Right label</span> -->
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
              v-model="item.description"
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
              v-model="item.section"
              id="mesero"
              class="input-bordered input border-[#d1d5db] transition-all focus:ring focus:ring-primary"
            >
              <option disabled selected>Selecciona un opción</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.title }}
              </option>
            </select>
            <label class="label">
              <span v-if="v$.section.$error" class="label-text-alt text-error">{{
                v$.section.$errors[0].$message
              }}</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
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
                v-model="item.price"
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
              v-for="(variant, index) in item.variants"
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
                    type="text"
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

          <button class="btn-primary btn mx-auto my-4 w-44" @click="createItem">
            <Icon v-if="isLoading" name="svg-spinners:tadpole" size="32" />
            <span v-else>Crear platillo</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
