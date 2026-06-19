<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppBrandLogo from '@/components/AppBrandLogo.vue'
import { useAppTheme } from '@/composables/useAppTheme.js'

const mostrar = ref(false)

const { isDarkTheme, toggleTheme } = useAppTheme()

const navItems = [
  { titulo: 'Inicio', to: '/', icono: 'mdi-home' },
  { titulo: 'Favoritos', to: '/favoritos', icono: 'mdi-heart' },
]
</script>

<template>
  <v-app-bar class="app-navbar" flat height="84">
    <v-app-bar-nav-icon
      class="app-navbar__menu d-flex d-md-none"
      @click.stop="mostrar = !mostrar"
    />

    <RouterLink to="/" class="app-navbar__brand text-decoration-none d-none d-md-inline-flex">
      <AppBrandLogo />
    </RouterLink>

    <v-spacer />

    <nav class="app-navbar__nav d-none d-md-flex align-center">
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        class="app-navbar__link"
        :to="item.to"
        :prepend-icon="item.icono"
        variant="text"
        rounded="pill"
      >
        {{ item.titulo }}
      </v-btn>
    </nav>

    <button
      type="button"
      class="theme-toggle ml-1 mr-3"
      :class="{ 'theme-toggle--light': !isDarkTheme }"
      :aria-label="isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      @click="toggleTheme"
    >
      <v-icon size="16" class="theme-toggle__icon theme-toggle__icon--moon">mdi-weather-night</v-icon>
      <v-icon size="16" class="theme-toggle__icon theme-toggle__icon--sun">mdi-white-balance-sunny</v-icon>
      <span class="theme-toggle__knob" />
    </button>
  </v-app-bar>

  <v-navigation-drawer v-model="mostrar" temporary class="app-navbar__drawer">
    <div class="app-navbar__drawer-header">
      <AppBrandLogo size="lg" />
    </div>

    <v-list nav class="app-navbar__drawer-list">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :prepend-icon="item.icono"
        :to="item.to"
        rounded="lg"
        class="app-navbar__drawer-item"
      >
        {{ item.titulo }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.app-navbar {
  backdrop-filter: blur(18px);
  background: var(--app-navbar-bg) !important;
  border-bottom: 1px solid var(--app-navbar-border);
  box-shadow: var(--app-navbar-shadow);
}

.app-navbar :deep(.v-toolbar__content) {
  overflow: hidden;
  padding-left: 1rem;
}

@media (min-width: 960px) {
  .app-navbar :deep(.v-toolbar__content) {
    padding-left: 1.5rem;
  }
}

.app-navbar__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0;
  margin-left: 0.5rem;
  color: inherit;
  transition: opacity 0.2s ease;
}

.app-navbar__brand:hover {
  opacity: 0.92;
}

.app-navbar__nav {
  gap: 0.35rem;
}

.app-navbar__link {
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: none;
  opacity: 0.78;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.app-navbar__link:hover {
  opacity: 1;
  background: transparent !important;
}

.app-navbar__link.v-btn--active {
  opacity: 1;
  color: rgba(var(--app-primary-rgb), 0.72) !important;
  background: transparent !important;
}

.app-navbar__link.v-btn--active :deep(.v-icon) {
  color: rgba(var(--app-primary-rgb), 0.72) !important;
}

.app-navbar__menu {
  opacity: 0.9;
}

.app-navbar__drawer-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem 0.75rem;
}

.app-navbar__drawer-list {
  padding: 0 0.75rem;
}

.app-navbar__drawer-item :deep(.v-list-item__overlay) {
  opacity: 0 !important;
}

.app-navbar__drawer-item.v-list-item--active {
  background: transparent !important;
  color: rgba(var(--app-primary-rgb), 0.72) !important;
}

.app-navbar__drawer-item.v-list-item--active :deep(.v-icon) {
  color: rgba(var(--app-primary-rgb), 0.72) !important;
}

.theme-toggle {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 52px;
  height: 28px;
  padding: 0;
  border: 1.5px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.85;
  overflow: hidden;
  --toggle-inset: 1.5px;
  --toggle-knob-size: calc(28px - 3px - var(--toggle-inset) * 2);
  --toggle-travel: calc(52px - 3px - var(--toggle-inset) * 2 - var(--toggle-knob-size));
  transition: opacity 0.15s ease;
}

.theme-toggle:hover {
  opacity: 1;
}

.theme-toggle__icon {
  position: absolute;
  top: 50%;
  z-index: 1;
  opacity: 0.55;
  transform: translateY(-50%);
  pointer-events: none;
}

.theme-toggle__icon--moon {
  left: 5px;
}

.theme-toggle__icon--sun {
  right: 5px;
}

.theme-toggle__knob {
  position: absolute;
  top: var(--toggle-inset);
  left: var(--toggle-inset);
  z-index: 2;
  width: var(--toggle-knob-size);
  height: var(--toggle-knob-size);
  border-radius: 50%;
  background: currentColor;
  transform: translateX(var(--toggle-travel));
  transition: transform 0.35s ease-in-out;
}

.theme-toggle--light .theme-toggle__knob {
  transform: translateX(0);
}
</style>
