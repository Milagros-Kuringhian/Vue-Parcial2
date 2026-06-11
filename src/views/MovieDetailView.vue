<template>
  <v-main>
    <v-container>
      <v-btn variant="text" to="/" prepend-icon="mdi-arrow-left" class="mb-4">
        Volver
      </v-btn>

      <v-progress-linear v-if="cargando" indeterminate color="primary" class="mb-4" />

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

      <template v-if="pelicula">
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              :src="urlPoster(pelicula.poster_path)"
              max-height="500"
              cover
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
                  <v-icon icon="mdi-movie-off" size="64" />
                </div>
              </template>
            </v-img>
          </v-col>

          <v-col cols="12" md="8">
            <h1 class="text-h4 mb-2">{{ pelicula.title }}</h1>

            <p class="text-body-2 mb-2">
              Año: {{ pelicula.release_date ? pelicula.release_date.slice(0, 4) : '—' }}
              · Duración: {{ pelicula.runtime ? pelicula.runtime + ' min' : '—' }}
              · Nota: {{ pelicula.vote_average.toFixed(1) }}/10
            </p>

            <p v-if="pelicula.genres && pelicula.genres.length" class="text-body-2 mb-4">
              Géneros: {{ nombresGeneros }}
            </p>

            <p class="text-body-1 mb-6">{{ pelicula.overview || 'Sin descripción disponible.' }}</p>

            <v-btn
              v-if="!favorito"
              color="primary"
              prepend-icon="mdi-heart-plus"
              @click="agregar"
            >
              Agregar a favoritos
            </v-btn>
            <v-btn
              v-else
              color="error"
              variant="outlined"
              prepend-icon="mdi-heart-off"
              @click="quitar"
            >
              Quitar de favoritos
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerDetalle, urlPoster } from '@/services/tmdb.js'
import { agregarFavorito, quitarFavorito, esFavorito } from '@/services/favorites.js'

const route = useRoute()
const pelicula = ref(null)
const cargando = ref(false)
const error = ref('')
const favorito = ref(false)

const nombresGeneros = computed(function () {
  if (!pelicula.value || !pelicula.value.genres) return ''
  return pelicula.value.genres.map(function (g) {
    return g.name
  }).join(', ')
})

function agregar() {
  if (pelicula.value) {
    agregarFavorito(pelicula.value)
    favorito.value = true
  }
}

function quitar() {
  if (pelicula.value) {
    quitarFavorito(pelicula.value.id)
    favorito.value = false
  }
}

onMounted(function () {
  cargando.value = true
  error.value = ''

  obtenerDetalle(route.params.id)
    .then(function (data) {
      pelicula.value = data
      favorito.value = esFavorito(data.id)
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
})
</script>
