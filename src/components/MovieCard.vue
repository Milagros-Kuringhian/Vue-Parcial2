<template>
  <RouterLink :to="'/pelicula/' + pelicula.id" class="text-decoration-none">
    <v-card class="h-100" hover>
      <v-img
        :src="urlPoster(pelicula.poster_path)"
        height="300"
        cover
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
            <v-icon icon="mdi-movie-off" size="48" />
          </div>
        </template>
      </v-img>
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
