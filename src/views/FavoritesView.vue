<template>
  <v-main>
    <v-container>
      <h1 class="text-h5 mb-4">Mis favoritos</h1>

      <v-alert
        v-if="favoritos.length === 0"
        type="info"
        variant="tonal"
        class="mb-4"
      >
        No tenés películas guardadas. Entrá al detalle de una película y tocá "Agregar a favoritos".
      </v-alert>

      <v-row>
        <v-col
          v-for="pelicula in favoritos"
          :key="pelicula.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <MovieCard :pelicula="pelicula" />
          <v-btn
            color="error"
            variant="text"
            block
            class="mt-2"
            prepend-icon="mdi-heart-off"
            @click="quitar(pelicula.id)"
          >
            Quitar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerFavoritos, quitarFavorito } from '@/services/favorites.js'
import MovieCard from '@/components/MovieCard.vue'

const favoritos = ref([])

function cargarFavoritos() {
  favoritos.value = obtenerFavoritos()
}

function quitar(id) {
  quitarFavorito(id)
  cargarFavoritos()
}

onMounted(function () {
  cargarFavoritos()
})
</script>
