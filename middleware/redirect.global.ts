export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/') return navigateTo('/suspendido');
  if (to.path === '/eventos') return navigateTo('/suspendido');
  if (to.path === '/encuesta') return navigateTo('/suspendido');
});
