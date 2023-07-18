<script setup>
const props = defineProps({
  section: {
    type: Number,
  },
});

const supabase = useSupabaseClient();
const { data: section } = await supabase
  .from('sections')
  .select('*')
  .eq('id', Number(props.section));

const itemSection = ref(section[0]);

const { data: category } = await supabase
  .from('categories')
  .select('*')
  .eq('id', Number(itemSection.value.category));

const itemCategory = category[0];
</script>

<template>
  <div class="mt-8 flex h-28 flex-col gap-2">
    <div class="form-control" v-if="itemCategory">
      <label class="text-xs">Categoría</label>
      <div class="bade badge-secondary w-fit rounded-xl px-2 py-1">
        {{ itemCategory.title }}
      </div>
    </div>
    <div v-if="itemSection" class="form-control">
      <label class="text-xs">Sección</label>
      <div class="bade badge-primary w-fit rounded-xl px-2 py-1">
        {{ itemSection.title }}
      </div>
    </div>
  </div>
</template>
