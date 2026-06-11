<template>
  <v-main>
    <v-container>
      <h1 class="text-h5 mb-4">Películas</h1>

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
import { ref, onMounted } from 'vue'
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

function cargarPopulares() {
  cargando.value = true
  error.value = ''

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
