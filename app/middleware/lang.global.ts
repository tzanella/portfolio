export default defineNuxtRouteMiddleware((to) => {
  const { lg } = to.query
  if (lg && typeof lg === 'string') {
    const targetLang = lg.toLowerCase()
    let codeToSet = ''
    if (targetLang.startsWith('pt')) {
      codeToSet = 'pt'
    } else if (targetLang.startsWith('en')) {
      codeToSet = 'en'
    } else if (targetLang.startsWith('es')) {
      codeToSet = 'es'
    } else if (targetLang.startsWith('it')) {
      codeToSet = 'it'
    }

    if (codeToSet) {
      const cookie = useCookie('i18n_redirected')
      cookie.value = codeToSet
    }

    if (import.meta.client) {
      if (codeToSet) {
        const { setLocale } = useI18n()
        setLocale(codeToSet)
      }
      const url = new URL(window.location.href)
      url.searchParams.delete('lg')
      window.history.replaceState({}, '', url.pathname + url.search)
    }
  }
})
