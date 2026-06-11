const CLAVE = 'peliculas_favoritas'

export function obtenerFavoritos() {
  const json = localStorage.getItem(CLAVE)
  return json ? JSON.parse(json) : []
}

export function guardarFavoritos(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function agregarFavorito(pelicula) {
  const lista = obtenerFavoritos()
  const yaExiste = lista.some(function (p) {
    return p.id === pelicula.id
  })
  if (!yaExiste) {
    lista.push({
      id: pelicula.id,
      title: pelicula.title,
      poster_path: pelicula.poster_path,
    })
    guardarFavoritos(lista)
  }
}

export function quitarFavorito(id) {
  const lista = obtenerFavoritos().filter(function (p) {
    return p.id !== id
  })
  guardarFavoritos(lista)
}

export function esFavorito(id) {
  return obtenerFavoritos().some(function (p) {
    return p.id === id
  })
}
