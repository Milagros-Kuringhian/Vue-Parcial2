<template>
  <RouterLink :to="'/pelicula/' + pelicula.id" class="text-decoration-none">
    <v-card class="h-100">
      <v-img
        :src="urlPoster(pelicula.poster_path)"
        height="300"
        cover
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
            Sin póster
          </div>
        </template>
      </v-img>
      <v-card-title class="text-wrap">{{ pelicula.title }}</v-card-title>
    </v-card>
  </RouterLink>
</template>

<script setup>
import { urlPoster } from '@/services/tmdb.js'

defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})
</script>
