<template>
  <div>
    <v-app-bar class="navbar" elevation="0" density="comfortable">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = true"
      />

      <v-app-bar-title class="d-flex align-center">
        <div class="navbar__logo mr-3">
          <v-icon icon="mdi-movie-open" color="white" size="22" />
        </div>
        <span class="navbar__title">Películas</span>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-none d-md-flex ga-2">
        <v-btn
          :variant="rutaActiva('/') ? 'flat' : 'text'"
          :color="rutaActiva('/') ? 'primary' : undefined"
          to="/"
          prepend-icon="mdi-home"
        >
          Inicio
        </v-btn>
        <v-btn
          :variant="rutaActiva('/favoritos') ? 'flat' : 'text'"
          :color="rutaActiva('/favoritos') ? 'primary' : undefined"
          to="/favoritos"
          prepend-icon="mdi-heart"
        >
          Favoritos
          <v-badge
            v-if="cantidadFavoritos > 0"
            :content="cantidadFavoritos"
            color="primary"
            inline
            class="ml-2"
          />
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="left" class="navbar-drawer">
      <div class="navbar-drawer__links pa-3 d-flex flex-column align-start ga-2">
        <v-btn
          :variant="rutaActiva('/') ? 'flat' : 'text'"
          :color="rutaActiva('/') ? 'primary' : undefined"
          to="/"
          prepend-icon="mdi-home"
          @click="drawer = false"
        >
          Inicio
        </v-btn>
        <v-btn
          :variant="rutaActiva('/favoritos') ? 'flat' : 'text'"
          :color="rutaActiva('/favoritos') ? 'primary' : undefined"
          to="/favoritos"
          prepend-icon="mdi-heart"
          @click="drawer = false"
        >
          Favoritos
          <v-badge
            v-if="cantidadFavoritos > 0"
            :content="cantidadFavoritos"
            color="primary"
            inline
            class="ml-2"
          />
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerFavoritos } from '@/services/favorites.js'

const route = useRoute()
const drawer = ref(false)
const cantidadFavoritos = ref(0)

function rutaActiva(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function actualizarContador() {
  cantidadFavoritos.value = obtenerFavoritos().length
}

onMounted(function () {
  actualizarContador()
  window.addEventListener('favoritos-actualizados', actualizarContador)
})
</script>

<style scoped>
.navbar {
  background: rgba(23, 25, 35, 0.85) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.15);
}

.navbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.navbar__title {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.navbar-drawer {
  border-right: 1px solid rgba(99, 102, 241, 0.12) !important;
}
</style>
