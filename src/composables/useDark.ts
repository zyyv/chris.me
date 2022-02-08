export const isDark = useDark()
export const toggleDark = useThrottleFn(() => { useToggle(isDark)() }, 1000, false, true)
