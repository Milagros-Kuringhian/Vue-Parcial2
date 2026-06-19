<template>
  <v-container>
      <div class="d-flex align-center page-header">
        <div class="page-header__icon">
          <v-icon :icon="iconoTitulo" color="primary" />
        </div>
        <div class="page-header__text">
          <h1 class="page-header__title mb-0">{{ titulo }}</h1>
          <p class="page-header__subtitle mb-0">{{ subtitulo }}</p>
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

      <RouterLink
        v-if="destacada"
        :to="'/pelicula/' + destacada.id"
        class="home-hero text-decoration-none mb-6"
      >
        <div class="home-hero__backdrop" :style="estiloHero" />
        <div class="home-hero__overlay" />
        <div class="home-hero__content">
          <v-chip size="small" color="primary" class="mb-2">Popular ahora</v-chip>
          <h2 class="text-h5 font-weight-bold text-white mb-2">{{ destacada.title }}</h2>
          <p class="text-body-2 text-white home-hero__overview mb-3">
            {{ resumenHero }}
          </p>
          <span class="home-hero__cta">
            Ver detalle
            <v-icon icon="mdi-arrow-right" size="18" class="ml-1" />
          </span>
        </div>
      </RouterLink>

      <v-alert
        v-if="!cargando && !error && peliculasGrilla.length === 0 && !destacada"
        type="info"
        variant="tonal"
        icon="mdi-movie-search"
        class="mb-4"
      >
        No se encontraron películas.
      </v-alert>

      <v-row>
        <v-col
          v-for="pelicula in peliculasGrilla"
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  obtenerPopulares,
  buscarPeliculas,
  descubrirPorGenero,
  urlBackdrop,
  urlPoster,
} from '@/services/peliculas.js'
import SearchBar from '@/components/SearchBar.vue'
import MovieFilter from '@/components/MovieFilter.vue'
import MovieCard from '@/components/MovieCard.vue'

const peliculas = ref([])
const cargando = ref(false)
const error = ref('')
const modo = ref('populares')

const titulos = {
  populares: { titulo: 'Encontrá tu película ideal', subtitulo: 'Descubrí películas, consultá sus detalles y encontrá tu próxima favorita.', icono: 'mdi-movie-open' },
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

const destacada = computed(function () {
  if (modo.value !== 'populares' || !peliculas.value.length) {
    return null
  }
  return peliculas.value[0]
})

const peliculasGrilla = computed(function () {
  if (modo.value === 'populares' && peliculas.value.length > 1) {
    return peliculas.value.slice(1)
  }
  if (modo.value === 'populares' && peliculas.value.length === 1) {
    return []
  }
  return peliculas.value
})

const estiloHero = computed(function () {
  if (!destacada.value) {
    return undefined
  }

  const imagen = destacada.value.backdrop_path
    ? urlBackdrop(destacada.value.backdrop_path)
    : urlPoster(destacada.value.poster_path)

  if (!imagen) {
    return undefined
  }

  return { backgroundImage: `url(${imagen})` }
})

const resumenHero = computed(function () {
  const texto = destacada.value?.overview || ''
  if (texto.length <= 140) {
    return texto
  }
  return texto.slice(0, 140) + '…'
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

<style scoped>
.home-hero {
  position: relative;
  display: block;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(var(--app-primary-rgb), 0.2);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.home-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.home-hero__backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
}

.home-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.55) 55%,
    rgba(0, 0, 0, 0.25) 100%
  );
}

.home-hero__content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1.5rem;
  max-width: 520px;
}

.home-hero__overview {
  opacity: 0.85;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-hero__cta {
  display: inline-flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  font-size: 0.95rem;
}
</style>
