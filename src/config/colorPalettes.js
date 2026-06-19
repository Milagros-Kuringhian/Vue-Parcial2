export const COLOR_PALETTES = {
  indigo: {
    id: 'indigo',
    label: 'Índigo',
    description: 'Violeta moderno y limpio — la paleta actual del proyecto.',
    icon: 'mdi-palette',
    themes: {
      dark: {
        colors: {
          primary: '#6366F1',
          secondary: '#F59E0B',
          accent: '#A78BFA',
          background: '#0C0E14',
          surface: '#171923',
          'surface-bright': '#222636',
          'surface-light': '#2A3042',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '99, 102, 241',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.18), transparent), linear-gradient(180deg, #0c0e14 0%, #12141c 100%)',
          cardBg: 'rgba(34, 38, 54, 0.6)',
          cardBgSoft: 'rgba(34, 38, 54, 0.5)',
          headerIconBg: 'rgba(99, 102, 241, 0.1)',
          headerIconBorder: 'rgba(99, 102, 241, 0.15)',
          cardShadow: 'rgba(99, 102, 241, 0.18)',
          cardShadowSoft: 'rgba(99, 102, 241, 0.14)',
        },
      },
      light: {
        colors: {
          primary: '#4F46E5',
          secondary: '#D97706',
          accent: '#7C3AED',
          background: '#F1F5F9',
          surface: '#FFFFFF',
          'surface-bright': '#F8FAFC',
          'surface-light': '#E2E8F0',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '79, 70, 229',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 70, 229, 0.1), transparent), linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(79, 70, 229, 0.08)',
          headerIconBorder: 'rgba(79, 70, 229, 0.12)',
          cardShadow: 'rgba(79, 70, 229, 0.12)',
          cardShadowSoft: 'rgba(79, 70, 229, 0.08)',
        },
      },
    },
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    description: 'Rojo intenso y dorado — estilo cartelera de cine.',
    icon: 'mdi-movie-open',
    themes: {
      dark: {
        colors: {
          primary: '#E50914',
          secondary: '#F5C518',
          accent: '#B20710',
          background: '#141414',
          surface: '#1F1F1F',
          'surface-bright': '#2A2A2A',
          'surface-light': '#333333',
          error: '#FF6B6B',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '229, 9, 20',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(229, 9, 20, 0.2), transparent), linear-gradient(180deg, #141414 0%, #1a1a1a 100%)',
          cardBg: 'rgba(31, 31, 31, 0.85)',
          cardBgSoft: 'rgba(31, 31, 31, 0.7)',
          headerIconBg: 'rgba(229, 9, 20, 0.12)',
          headerIconBorder: 'rgba(229, 9, 20, 0.2)',
          cardShadow: 'rgba(229, 9, 20, 0.22)',
          cardShadowSoft: 'rgba(229, 9, 20, 0.16)',
        },
      },
      light: {
        colors: {
          primary: '#DC2626',
          secondary: '#CA8A04',
          accent: '#991B1B',
          background: '#FAFAFA',
          surface: '#FFFFFF',
          'surface-bright': '#F5F5F5',
          'surface-light': '#E5E5E5',
          error: '#EF4444',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '220, 38, 38',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220, 38, 38, 0.08), transparent), linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(220, 38, 38, 0.08)',
          headerIconBorder: 'rgba(220, 38, 38, 0.12)',
          cardShadow: 'rgba(220, 38, 38, 0.12)',
          cardShadowSoft: 'rgba(220, 38, 38, 0.08)',
        },
      },
    },
  },
  ocean: {
    id: 'ocean',
    label: 'Océano',
    description: 'Azules y turquesas — sensación fresca y cinematográfica.',
    icon: 'mdi-waves',
    themes: {
      dark: {
        colors: {
          primary: '#06B6D4',
          secondary: '#38BDF8',
          accent: '#22D3EE',
          background: '#0A1018',
          surface: '#111827',
          'surface-bright': '#1A2332',
          'surface-light': '#243044',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '6, 182, 212',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.18), transparent), linear-gradient(180deg, #0a1018 0%, #0f172a 100%)',
          cardBg: 'rgba(26, 35, 50, 0.65)',
          cardBgSoft: 'rgba(26, 35, 50, 0.5)',
          headerIconBg: 'rgba(6, 182, 212, 0.1)',
          headerIconBorder: 'rgba(6, 182, 212, 0.15)',
          cardShadow: 'rgba(6, 182, 212, 0.18)',
          cardShadowSoft: 'rgba(6, 182, 212, 0.14)',
        },
      },
      light: {
        colors: {
          primary: '#0891B2',
          secondary: '#0284C7',
          accent: '#06B6D4',
          background: '#F0F9FF',
          surface: '#FFFFFF',
          'surface-bright': '#F8FAFC',
          'surface-light': '#E0F2FE',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '8, 145, 178',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(8, 145, 178, 0.1), transparent), linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(8, 145, 178, 0.08)',
          headerIconBorder: 'rgba(8, 145, 178, 0.12)',
          cardShadow: 'rgba(8, 145, 178, 0.12)',
          cardShadowSoft: 'rgba(8, 145, 178, 0.08)',
        },
      },
    },
  },
  emerald: {
    id: 'emerald',
    label: 'Esmeralda',
    description: 'Verdes profundos con acentos dorados — elegante y sobrio.',
    icon: 'mdi-leaf',
    themes: {
      dark: {
        colors: {
          primary: '#10B981',
          secondary: '#F59E0B',
          accent: '#34D399',
          background: '#0A1210',
          surface: '#111F1A',
          'surface-bright': '#1A2E26',
          'surface-light': '#243B32',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '16, 185, 129',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.16), transparent), linear-gradient(180deg, #0a1210 0%, #0f1a16 100%)',
          cardBg: 'rgba(26, 46, 38, 0.65)',
          cardBgSoft: 'rgba(26, 46, 38, 0.5)',
          headerIconBg: 'rgba(16, 185, 129, 0.1)',
          headerIconBorder: 'rgba(16, 185, 129, 0.15)',
          cardShadow: 'rgba(16, 185, 129, 0.18)',
          cardShadowSoft: 'rgba(16, 185, 129, 0.14)',
        },
      },
      light: {
        colors: {
          primary: '#059669',
          secondary: '#D97706',
          accent: '#10B981',
          background: '#F0FDF4',
          surface: '#FFFFFF',
          'surface-bright': '#F8FAFC',
          'surface-light': '#DCFCE7',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '5, 150, 105',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(5, 150, 105, 0.1), transparent), linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(5, 150, 105, 0.08)',
          headerIconBorder: 'rgba(5, 150, 105, 0.12)',
          cardShadow: 'rgba(5, 150, 105, 0.12)',
          cardShadowSoft: 'rgba(5, 150, 105, 0.08)',
        },
      },
    },
  },
  sunset: {
    id: 'sunset',
    label: 'Atardecer',
    description: 'Naranjas y coral — cálido y llamativo para destacar acciones.',
    icon: 'mdi-weather-sunset',
    themes: {
      dark: {
        colors: {
          primary: '#F97316',
          secondary: '#FB7185',
          accent: '#FDBA74',
          background: '#120E0A',
          surface: '#1C1610',
          'surface-bright': '#2A2218',
          'surface-light': '#3A3024',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '249, 115, 22',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.18), transparent), linear-gradient(180deg, #120e0a 0%, #1a1410 100%)',
          cardBg: 'rgba(42, 34, 24, 0.65)',
          cardBgSoft: 'rgba(42, 34, 24, 0.5)',
          headerIconBg: 'rgba(249, 115, 22, 0.1)',
          headerIconBorder: 'rgba(249, 115, 22, 0.15)',
          cardShadow: 'rgba(249, 115, 22, 0.2)',
          cardShadowSoft: 'rgba(249, 115, 22, 0.14)',
        },
      },
      light: {
        colors: {
          primary: '#EA580C',
          secondary: '#E11D48',
          accent: '#FB923C',
          background: '#FFF7ED',
          surface: '#FFFFFF',
          'surface-bright': '#FFFBEB',
          'surface-light': '#FFEDD5',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '234, 88, 12',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(234, 88, 12, 0.1), transparent), linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(234, 88, 12, 0.08)',
          headerIconBorder: 'rgba(234, 88, 12, 0.12)',
          cardShadow: 'rgba(234, 88, 12, 0.12)',
          cardShadowSoft: 'rgba(234, 88, 12, 0.08)',
        },
      },
    },
  },
  rose: {
    id: 'rose',
    label: 'Rosa',
    description: 'Fucsia y violeta — moderno, juvenil y con personalidad.',
    icon: 'mdi-flower',
    themes: {
      dark: {
        colors: {
          primary: '#EC4899',
          secondary: '#A78BFA',
          accent: '#F472B6',
          background: '#100A12',
          surface: '#1A1220',
          'surface-bright': '#261A30',
          'surface-light': '#342440',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '236, 72, 153',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236, 72, 153, 0.18), transparent), linear-gradient(180deg, #100a12 0%, #160e1a 100%)',
          cardBg: 'rgba(38, 26, 48, 0.65)',
          cardBgSoft: 'rgba(38, 26, 48, 0.5)',
          headerIconBg: 'rgba(236, 72, 153, 0.1)',
          headerIconBorder: 'rgba(236, 72, 153, 0.15)',
          cardShadow: 'rgba(236, 72, 153, 0.2)',
          cardShadowSoft: 'rgba(236, 72, 153, 0.14)',
        },
      },
      light: {
        colors: {
          primary: '#DB2777',
          secondary: '#7C3AED',
          accent: '#EC4899',
          background: '#FDF2F8',
          surface: '#FFFFFF',
          'surface-bright': '#FAF5FF',
          'surface-light': '#FCE7F3',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '219, 39, 119',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(219, 39, 119, 0.1), transparent), linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(219, 39, 119, 0.08)',
          headerIconBorder: 'rgba(219, 39, 119, 0.12)',
          cardShadow: 'rgba(219, 39, 119, 0.12)',
          cardShadowSoft: 'rgba(219, 39, 119, 0.08)',
        },
      },
    },
  },
  slate: {
    id: 'slate',
    label: 'Pizarra',
    description: 'Grises neutros con acento azul — minimalista y profesional.',
    icon: 'mdi-square-rounded-outline',
    themes: {
      dark: {
        colors: {
          primary: '#94A3B8',
          secondary: '#64748B',
          accent: '#CBD5E1',
          background: '#0B0F14',
          surface: '#151A22',
          'surface-bright': '#1E2530',
          'surface-light': '#283040',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        css: {
          primaryRgb: '148, 163, 184',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(148, 163, 184, 0.12), transparent), linear-gradient(180deg, #0b0f14 0%, #111820 100%)',
          cardBg: 'rgba(30, 37, 48, 0.65)',
          cardBgSoft: 'rgba(30, 37, 48, 0.5)',
          headerIconBg: 'rgba(148, 163, 184, 0.1)',
          headerIconBorder: 'rgba(148, 163, 184, 0.15)',
          cardShadow: 'rgba(148, 163, 184, 0.14)',
          cardShadowSoft: 'rgba(148, 163, 184, 0.1)',
        },
      },
      light: {
        colors: {
          primary: '#475569',
          secondary: '#64748B',
          accent: '#334155',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          'surface-bright': '#F1F5F9',
          'surface-light': '#E2E8F0',
          error: '#DC2626',
          info: '#2563EB',
          success: '#059669',
          warning: '#D97706',
        },
        css: {
          primaryRgb: '71, 85, 105',
          gradient:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(71, 85, 105, 0.08), transparent), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardBgSoft: 'rgba(255, 255, 255, 0.9)',
          headerIconBg: 'rgba(71, 85, 105, 0.08)',
          headerIconBorder: 'rgba(71, 85, 105, 0.12)',
          cardShadow: 'rgba(71, 85, 105, 0.1)',
          cardShadowSoft: 'rgba(71, 85, 105, 0.06)',
        },
      },
    },
  },
}

export const DEFAULT_PALETTE = 'cinematic'

export const PALETTE_STORAGE_KEY = 'peliculas-palette'

const THEME_META = {
  dark: { label: 'Oscuro', icon: 'mdi-weather-night' },
  light: { label: 'Claro', icon: 'mdi-white-balance-sunny' },
}

export function getSavedPaletteId() {
  try {
    const saved = localStorage.getItem(PALETTE_STORAGE_KEY)
    return saved && COLOR_PALETTES[saved] ? saved : DEFAULT_PALETTE
  } catch {
    return DEFAULT_PALETTE
  }
}

export function buildAppThemes(paletteId) {
  const palette = COLOR_PALETTES[paletteId] || COLOR_PALETTES[DEFAULT_PALETTE]

  return Object.fromEntries(
    Object.entries(THEME_META).map(function ([mode, meta]) {
      return [
        mode,
        {
          label: meta.label,
          icon: meta.icon,
          colors: { ...palette.themes[mode].colors },
        },
      ]
    }),
  )
}

export function getPaletteOptions() {
  return Object.values(COLOR_PALETTES).map(function (palette) {
    return {
      id: palette.id,
      label: palette.label,
      description: palette.description,
      icon: palette.icon,
    }
  })
}
