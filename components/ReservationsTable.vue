<script setup></script>

<template>
  <table class="my-8 hidden min-w-full rounded-xl shadow-pinterest lg:table">
    <!-- head -->
    <thead>
      <tr class="text-center">
        <th class="text-primary">Fecha</th>
        <th class="text-primary">Hora</th>
        <th class="text-primary">Nombre</th>
        <th class="text-primary">Teléfono</th>
        <th class="text-primary">Personas</th>
        <th class="text-primary">Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <slot></slot>
    </tbody>
  </table>
</template>
