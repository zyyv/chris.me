import { i18n } from '@/modules/i18n'

const { global: { availableLocales, locale } } = i18n
export const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
