<template>
  <v-card
    class="h-100 movie-card app-surface-card movie-card--clickable"
    hover
    :border="designProps.cardBorder"
    :elevation="designProps.cardElevation"
    @click="irADetalle"
  >
    <div class="position-relative">
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

    <v-card-title class="text-wrap text-body-1">
      {{ pelicula.title }}
    </v-card-title>

    <v-card-subtitle v-if="anio">
      {{ anio }}
    </v-card-subtitle>

    <v-card-actions @click.stop>
      <v-btn
        color="primary"
        :variant="designProps.detailBtnVariant"
        text="Ver detalle"
        :to="'/pelicula/' + pelicula.id"
      />

      <v-spacer />

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text>
          {{ pelicula.overview || 'Sin descripción disponible.' }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { urlPoster } from '@/services/peliculas.js'
import { useDesignFormat } from '@/composables/useVisualTheme.js'

const router = useRouter()
const { designProps } = useDesignFormat()

const props = defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})

const show = ref(false)

function irADetalle() {
  router.push('/pelicula/' + props.pelicula.id)
}

const anio = computed(function () {
  if (!props.pelicula.release_date) return ''
  return props.pelicula.release_date.slice(0, 4)
})
</script>

<style scoped>
.movie-card--clickable {
  cursor: pointer;
}

.rating-chip {
  top: 10px;
  right: 10px;
  font-weight: 600;
}
</style>
