<template>
  <v-main>
    <v-container>
      <div class="d-flex align-center mb-4 page-header">
        <div class="page-header__icon mr-3">
          <v-icon :icon="iconoTitulo" color="primary" />
        </div>
        <div>
          <h1 class="text-h6 font-weight-medium mb-0">{{ titulo }}</h1>
          <p class="text-caption text-medium-emphasis mb-0">{{ subtitulo }}</p>
        </div>
      </div>

      <SearchBar @buscar="buscarPorTitulo" @limpiar="cargarPopulares">
        <MovieFilter
          @filtrar="filtrarPorGenero"
          @limpiar="cargarPopulares"
        />
      </SearchBar>

      <v-progress-linear v-if="cargando" indeterminate color="primary" class="mb-4" />

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

      <v-alert
        v-if="!cargando && !error && peliculas.length === 0"
        type="info"
        variant="tonal"
        icon="mdi-movie-search"
        class="mb-4"
      >
        No se encontraron películas.
      </v-alert>

      <v-row>
        <v-col
          v-for="pelicula in peliculas"
          :key="pelicula.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <MovieCard :pelicula="pelicula" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  obtenerPopulares,
  buscarPeliculas,
  descubrirPorGenero,
} from '@/services/tmdb.js'
import SearchBar from '@/components/SearchBar.vue'
import MovieFilter from '@/components/MovieFilter.vue'
import MovieCard from '@/components/MovieCard.vue'

const peliculas = ref([])
const cargando = ref(false)
const error = ref('')
const modo = ref('populares')

const titulos = {
  populares: { titulo: 'Películas populares', subtitulo: 'Lo más visto en este momento', icono: 'mdi-fire' },
  busqueda: { titulo: 'Resultados de búsqueda', subtitulo: 'Películas que coinciden con tu búsqueda', icono: 'mdi-magnify' },
  genero: { titulo: 'Filtradas por género', subtitulo: 'Películas del género seleccionado', icono: 'mdi-theater' },
}

const titulo = computed(function () {
  return titulos[modo.value].titulo
})

const subtitulo = computed(function () {
  return titulos[modo.value].subtitulo
})

const iconoTitulo = computed(function () {
  return titulos[modo.value].icono
})

function cargarPopulares() {
  cargando.value = true
  error.value = ''
  modo.value = 'populares'

  obtenerPopulares()
    .then(function (lista) {
      peliculas.value = lista
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
}

function buscarPorTitulo(texto) {
  cargando.value = true
  error.value = ''
  modo.value = 'busqueda'

  buscarPeliculas(texto)
    .then(function (lista) {
      peliculas.value = lista
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
}

function filtrarPorGenero(genreId) {
  cargando.value = true
  error.value = ''
  modo.value = 'genero'

  descubrirPorGenero(genreId)
    .then(function (lista) {
      peliculas.value = lista
    })
    .catch(function (err) {
      error.value = err.message
    })
    .finally(function () {
      cargando.value = false
    })
}

onMounted(function () {
  cargarPopulares()
})
</script>
