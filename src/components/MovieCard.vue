<template>
  <RouterLink :to="'/pelicula/' + pelicula.id" class="text-decoration-none">
    <v-card class="h-100 movie-card" hover border>
      <div class="position-relative">
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
        <v-chip
          v-if="pelicula.vote_average"
          class="position-absolute rating-chip"
          size="small"
          color="secondary"
          prepend-icon="mdi-star"
        >
          {{ pelicula.vote_average.toFixed(1) }}
        </v-chip>
      </div>
      <v-card-title class="text-wrap text-body-1">{{ pelicula.title }}</v-card-title>
      <v-card-subtitle v-if="anio">{{ anio }}</v-card-subtitle>
    </v-card>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { urlPoster } from '@/services/tmdb.js'

const props = defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})

const anio = computed(function () {
  if (!props.pelicula.release_date) return ''
  return props.pelicula.release_date.slice(0, 4)
})
</script>

<style scoped>
.movie-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border-color: rgba(99, 102, 241, 0.12) !important;
  background: rgba(34, 38, 54, 0.6) !important;
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.35) !important;
}

.rating-chip {
  top: 10px;
  right: 10px;
  font-weight: 600;
}
</style>
