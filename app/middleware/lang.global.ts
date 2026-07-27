export default defineNuxtRouteMiddleware((to) => {
  const lg = to.query.lg
  if (!lg || typeof lg !== 'string') return

  const targetLang = lg.toLowerCase()
  let codeToSet = ''
  if (targetLang.startsWith('pt')) codeToSet = 'pt'
  else if (targetLang.startsWith('en')) codeToSet = 'en'
  else if (targetLang.startsWith('es')) codeToSet = 'es'
  else if (targetLang.startsWith('it')) codeToSet = 'it'

  if (!codeToSet) return

  const cookie = useCookie('i18n_redirected', { maxAge: 60 * 60 * 24 * 365, path: '/' })
  cookie.value = codeToSet

  if (import.meta.client) {
    const { setLocale } = useI18n()
    setLocale(codeToSet)
    const newQuery = { ...to.query }
    delete newQuery.lg
    const queryString = new URLSearchParams(newQuery as Record<string, string>).toString()
    history.replaceState(history.state, '', to.path + (queryString ? `?${queryString}` : ''))
  }
})
