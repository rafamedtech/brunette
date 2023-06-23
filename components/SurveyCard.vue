<script setup>
defineProps({
  survey: {
    type: Object,
    required: true,
  },
});

const supabase = useSupabaseClient();

async function completeSurvey(survey) {
  try {
    const { error } = await supabase.from('surveys').update({ complete: true }).eq('id', survey.id);

    // console.log(data);

    survey.complete = true;

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div
    class="relative rounded-xl p-4 text-left text-black shadow-xl"
    :class="{ 'bg-primary/40 text-primary': !survey.complete }"
  >
    <!-- <img src="@/assets/images/birthday.png" alt="" class="w-full" /> -->
    <h3 class="font-bold text-primary">
      Mesero:
      <span class="font-bold text-black">{{ survey.mesero }}</span>
    </h3>
    <p class="font-bold text-primary">
      Fecha:
      <span class="font-bold text-black">
        {{
          new Date(survey.created_at).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        }}</span
      >
    </p>
    <h4 class="font-bold text-primary">
      Nombre:
      <span class="font-bold text-black">{{ survey.name }}</span>
    </h4>
    <h3 class="font-bold text-primary">
      Teléfono:
      <span class="font-bold text-black">{{ survey.phone }}</span>
    </h3>
    <div class="divider"></div>
    <p class="font-bold text-primary">
      1.- La bienvenida por parte de nuestro mesero fue:
      <span class="font-bold text-black">{{ survey.firstQuestion }}</span>
    </p>
    <div class="divider lg:hidden"></div>
    <p class="font-bold text-primary">
      2.- La calidad y temperatura de los alimentos fue:
      <span class="font-bold text-black">{{ survey.secondQuestion }}</span>
    </p>
    <div class="divider lg:hidden"></div>
    <p class="font-bold text-primary">
      3.- La calidad de sus bebidas fue:
      <span class="font-bold text-black">{{ survey.thirdQuestion }}</span>
    </p>
    <div class="divider lg:hidden"></div>
    <p class="font-bold text-primary">
      4.- La limpieza del restaurante la considera:
      <span class="font-bold text-black">{{ survey.fourthQuestion }}</span>
    </p>
    <div class="divider lg:hidden"></div>
    <p class="font-bold text-primary">
      5.- Como califica nuestro servicio?
      <span class="font-bold text-black">{{ survey.fifthQuestion }}</span>
    </p>
    <div class="divider lg:hidden"></div>
    <p class="mb-4 font-bold text-primary">
      Comentario adicional:
      <span class="font-bold text-black">{{ survey.comment }}</span>
    </p>
    <div class="tooltip-primary tooltip absolute bottom-4 right-4" data-tip="Marcar como leída">
      <Icon
        v-if="!survey.complete"
        name="ri:checkbox-circle-line"
        class="cursor-pointer text-3xl font-bold"
        @click="completeSurvey(survey)"
      />
    </div>
  </div>
</template>
