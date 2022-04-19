import { useI18n } from 'vue-i18n'

export const { availableLocales, locale } = useI18n()
export const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
