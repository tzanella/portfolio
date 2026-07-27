<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const route = useRoute();
  const lg = route.query.lg;
  if (lg && typeof lg === "string") {
    const targetLang = lg.toLowerCase();
    let codeToSet = "";
    if (targetLang.startsWith("pt")) codeToSet = "pt";
    else if (targetLang.startsWith("en")) codeToSet = "en";
    else if (targetLang.startsWith("es")) codeToSet = "es";
    else if (targetLang.startsWith("it")) codeToSet = "it";

    if (codeToSet) {
      const cookie = useCookie("i18n_redirected", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      cookie.value = codeToSet;

      const { setLocale } = useI18n();
      setLocale(codeToSet);

      const newQuery = { ...route.query };
      delete newQuery.lg;
      const queryString = new URLSearchParams(
        newQuery,
      ).toString();
      window.history.replaceState(
        window.history.state,
        "",
        route.path + (queryString ? `?${queryString}` : ""),
      );
    }
  }
});
</script>
