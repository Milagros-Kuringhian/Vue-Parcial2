<template>
  <v-main>
    <v-container>
      <v-btn variant="text" to="/" class="mb-4">← Volver</v-btn>

      <v-progress-linear v-if="cargando" indeterminate color="primary" class="mb-4" />

      <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

      <v-row v-if="pelicula">
        <v-col cols="12" md="4">
          <v-img
            :src="urlPoster(pelicula.poster_path)"
            max-height="500"
            cover
            rounded
          />
        </v-col>
        <v-col cols="12" md="8">
          <h1 class="text-h4 mb-2">{{ pelicula.title }}</h1>
          <p class="text-subtitle-1 mb-4">
            Año: {{ pelicula.release_date ? pelicula.release_date.slice(0, 4) : '—' }}
          </p>
          <p class="mb-4">{{ pelicula.overview }}</p>
          <p class="mb-2"><strong>Duración:</strong> {{ pelicula.runtime }} minutos</p>
          <p class="mb-4"><strong>Géneros:</strong> {{ nombresGeneros }}</p>
          <p class="mb-4"><strong>Nota:</strong> {{ pelicula.vote_average }}/10</p>

          <v-btn
            v-if="!favorito"
            color="primary"
            @click="agregar"
          >
            Agregar a favoritos
          </v-btn>
          <v-btn
            v-else
            color="error"
            variant="outlined"
            @click="quitar"
          >
            Quitar de favoritos
          </v-btn>
        </v-col>
      </v-row>
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
  if (!pelicula.value || !pelicula.value.genres) return '—'
  return pelicula.value.genres
    .map(function (g) {
      return g.name
    })
    .join(', ')
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
