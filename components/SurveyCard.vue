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
    class="relative rounded-xl p-4 text-left text-black shadow-pinterest lg:mx-auto lg:w-2/3"
    :class="{ 'bg-primary/40 text-primary': !survey.complete, 'bg-white': survey.complete }"
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

    <div
      tabindex="0"
      class="collapse collapse-plus bg-[#F5F5F5] text-primary"
      :class="{ 'bg-base-100/40 ': !survey.complete }"
    >
      <div class="collapse-title text-xl font-medium">Detalles de la encuesta</div>
      <div class="collapse-content">
        <div>
          <p class="text-black">
            1.- La bienvenida por parte de nuestro mesero fue:
            <span class="font-bold text-primary">{{ survey.firstQuestion }}</span>
          </p>
          <div class="divider lg:hidden"></div>
          <p class="text-black">
            2.- La calidad y temperatura de los alimentos fue:
            <span class="font-bold text-primary">{{ survey.secondQuestion }}</span>
          </p>
          <div class="divider lg:hidden"></div>
          <p class="text-black">
            3.- La calidad de sus bebidas fue:
            <span class="font-bold text-primary">{{ survey.thirdQuestion }}</span>
          </p>

          <div class="divider lg:hidden"></div>
          <p class="text-black">
            4.- La limpieza del restaurante la considera:
            <span class="font-bold text-primary">{{ survey.fourthQuestion }}</span>
          </p>
          <div class="divider lg:hidden"></div>
          <p class="text-black">
            5.- Como califica nuestro servicio?
            <span class="font-bold text-primary">{{ survey.fifthQuestion }}</span>
          </p>
          <div class="divider lg:hidden"></div>
          <p class="mb-4 text-black">
            Comentario adicional:
            <span class="font-bold text-primary">{{ survey.comment }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="tooltip-primary tooltip absolute right-4 top-4" data-tip="Marcar como leída">
      <Icon
        v-if="!survey.complete"
        name="ri:checkbox-circle-line"
        class="cursor-pointer text-3xl font-bold text-white"
        @click="completeSurvey(survey)"
      />
    </div> -->
  </div>
</template>
