import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/theme.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { APP_THEMES, DEFAULT_THEME } from '@/config/themes.js'
import { DESIGN_FORMATS, getSavedDesignId } from '@/config/designFormats.js'

const app = createApp(App)

const vuetifyThemes = Object.fromEntries(
  Object.entries(APP_THEMES).map(function ([name, config]) {
    return [name, { colors: config.colors }]
  }),
)

const initialDesign = DESIGN_FORMATS[getSavedDesignId()] || DESIGN_FORMATS.solid

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: DEFAULT_THEME,
    themes: vuetifyThemes,
  },
  defaults: {
    VBtn: { rounded: 'lg', ...initialDesign.vuetify.VBtn },
    VCard: { rounded: 'lg', elevation: 0, ...initialDesign.vuetify.VCard },
    VTextField: {
      color: 'primary',
      hideDetails: true,
      ...initialDesign.vuetify.VTextField,
    },
    VSelect: {
      color: 'primary',
      hideDetails: true,
      ...initialDesign.vuetify.VSelect,
    },
    VChip: { size: 'small', ...initialDesign.vuetify.VChip },
  },
})

app.use(router)
app.use(vuetify)

app.mount('#app')
