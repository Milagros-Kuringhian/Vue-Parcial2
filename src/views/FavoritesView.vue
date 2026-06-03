<template>
  <v-main>
    <v-container>
      <div class="d-flex align-center mb-4 page-header">
        <div class="page-header__icon mr-3">
          <v-icon icon="mdi-heart" color="primary" />
        </div>
        <div>
          <h1 class="text-h6 font-weight-medium mb-0">Mis favoritos</h1>
          <p class="text-caption text-medium-emphasis mb-0">
            {{ favoritos.length }} película{{ favoritos.length !== 1 ? 's' : '' }} guardada{{ favoritos.length !== 1 ? 's' : '' }}
          </p>
        </div>
      </div>

      <v-alert
        v-if="favoritos.length === 0"
        type="info"
        variant="tonal"
        icon="mdi-heart-outline"
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
          <v-card class="h-100 favorite-card" border>
            <RouterLink :to="'/pelicula/' + pelicula.id" class="text-decoration-none">
              <v-img
                :src="urlPoster(pelicula.poster_path)"
                height="300"
                cover
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
                    <v-icon icon="mdi-movie-off" size="48" color="grey" />
                  </div>
                </template>
              </v-img>
              <v-card-title class="text-wrap text-body-1">{{ pelicula.title }}</v-card-title>
            </RouterLink>
            <v-card-actions>
              <v-btn
                color="error"
                variant="text"
                prepend-icon="mdi-heart-off"
                block
                @click="quitar(pelicula.id)"
              >
                Quitar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar" color="error" timeout="2500">
      Película quitada de favoritos
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerFavoritos, quitarFavorito } from '@/services/favorites.js'
import { urlPoster } from '@/services/tmdb.js'

const favoritos = ref([])
const snackbar = ref(false)

function cargarFavoritos() {
  favoritos.value = obtenerFavoritos()
}

function quitar(id) {
  quitarFavorito(id)
  cargarFavoritos()
  snackbar.value = true
}

onMounted(function () {
  cargarFavoritos()
})
</script>

<style scoped>
.favorite-card {
  border-color: rgba(99, 102, 241, 0.12) !important;
  background: rgba(34, 38, 54, 0.6) !important;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.favorite-card:hover {
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.14);
  border-color: rgba(99, 102, 241, 0.3) !important;
}
</style>
