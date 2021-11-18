import { createI18n } from 'vue-i18n'
import { UserModule } from '@/types'

export const install: UserModule = (app) => {
    const messages = Object.fromEntries(
        Object.entries(
            import.meta.globEager('../../locales/*.y(a)?ml'))
            .map(([key, value]) => {
                const yaml = key.endsWith('.yaml')
                return [key.slice(14, yaml ? -5 : -4), value.default]
            }),
    )
    const i18n = createI18n({
        legacy: false,
        locale: 'zh-CN',
        messages,
    })
    app.use(i18n)
}
