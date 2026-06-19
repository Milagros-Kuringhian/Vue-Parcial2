export const DESIGN_FORMATS = {
  glass: {
    id: 'glass',
    label: 'Cristal',
    description: 'Transparencias, bordes suaves y fondo con gradiente — el estilo actual.',
    icon: 'mdi-glass-wine',
    tags: ['Transparencia', 'Gradiente', 'Bordes'],
    vuetify: {
      VBtn: { rounded: 'lg' },
      VCard: { rounded: 'lg', elevation: 0 },
      VTextField: { variant: 'filled', rounded: 'lg', density: 'compact' },
      VSelect: { variant: 'filled', rounded: 'lg', density: 'compact' },
      VChip: { rounded: 'md', size: 'small' },
    },
    props: {
      cardBorder: true,
      cardElevation: 0,
      cardHoverLift: true,
      searchBtnVariant: 'tonal',
      detailBtnVariant: 'text',
      chipVariant: 'flat',
      alertVariant: 'tonal',
    },
    buildCss(paletteTheme) {
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: css.gradient,
        cardBg: css.cardBg,
        cardBgSoft: css.cardBgSoft,
        headerIconBg: css.headerIconBg,
        headerIconBorder: css.headerIconBorder,
        cardShadow: css.cardShadow,
        cardShadowSoft: css.cardShadowSoft,
        cardBackdropBlur: '10px',
        cardBorderColor: `rgba(${css.primaryRgb}, 0.12)`,
        cardBorderColorHover: `rgba(${css.primaryRgb}, 0.35)`,
        cardBorderWidth: '1px',
        cardHoverTransform: 'translateY(-6px)',
        cardHoverShadow: `0 16px 40px ${css.cardShadow}`,
        headerBorderRadius: '10px',
        cardBorderRadius: '12px',
      }
    },
  },
  solid: {
    id: 'solid',
    label: 'Sólido',
    description: 'Superficies opacas y fondo plano, sin transparencias ni efecto vidrio.',
    icon: 'mdi-square-rounded',
    tags: ['Opaco', 'Plano', 'Limpio'],
    vuetify: {
      VBtn: { rounded: 'lg' },
      VCard: { rounded: 'lg', elevation: 0 },
      VTextField: { variant: 'filled', rounded: 'lg', density: 'compact' },
      VSelect: { variant: 'filled', rounded: 'lg', density: 'compact' },
      VChip: { rounded: 'md', size: 'small' },
    },
    props: {
      cardBorder: true,
      cardElevation: 0,
      cardHoverLift: false,
      searchBtnVariant: 'flat',
      detailBtnVariant: 'text',
      chipVariant: 'flat',
      alertVariant: 'tonal',
    },
    buildCss(paletteTheme) {
      const colors = paletteTheme.colors
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: colors.background,
        cardBg: colors.surface,
        cardBgSoft: colors['surface-bright'],
        headerIconBg: colors['surface-light'],
        headerIconBorder: `rgba(${css.primaryRgb}, 0.2)`,
        cardShadow: 'rgba(0, 0, 0, 0.2)',
        cardShadowSoft: 'rgba(0, 0, 0, 0.12)',
        cardBackdropBlur: '0px',
        cardBorderColor: colors['surface-light'],
        cardBorderColorHover: `rgba(${css.primaryRgb}, 0.4)`,
        cardBorderWidth: '1px',
        cardHoverTransform: 'none',
        cardHoverShadow: `0 8px 24px rgba(0, 0, 0, 0.18)`,
        headerBorderRadius: '10px',
        cardBorderRadius: '12px',
      }
    },
  },
  elevated: {
    id: 'elevated',
    label: 'Elevado',
    description: 'Material Design clásico: sombras, sin bordes y sensación de profundidad.',
    icon: 'mdi-layers-triple',
    tags: ['Sombras', 'Material', 'Profundidad'],
    vuetify: {
      VBtn: { rounded: 'md' },
      VCard: { rounded: 'md', elevation: 4 },
      VTextField: { variant: 'solo-filled', rounded: 'md', density: 'compact' },
      VSelect: { variant: 'solo-filled', rounded: 'md', density: 'compact' },
      VChip: { rounded: 'sm', size: 'small' },
    },
    props: {
      cardBorder: false,
      cardElevation: 4,
      cardHoverLift: true,
      searchBtnVariant: 'flat',
      detailBtnVariant: 'flat',
      chipVariant: 'elevated',
      alertVariant: 'elevated',
    },
    buildCss(paletteTheme) {
      const colors = paletteTheme.colors
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: colors.background,
        cardBg: colors.surface,
        cardBgSoft: colors['surface-bright'],
        headerIconBg: colors.surface,
        headerIconBorder: 'transparent',
        cardShadow: 'rgba(0, 0, 0, 0.35)',
        cardShadowSoft: 'rgba(0, 0, 0, 0.2)',
        cardBackdropBlur: '0px',
        cardBorderColor: 'transparent',
        cardBorderColorHover: 'transparent',
        cardBorderWidth: '0px',
        cardHoverTransform: 'translateY(-4px)',
        cardHoverShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
        headerBorderRadius: '8px',
        cardBorderRadius: '8px',
      }
    },
  },
  outlined: {
    id: 'outlined',
    label: 'Contorneado',
    description: 'Bordes marcados, fondos mínimos e inputs outlined — muy legible.',
    icon: 'mdi-border-outside',
    tags: ['Outlined', 'Bordes', 'Minimal'],
    vuetify: {
      VBtn: { rounded: 'md' },
      VCard: { rounded: 'md', elevation: 0 },
      VTextField: { variant: 'outlined', rounded: 'md', density: 'compact' },
      VSelect: { variant: 'outlined', rounded: 'md', density: 'compact' },
      VChip: { rounded: 'sm', size: 'small' },
    },
    props: {
      cardBorder: true,
      cardElevation: 0,
      cardHoverLift: false,
      searchBtnVariant: 'outlined',
      detailBtnVariant: 'outlined',
      chipVariant: 'outlined',
      alertVariant: 'outlined',
    },
    buildCss(paletteTheme) {
      const colors = paletteTheme.colors
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: colors.background,
        cardBg: 'transparent',
        cardBgSoft: `rgba(${css.primaryRgb}, 0.04)`,
        headerIconBg: 'transparent',
        headerIconBorder: `rgba(${css.primaryRgb}, 0.35)`,
        cardShadow: 'none',
        cardShadowSoft: 'none',
        cardBackdropBlur: '0px',
        cardBorderColor: `rgba(${css.primaryRgb}, 0.35)`,
        cardBorderColorHover: `rgba(${css.primaryRgb}, 0.6)`,
        cardBorderWidth: '2px',
        cardHoverTransform: 'none',
        cardHoverShadow: 'none',
        headerBorderRadius: '8px',
        cardBorderRadius: '8px',
      }
    },
  },
  flat: {
    id: 'flat',
    label: 'Plano',
    description: 'Sin sombras ni bordes: superficies lisas, inputs plain y botones de texto.',
    icon: 'mdi-vector-square',
    tags: ['Flat', 'Sin bordes', 'Ultra limpio'],
    vuetify: {
      VBtn: { rounded: 'sm' },
      VCard: { rounded: 'sm', elevation: 0 },
      VTextField: { variant: 'plain', rounded: 'sm', density: 'compact' },
      VSelect: { variant: 'plain', rounded: 'sm', density: 'compact' },
      VChip: { rounded: 'sm', size: 'small' },
    },
    props: {
      cardBorder: false,
      cardElevation: 0,
      cardHoverLift: false,
      searchBtnVariant: 'text',
      detailBtnVariant: 'text',
      chipVariant: 'text',
      alertVariant: 'text',
    },
    buildCss(paletteTheme) {
      const colors = paletteTheme.colors
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: colors.background,
        cardBg: colors['surface-bright'],
        cardBgSoft: colors.surface,
        headerIconBg: colors['surface-bright'],
        headerIconBorder: 'transparent',
        cardShadow: 'none',
        cardShadowSoft: 'none',
        cardBackdropBlur: '0px',
        cardBorderColor: 'transparent',
        cardBorderColorHover: 'transparent',
        cardBorderWidth: '0px',
        cardHoverTransform: 'none',
        cardHoverShadow: 'none',
        headerBorderRadius: '4px',
        cardBorderRadius: '4px',
      }
    },
  },
  expressive: {
    id: 'expressive',
    label: 'Expresivo',
    description: 'Material 3: esquinas muy redondeadas, chips tonal y botones con color pleno.',
    icon: 'mdi-creation',
    tags: ['M3', 'Redondeado', 'Colorido'],
    vuetify: {
      VBtn: { rounded: 'xl' },
      VCard: { rounded: 'xl', elevation: 0 },
      VTextField: { variant: 'solo-filled', rounded: 'xl', density: 'comfortable' },
      VSelect: { variant: 'solo-filled', rounded: 'xl', density: 'comfortable' },
      VChip: { rounded: 'pill', size: 'small' },
    },
    props: {
      cardBorder: false,
      cardElevation: 0,
      cardHoverLift: true,
      searchBtnVariant: 'flat',
      detailBtnVariant: 'flat',
      chipVariant: 'tonal',
      alertVariant: 'tonal',
    },
    buildCss(paletteTheme) {
      const colors = paletteTheme.colors
      const css = paletteTheme.css
      return {
        primaryRgb: css.primaryRgb,
        gradient: css.gradient,
        cardBg: colors.surface,
        cardBgSoft: colors['surface-bright'],
        headerIconBg: `rgba(${css.primaryRgb}, 0.15)`,
        headerIconBorder: 'transparent',
        cardShadow: css.cardShadowSoft,
        cardShadowSoft: css.cardShadowSoft,
        cardBackdropBlur: '0px',
        cardBorderColor: 'transparent',
        cardBorderColorHover: 'transparent',
        cardBorderWidth: '0px',
        cardHoverTransform: 'scale(1.02)',
        cardHoverShadow: `0 12px 36px ${css.cardShadow}`,
        headerBorderRadius: '16px',
        cardBorderRadius: '20px',
      }
    },
  },
}

export const DEFAULT_DESIGN = 'solid'

export const DESIGN_STORAGE_KEY = 'peliculas-design'

export function getSavedDesignId() {
  try {
    const saved = localStorage.getItem(DESIGN_STORAGE_KEY)
    return saved && DESIGN_FORMATS[saved] ? saved : DEFAULT_DESIGN
  } catch {
    return DEFAULT_DESIGN
  }
}

export function getDesignOptions() {
  return Object.values(DESIGN_FORMATS).map(function (format) {
    return {
      id: format.id,
      label: format.label,
      description: format.description,
      icon: format.icon,
      tags: format.tags,
    }
  })
}

export function buildDesignCssVars(paletteId, designId, mode, colorPalettes) {
  const palette = colorPalettes[paletteId] || colorPalettes.indigo
  const format = DESIGN_FORMATS[designId] || DESIGN_FORMATS[DEFAULT_DESIGN]
  const themeMode = palette.themes[mode] ? mode : 'dark'
  return format.buildCss(palette.themes[themeMode])
}
