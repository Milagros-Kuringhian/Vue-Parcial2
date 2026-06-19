<template>
  <div class="detail-page">
    <div
      v-if="pelicula"
      class="detail-backdrop"
      :style="estiloFondo"
    />
    <div v-if="pelicula" class="detail-overlay" />

    <v-container class="detail-content">
      <v-btn variant="text" to="/" prepend-icon="mdi-arrow-left" class="mb-4 back-btn">
        Volver
      </v-btn>

      <v-progress-linear v-if="cargando" indeterminate color="primary" class="mb-4" />

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

      <template v-if="pelicula">
        <div class="detail-glass mb-8">
          <v-row align="center">
            <v-col cols="12" md="4">
              <v-card border class="detail-poster">
                <v-img
                  :src="urlPoster(pelicula.poster_path)"
                  max-height="500"
                  cover
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
                      <v-icon icon="mdi-movie-off" size="64" color="grey" />
                    </div>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col cols="12" md="8" class="detail-info">
              <h1 class="text-h4 mb-2 font-weight-bold">{{ pelicula.title }}</h1>

              <div class="d-flex flex-wrap align-center ga-2 mb-4">
                <v-chip prepend-icon="mdi-calendar" size="small" variant="tonal">
                  {{ pelicula.release_date ? pelicula.release_date.slice(0, 4) : '—' }}
                </v-chip>
                <v-chip prepend-icon="mdi-clock-outline" size="small" variant="tonal">
                  {{ pelicula.runtime ? pelicula.runtime + ' min' : '—' }}
                </v-chip>
                <v-chip prepend-icon="mdi-star" color="secondary" size="small">
                  {{ pelicula.vote_average.toFixed(1) }}/10
                </v-chip>
              </div>

              <div v-if="pelicula.genres && pelicula.genres.length" class="d-flex flex-wrap ga-2 mb-4">
                <v-chip
                  v-for="genero in pelicula.genres"
                  :key="genero.id"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  {{ genero.name }}
                </v-chip>
              </div>

              <p class="text-body-1 text-left mb-6">{{ pelicula.overview || 'Sin descripción disponible.' }}</p>

              <v-btn
                v-if="!favorito"
                color="primary"
                size="large"
                prepend-icon="mdi-heart-plus"
                @click="agregar"
              >
                Agregar a favoritos
              </v-btn>
              <v-btn
                v-else
                color="error"
                variant="outlined"
                size="large"
                prepend-icon="mdi-heart-off"
                @click="quitar"
              >
                Quitar de favoritos
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <section v-if="similares.length" class="detail-similares mb-4">
          <h2 class="text-h6 font-weight-medium mb-4">Películas similares</h2>
          <v-row>
            <v-col
              v-for="similar in similares"
              :key="similar.id"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <RouterLink :to="'/pelicula/' + similar.id" class="similar-link text-decoration-none">
                <v-card class="similar-card app-surface-card" border hover>
                  <v-img
                    :src="urlPoster(similar.poster_path)"
                    aspect-ratio="2/3"
                    cover
                  >
                    <template #placeholder>
                      <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
                        <v-icon icon="mdi-movie-off" size="32" color="grey" />
                      </div>
                    </template>
                  </v-img>
                  <v-card-title class="text-wrap text-caption pa-2">
                    {{ similar.title }}
                  </v-card-title>
                </v-card>
              </RouterLink>
            </v-col>
          </v-row>
        </section>
      </template>
    </v-container>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="2500">
      {{ snackbarTexto }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerDetalle, obtenerSimilares, urlBackdrop, urlPoster } from '@/services/peliculas.js'
import { agregarFavorito, quitarFavorito, esFavorito } from '@/services/favorites.js'

const route = useRoute()
const pelicula = ref(null)
const similares = ref([])
const cargando = ref(false)
const error = ref('')
const favorito = ref(false)
const snackbar = ref(false)
const snackbarTexto = ref('')
const snackbarColor = ref('success')

const estiloFondo = computed(function () {
  if (!pelicula.value) {
    return undefined
  }

  const imagen = pelicula.value.backdrop_path
    ? urlBackdrop(pelicula.value.backdrop_path)
    : urlPoster(pelicula.value.poster_path)

  if (!imagen) {
    return undefined
  }

  return { backgroundImage: `url(${imagen})` }
})

function actualizarEstadoFavorito() {
  if (pelicula.value) {
    favorito.value = esFavorito(pelicula.value.id)
  }
}

function agregar() {
  if (pelicula.value) {
    agregarFavorito(pelicula.value)
    favorito.value = true
    snackbarTexto.value = 'Película agregada a favoritos'
    snackbarColor.value = 'success'
    snackbar.value = true
  }
}

function quitar() {
  if (pelicula.value) {
    quitarFavorito(pelicula.value.id)
    favorito.value = false
    snackbarTexto.value = 'Película quitada de favoritos'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

function cargarPelicula(id) {
  cargando.value = true
  error.value = ''
  pelicula.value = null
  similares.value = []

  obtenerDetalle(id)
    .then(function (data) {
      pelicula.value = data
      actualizarEstadoFavorito()
      return obtenerSimilares(id)
    })
    .then(function (lista) {
      similares.value = lista.slice(0, 6)
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
}

watch(
  function () {
    return route.params.id
  },
  function (id) {
    if (id) {
      cargarPelicula(id)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.detail-page {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 100%;
  padding-bottom: 2rem;
}

.detail-backdrop {
  position: absolute;
  inset: -24px;
  background-size: cover;
  background-position: center;
  filter: blur(18px);
  transform: scale(1.06);
  z-index: 0;
}

.detail-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.82) 45%,
    rgba(0, 0, 0, 0.94) 100%
  );
  pointer-events: none;
}

.detail-content {
  position: relative;
  z-index: 1;
}

.detail-glass {
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(31, 31, 31, 0.55);
  border: 1px solid rgba(var(--app-primary-rgb), 0.15);
  backdrop-filter: blur(12px);
}

.back-btn {
  opacity: 0.85;
  transition: background-color 0.25s ease, color 0.25s ease, opacity 0.25s ease;
}

.back-btn:hover,
.back-btn:focus-visible {
  opacity: 1;
  background: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

.back-btn:hover :deep(.v-btn__overlay),
.back-btn:focus-visible :deep(.v-btn__overlay) {
  opacity: 0 !important;
}

.back-btn:hover :deep(.v-icon),
.back-btn:focus-visible :deep(.v-icon) {
  color: rgb(var(--v-theme-on-primary)) !important;
}

.detail-poster {
  border-color: rgba(var(--app-primary-rgb), 0.15) !important;
  background: var(--app-card-bg-soft) !important;
  overflow: hidden;
}

.detail-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.similar-link {
  display: block;
  color: inherit;
  cursor: pointer;
}

.similar-card {
  transition: transform 0.2s ease;
}

.similar-card:hover {
  transform: translateY(-4px);
}
</style>
