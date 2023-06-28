export default defineNuxtRouteMiddleware(({ path }, from) => {
  const user = useSupabaseUser();
  if (user.value) {
    return;
    // return navigateTo({ name: 'login', query: { redirect: to.fullPath } });
  }
  return navigateTo(`/admin/login?redirectTo=${path}`);
});
