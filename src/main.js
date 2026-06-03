import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/theme.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
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
      },
    },
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'lg', elevation: 0 },
    VTextField: { variant: 'outlined', color: 'primary', density: 'compact', hideDetails: true },
    VSelect: { variant: 'outlined', color: 'primary', density: 'compact', hideDetails: true },
    VChip: { rounded: 'md', size: 'small' },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
