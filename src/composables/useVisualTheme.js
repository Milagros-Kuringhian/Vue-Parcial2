import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import {
  COLOR_PALETTES,
  DEFAULT_PALETTE,
  PALETTE_STORAGE_KEY,
  getPaletteOptions,
  getSavedPaletteId,
} from '@/config/colorPalettes.js'
import {
  DEFAULT_DESIGN,
  DESIGN_FORMATS,
  DESIGN_STORAGE_KEY,
  getDesignOptions,
  getSavedDesignId,
} from '@/config/designFormats.js'
import { applyVisualTheme } from '@/config/visualTheme.js'

const currentPaletteId = ref(getSavedPaletteId())
const currentDesignId = ref(getSavedDesignId())

function persistAndApply(vuetifyTheme, paletteId, designId, mode) {
  applyVisualTheme({
    vuetifyTheme,
    paletteId,
    designId,
    mode,
  })
  localStorage.setItem(PALETTE_STORAGE_KEY, paletteId)
  localStorage.setItem(DESIGN_STORAGE_KEY, designId)
  currentPaletteId.value = paletteId
  currentDesignId.value = designId
}

export function useVisualTheme() {
  const theme = useTheme()

  const paletteOptions = computed(function () {
    return getPaletteOptions()
  })

  const designOptions = computed(function () {
    return getDesignOptions()
  })

  const currentPalette = computed(function () {
    return currentPaletteId.value
  })

  const currentDesign = computed(function () {
    return currentDesignId.value
  })

  const designProps = computed(function () {
    const format = DESIGN_FORMATS[currentDesignId.value] || DESIGN_FORMATS[DEFAULT_DESIGN]
    return format.props
  })

  const designVuetify = computed(function () {
    const format = DESIGN_FORMATS[currentDesignId.value] || DESIGN_FORMATS[DEFAULT_DESIGN]
    return format.vuetify
  })

  function applyPalette(paletteId, mode) {
    if (!COLOR_PALETTES[paletteId]) {
      return
    }

    persistAndApply(theme, paletteId, currentDesignId.value, mode || theme.global.name.value)
  }

  function applyDesign(designId, mode) {
    if (!DESIGN_FORMATS[designId]) {
      return
    }

    persistAndApply(theme, currentPaletteId.value, designId, mode || theme.global.name.value)
  }

  function initVisualTheme(mode) {
    const paletteId = getSavedPaletteId()
    const designId = getSavedDesignId()
    persistAndApply(theme, paletteId, designId, mode || theme.global.name.value)
  }

  return {
    paletteOptions,
    designOptions,
    currentPalette,
    currentDesign,
    designProps,
    designVuetify,
    applyPalette,
    applyDesign,
    initVisualTheme,
  }
}

// Compatibilidad con imports anteriores
export function useColorPalette() {
  const visual = useVisualTheme()
  return {
    paletteOptions: visual.paletteOptions,
    currentPalette: visual.currentPalette,
    applyPalette: visual.applyPalette,
    initPalette: visual.initVisualTheme,
  }
}

export function useDesignFormat() {
  const visual = useVisualTheme()
  return {
    designOptions: visual.designOptions,
    currentDesign: visual.currentDesign,
    designProps: visual.designProps,
    designVuetify: visual.designVuetify,
    applyDesign: visual.applyDesign,
    initDesign: visual.initVisualTheme,
  }
}
