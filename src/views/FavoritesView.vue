<template>
  <v-container>
      <div class="d-flex align-center page-header">
        <div class="page-header__icon">
          <v-icon icon="mdi-heart" color="primary" />
        </div>
        <div class="page-header__text">
          <h1 class="page-header__title mb-0">Mis favoritos</h1>
          <p class="page-header__subtitle mb-0">
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
          <v-card
            class="h-100 favorite-card app-surface-card"
            :border="designProps.cardBorder"
            :elevation="designProps.cardElevation"
          >
            <RouterLink :to="'/pelicula/' + pelicula.id" class="text-decoration-none">
              <v-img
                :src="urlPoster(pelicula.poster_path)"
                aspect-ratio="2/3"
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerFavoritos, quitarFavorito } from '@/services/favorites.js'
import { urlPoster } from '@/services/peliculas.js'
import { useDesignFormat } from '@/composables/useVisualTheme.js'

const { designProps } = useDesignFormat()

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
