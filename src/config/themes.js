import { buildAppThemes, DEFAULT_PALETTE, getSavedPaletteId } from '@/config/colorPalettes.js'

export const APP_THEMES = buildAppThemes(getSavedPaletteId())

export const DEFAULT_THEME = 'dark'

export const THEME_STORAGE_KEY = 'peliculas-theme'

export { DEFAULT_PALETTE, buildAppThemes, getSavedPaletteId }
