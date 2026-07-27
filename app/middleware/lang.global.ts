export default defineNuxtRouteMiddleware((to) => {
  const { lang } = to.query
  if (lang && typeof lang === 'string') {
    const targetLang = lang.toLowerCase()
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

    const newQuery = { ...to.query }
    delete newQuery.lang

    return navigateTo({
      path: to.path,
      query: newQuery
    }, { replace: true })
  }
})
