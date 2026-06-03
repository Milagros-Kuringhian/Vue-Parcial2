<template>
  <v-main>
    <v-container>
      <v-btn variant="text" to="/" prepend-icon="mdi-arrow-left" class="mb-4 back-btn">
        Volver
      </v-btn>

      <v-progress-linear v-if="cargando" indeterminate color="primary" class="mb-4" />

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

      <template v-if="pelicula">
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
      </template>
    </v-container>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="2500">
      {{ snackbarTexto }}
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerDetalle, urlPoster } from '@/services/tmdb.js'
import { agregarFavorito, quitarFavorito, esFavorito } from '@/services/favorites.js'

const route = useRoute()
const pelicula = ref(null)
const cargando = ref(false)
const error = ref('')
const favorito = ref(false)
const snackbar = ref(false)
const snackbarTexto = ref('')
const snackbarColor = ref('success')

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

onMounted(function () {
  cargando.value = true
  error.value = ''

  obtenerDetalle(route.params.id)
    .then(function (data) {
      pelicula.value = data
      actualizarEstadoFavorito()
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
})
</script>

<style scoped>
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
  border-color: rgba(99, 102, 241, 0.15) !important;
  background: rgba(34, 38, 54, 0.5) !important;
  overflow: hidden;
}

.detail-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
