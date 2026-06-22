const API_KEY = '4c721763d28c82efc14ef0eb591a347f'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_POSTER = 'https://image.tmdb.org/t/p/w500'
const IMG_BACKDROP = 'https://image.tmdb.org/t/p/w1280'

function pedir(endpoint) {
  const url = `${BASE_URL}${endpoint}&api_key=${API_KEY}&language=es-ES`
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error('Error al conectar con TMDB')
    }
    return response.json()
  })
}

export function urlPoster(posterPath) {
  if (!posterPath) return null
  return IMG_POSTER + posterPath
}

export function urlBackdrop(backdropPath) {
  if (!backdropPath) return null
  return IMG_BACKDROP + backdropPath
}

export function tieneDescripcion(pelicula) {
  return Boolean(pelicula?.overview?.trim())
}

export function filtrarConDescripcion(peliculas) {
  return peliculas.filter(tieneDescripcion)
}

export function obtenerPopulares() {
  return pedir('/movie/popular?').then(function (data) {
    return filtrarConDescripcion(data.results)
  })
}

export function buscarPeliculas(texto) {
  const query = encodeURIComponent(texto)
  return pedir('/search/movie?query=' + query + '&').then(function (data) {
    return filtrarConDescripcion(data.results)
  })
}

export function obtenerDetalle(id) {
  return pedir('/movie/' + id + '?').then(function (data) {
    if (!tieneDescripcion(data)) {
      throw new Error('Esta película no tiene descripción disponible.')
    }
    return data
  })
}

export function obtenerSimilares(id) {
  return pedir('/movie/' + id + '/similar?').then(function (data) {
    return filtrarConDescripcion(data.results)
  })
}

export function obtenerGeneros() {
  return pedir('/genre/movie/list?').then(function (data) {
    return data.genres
  })
}

export function descubrirPorGenero(genreId) {
  return pedir('/discover/movie?with_genres=' + genreId + '&').then(function (data) {
    return filtrarConDescripcion(data.results)
  })
}
