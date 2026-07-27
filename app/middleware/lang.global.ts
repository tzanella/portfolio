export default defineNuxtRouteMiddleware((to) => {
  const lg = to.query.lg
  if (to.path === '/lang' || (lg && typeof lg === 'string')) {
    let codeToSet = ''
    if (typeof lg === 'string') {
      const targetLang = lg.toLowerCase()
      if (targetLang.startsWith('pt')) {
        codeToSet = 'pt'
      } else if (targetLang.startsWith('en')) {
        codeToSet = 'en'
      } else if (targetLang.startsWith('es')) {
        codeToSet = 'es'
      } else if (targetLang.startsWith('it')) {
        codeToSet = 'it'
      }
    }

    if (codeToSet) {
      const cookie = useCookie('i18n_redirected')
      cookie.value = codeToSet
    }

    const newQuery = { ...to.query }
    delete newQuery.lg

    const targetPath = to.path === '/lang' ? '/' : to.path

    if (import.meta.client) {
      if (codeToSet) {
        const { setLocale } = useI18n()
        setLocale(codeToSet)
      }
      const url = new URL(window.location.href)
      url.pathname = targetPath
      url.searchParams.delete('lg')
      window.history.replaceState({}, '', url.pathname + url.search)
      if (to.path === '/lang') {
        return navigateTo({ path: '/', query: newQuery }, { replace: true })
      }
    } else {
      return navigateTo({
        path: targetPath,
        query: newQuery
      }, { replace: true })
    }
  }
})
