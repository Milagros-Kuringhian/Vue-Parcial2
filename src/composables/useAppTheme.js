import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { getSavedPaletteId } from '@/config/colorPalettes.js'
import { getSavedDesignId } from '@/config/designFormats.js'
import { applyVisualTheme } from '@/config/visualTheme.js'
import { APP_THEMES, DEFAULT_THEME, THEME_STORAGE_KEY } from '@/config/themes.js'

export function useAppTheme() {
  const theme = useTheme()

  const themeOptions = computed(function () {
    return Object.entries(APP_THEMES).map(function ([id, config]) {
      return {
        id,
        label: config.label,
        icon: config.icon,
      }
    })
  })

  const currentTheme = computed(function () {
    return theme.global.name.value
  })

  function applyTheme(name) {
    if (!APP_THEMES[name]) {
      return
    }

    theme.global.name.value = name
    document.documentElement.dataset.theme = name
    localStorage.setItem(THEME_STORAGE_KEY, name)
    applyVisualTheme({
      vuetifyTheme: theme,
      paletteId: getSavedPaletteId(),
      designId: getSavedDesignId(),
      mode: name,
    })
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    applyTheme(saved && APP_THEMES[saved] ? saved : DEFAULT_THEME)
  }

  function toggleTheme() {
    applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }

  const isDarkTheme = computed(function () {
    return currentTheme.value === 'dark'
  })

  return {
    themeOptions,
    currentTheme,
    isDarkTheme,
    applyTheme,
    initTheme,
    toggleTheme,
  }
}
