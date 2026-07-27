export default defineNuxtPlugin(() => {
  const { setLocale } = useI18n()
  const cookie = useCookie('i18n_redirected')
  if (cookie.value) {
    setLocale(cookie.value)
  }
})
