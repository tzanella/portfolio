export default defineNuxtRouteMiddleware(async (to) => {
  const lg = to.query.lg
  if (!lg || typeof lg !== 'string') return

  const { setLocale } = useI18n()

  const targetLang = lg.toLowerCase()
  let codeToSet = ''
  if (targetLang.startsWith('pt')) codeToSet = 'pt'
  else if (targetLang.startsWith('en')) codeToSet = 'en'
  else if (targetLang.startsWith('es')) codeToSet = 'es'
  else if (targetLang.startsWith('it')) codeToSet = 'it'

  if (!codeToSet) return

  await setLocale(codeToSet)

  if (import.meta.client) {
    const newQuery = { ...to.query }
    delete newQuery.lg
    const queryString = new URLSearchParams(newQuery as Record<string, string>).toString()
    const cleanUrl = to.path + (queryString ? `?${queryString}` : '')
    history.replaceState(history.state, '', cleanUrl)
  }
})

