import { COLOR_PALETTES } from '@/config/colorPalettes.js'
import {
  DEFAULT_DESIGN,
  DESIGN_FORMATS,
  buildDesignCssVars,
  getSavedDesignId,
} from '@/config/designFormats.js'

const CSS_VAR_MAP = {
  primaryRgb: '--app-primary-rgb',
  gradient: '--app-gradient',
  cardBg: '--app-card-bg',
  cardBgSoft: '--app-card-bg-soft',
  headerIconBg: '--app-header-icon-bg',
  headerIconBorder: '--app-header-icon-border',
  cardShadow: '--app-card-shadow',
  cardShadowSoft: '--app-card-shadow-soft',
  cardBackdropBlur: '--app-card-backdrop-blur',
  cardBorderColor: '--app-card-border-color',
  cardBorderColorHover: '--app-card-border-color-hover',
  cardBorderWidth: '--app-card-border-width',
  cardHoverTransform: '--app-card-hover-transform',
  cardHoverShadow: '--app-card-hover-shadow',
  headerBorderRadius: '--app-header-border-radius',
  cardBorderRadius: '--app-card-border-radius',
}

export function applyCssVars(cssVars) {
  const root = document.documentElement

  for (const [key, cssName] of Object.entries(CSS_VAR_MAP)) {
    if (cssVars[key] !== undefined) {
      root.style.setProperty(cssName, cssVars[key])
    }
  }
}

export function applyPaletteToVuetify(vuetifyTheme, paletteId) {
  const palette = COLOR_PALETTES[paletteId] || COLOR_PALETTES.indigo

  for (const mode of ['dark', 'light']) {
    const target = vuetifyTheme.themes.value[mode]
    if (!target) {
      continue
    }

    Object.assign(target.colors, palette.themes[mode].colors)
  }
}

export function applyVisualTheme({ vuetifyTheme, paletteId, designId, mode }) {
  const resolvedDesign = DESIGN_FORMATS[designId] ? designId : DEFAULT_DESIGN
  const cssVars = buildDesignCssVars(paletteId, resolvedDesign, mode, COLOR_PALETTES)

  applyPaletteToVuetify(vuetifyTheme, paletteId)
  applyCssVars(cssVars)
  document.documentElement.dataset.design = resolvedDesign
}

export function getInitialDesignId() {
  return getSavedDesignId()
}
