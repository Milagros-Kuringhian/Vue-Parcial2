# RULES — Parcial 2 Vue (películas)

Guía definitiva de **arquitectura, convenciones y cumplimiento de consignas** para el proyecto en `Vue-Parcial2/`.

> **Regla principal:** cada decisión técnica de esta guía debe seguir cumpliendo el texto de [CONSIGNA.md](../Vue-Parcial2/docs/CONSIGNA.md). Si algo no está claro, priorizar la consigna.

---

## 1. Objetivo y entrega

Crear una aplicación web con **Vue.js 3** que permita:

- Ver películas populares en la página de inicio.
- Buscar películas por título.
- Ver el detalle de una película seleccionada (título, descripción, año, póster y al menos un dato más).
- Filtrar resultados (por género o clasificación por edades).
- Agregar películas a favoritos con persistencia (`localStorage` o IndexedDB).
- Interfaz usable en móvil (**mobile first**, consigna 6).
- Obtener datos con **`fetch`** contra [The Movie Database (TMDB)](https://developer.themoviedb.org/docs).

**Modalidad de entrega:**

- Grupos de hasta **3** integrantes (anotar nombres en el README).
- Proyecto en **repositorio GitHub** accesible para el docente.
- No commitear `.env` con la API key. Incluir `.env.example` en el repo.

---

## 2. Mapa de cumplimiento — CONSIGNA.md

| Consigna | Cómo cumplirla en este proyecto |
|----------|----------------------------------|
| **Objetivo general** | Vue 3 + Vite. Rutas: inicio con listado, búsqueda, detalle `/pelicula/:id`, favoritos |
| **1.** Populares en inicio | `HomeView.vue` en `/` → `GET /movie/popular` → lista con título y póster |
| **2.** Búsqueda por título | `SearchBar.vue` → `GET /search/movie?query=` → misma lista/tarjetas que el inicio |
| **3.** Detalle al seleccionar | Clic en tarjeta → `/pelicula/:id` → `GET /movie/{id}` → `title`, `overview`, año de `release_date`, póster + extra (`runtime`, géneros o `vote_average`) |
| **4.** Filtro | `MovieFilter.vue` → `GET /discover/movie` con `with_genres` **o** `certification` + `certification_country` |
| **5.** Favoritos | Botón **"Agregar a favoritos"** en `MovieDetailView.vue`; persistir en `localStorage` vía `src/services/favorites.js` |
| **6.** Mobile first | Layout responsive con Vuetify (`cols="12"` primero; breakpoints `sm`/`md`/`lg`) |
| **7.** Fetch a TMDB | Todo en `src/services/peliculas.js` con `fetch` nativo |

| Nota | Requisitos |
|------|------------|
| **Mínimo (4)** | Consignas 1 a 4 |
| **Para subir nota** | Consignas 5, 6 y 7 también implementadas |

---

## 3. Stack del proyecto

| Tecnología | Uso en este repo |
|------------|------------------|
| Vue 3 | Composition API, `<script setup>` |
| Vite | Dev server y build (`pnpm dev`, `pnpm build`) |
| Vue Router 4 | Rutas con lazy load y **named views** |
| Vuetify 3 | Layout (`v-container`, `v-row`, `v-col`, cards, inputs, botones) |
| JavaScript | Archivos `.js` y `.vue` — **sin TypeScript** |
| pnpm | Gestor de paquetes (`packageManager` en `package.json`) |
| TMDB API | `fetch` nativo con `.then()` / `.catch()` |

La consigna menciona “Vue.js 3 con el CLI”. El equivalente actual es **create-vue** (genera Vite). **No hace falta migrar a Vue CLI** ni recrear el proyecto.

### Comandos habituales

```sh
pnpm install    # dependencias
pnpm dev        # desarrollo (http://localhost:5173)
pnpm build      # build de producción
pnpm preview    # previsualizar build
```

### Requisitos en la máquina

- Node.js `^20.19.0` o `>=22.12.0`
- Git
- Editor con extensión **Vue - Official (Volar)** (recomendado)

---

## 4. Lo que SÍ y NO usar

### Permitido / obligatorio

- `<script setup>` en todos los componentes `.vue`
- Alias `@` → `src/` (configurado en `vite.config.js`)
- Lazy loading de vistas: `() => import('@/views/...')`
- **Named views** para el navbar (no repetir `NavBar` en cada vista)
- Un único módulo de API: `src/services/peliculas.js`
- `localStorage` para favoritos (cumple consigna 5; más simple que IndexedDB)
- Textos de interfaz en **español**

### No usar

| Prohibido | Motivo |
|-----------|--------|
| TypeScript | Convención del proyecto |
| Pinia, Vuex, Nuxt | Fuera del alcance del parcial |
| Axios u otras librerías HTTP | Consigna 7 exige `fetch` nativo |
| `async` / `await` | Usar promesas con `.then()` / `.catch()` / `.finally()` |
| Datos mock o arrays hardcodeados en producción | Consigna 7 exige datos reales de TMDB |
| `fetch` directo a TMDB desde vistas o componentes | Centralizar en `peliculas.js` |

---

## 5. Arquitectura y estructura de archivos

```
Vue-Parcial2/
├── .env                    # API key (no commitear)
├── .env.example            # plantilla sin clave
├── vite.config.js          # alias @ → src/
├── package.json
└── src/
    ├── main.js             # createApp + Vuetify + router
    ├── App.vue             # v-app, navbar + v-main con RouterView
    ├── router/
    │   └── index.js        # rutas con lazy load y named views
    ├── views/
    │   ├── HomeView.vue           # consignas 1, 2, 4 y 7
    │   ├── MovieDetailView.vue    # consignas 3, 5 y 7
    │   └── FavoritesView.vue      # consigna 5
    ├── components/
    │   ├── NavBar.vue             # enlaces Inicio y Favoritos
    │   ├── MovieCard.vue          # tarjeta; clic → detalle
    │   ├── SearchBar.vue          # búsqueda por título
    │   └── MovieFilter.vue        # filtro género o clasificación
    └── services/
        ├── peliculas.js                # todas las llamadas HTTP a TMDB
        └── favorites.js           # persistencia en localStorage
```

### Patrones que debe replicar el código

**App.vue — named views:**

```vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <RouterView name="navbar" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
```

**Router — vista principal + navbar por ruta:**

```javascript
{
  path: '/',
  components: {
    default: () => import('@/views/HomeView.vue'),
    navbar: () => import('@/components/NavBar.vue'),
  },
}
```

**Importaciones con alias:**

```javascript
import { obtenerPopulares } from '@/services/peliculas.js'
```

---

## 6. Router

| Ruta | Vista | Consignas |
|------|-------|-----------|
| `/` | `HomeView.vue` | 1, 2, 4, 7 |
| `/pelicula/:id` | `MovieDetailView.vue` | 3, 5, 7 |
| `/favoritos` | `FavoritesView.vue` | 5 |

`NavBar.vue` debe tener `v-btn` con `:to` a **Inicio** (`/`) y **Favoritos** (`/favoritos`), como en el ejemplo de clase.

En `MovieCard.vue`, el clic navega a `/pelicula/` + `id` de la película.

---

## 7. TMDB y capa de datos

### Configuración

1. Cuenta en [themoviedb.org](https://www.themoviedb.org/?language=es-ES).
2. **API Key (v3)** en [developer.themoviedb.org](https://developer.themoviedb.org/docs).
3. Archivo `.env` en la raíz de `Vue-Parcial2/`:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

4. Leer la clave solo con `import.meta.env.VITE_TMDB_API_KEY`.
5. Agregar `.env` al `.gitignore`.

### Constantes

| Concepto | Valor |
|----------|-------|
| Base URL | `https://api.themoviedb.org/3` |
| Idioma | `language=es-ES` en cada request |
| Póster | `https://image.tmdb.org/t/p/w500` + `poster_path` |

### Endpoints — uno por consigna

| Consigna | Endpoint TMDB |
|----------|---------------|
| **1** Populares | `GET /movie/popular` |
| **2** Búsqueda | `GET /search/movie?query={texto}` |
| **3** Detalle | `GET /movie/{movie_id}` |
| **4a** Filtro por género | `GET /discover/movie?with_genres={id}` |
| **4b** Filtro por edades | `GET /discover/movie?certification_country=US&certification={valor}` (ej. `G`, `PG`, `PG-13`, `R`) |
| **4** Opciones del select | `GET /genre/movie/list` |

Todas las peticiones llevan `api_key` como parámetro de query.

### Reglas del servicio `peliculas.js`

- **Todas** las llamadas HTTP van en este archivo. Vistas y componentes **no** hacen `fetch` directo a TMDB.
- Funciones que **devuelven promesas** con `.then()` — sin `async function` ni `await`.
- Validar que exista la API key y mostrar mensaje claro si falta.
- Manejar errores de red/API y propagarlos a la vista para mostrar feedback al usuario.

Funciones esperadas (nombres en español, como en el proyecto):

| Función | Uso |
|---------|-----|
| `obtenerPopulares()` | Consigna 1 |
| `buscarPeliculas(texto)` | Consigna 2 |
| `obtenerDetalle(id)` | Consigna 3 |
| `obtenerGeneros()` | Opciones del filtro (consigna 4) |
| `descubrirPorGenero(genreId)` | Filtro por género (consigna 4) |
| `descubrirPorClasificacion(certificacion)` | Filtro por edades (consigna 4, alternativa) |
| `urlPoster(posterPath)` | Helper para armar URL de imagen |

Con **un solo tipo de filtro** (género **o** clasificación por edades) ya se cumple la consigna 4.

---

## 8. Favoritos (`src/services/favorites.js`)

- Clave de almacenamiento: `peliculas_favoritas`.
- Funciones: `obtenerFavoritos`, `guardarFavoritos`, `agregarFavorito`, `quitarFavorito`, `esFavorito`.
- Sin duplicados por `id`.
- En `MovieDetailView.vue`, botón con texto literal **"Agregar a favoritos"** (si ya está guardada: "Quitar de favoritos").
- Vista `/favoritos` recomendada para listar lo guardado.

---

## 9. Flujo funcional por pantalla

### Home (`/`)

1. Al montar: `obtenerPopulares()` → llena la lista.
2. Estados: `cargando`, `error`, lista de películas.
3. `SearchBar` reemplaza la lista con resultados de `buscarPeliculas(texto)`; si el texto está vacío, volver a populares.
4. `MovieFilter` actualiza la lista vía `descubrirPorGenero` o `descubrirPorClasificacion`.
5. Clic en tarjeta → navegar a `/pelicula/:id`.

### Detalle (`/pelicula/:id`)

1. Leer `route.params.id` con `useRoute()`.
2. `obtenerDetalle(id)` en `onMounted` (o `watch` del id si cambia la ruta).
3. Mostrar obligatoriamente: título, descripción (`overview`), año (`release_date`), póster y **un dato extra**.
4. Botón de favoritos usando `favorites.js`.

### Favoritos (`/favoritos`)

1. Leer lista desde `localStorage`.
2. Mostrar tarjetas; permitir quitar de favoritos.
3. Clic en tarjeta → mismo detalle que en Home.

### Patrón de carga en vistas (sin async/await)

```javascript
function cargarPopulares() {
  cargando.value = true
  error.value = ''

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
```

---

## 10. Responsabilidad de componentes

| Componente | Responsabilidad | No debe |
|------------|-----------------|---------|
| `MovieCard.vue` | Mostrar póster, título; navegar al detalle | Hacer `fetch` |
| `SearchBar.vue` | Input de búsqueda; emitir evento o llamar servicio | Conocer la lógica de filtros |
| `MovieFilter.vue` | Select de género o clasificación; actualizar lista | Duplicar llamadas fuera de `peliculas.js` |
| `NavBar.vue` | Navegación entre rutas | Contener lógica de datos |

---

## 11. Checklist de entrega

### Modalidad

- [ ] Grupo de hasta **3** integrantes (nombre en README).
- [ ] Repositorio **GitHub** accesible.
- [ ] README con: integrantes, `pnpm install`, `VITE_TMDB_API_KEY`, `pnpm dev`.
- [ ] `.env` fuera del repo; `.env.example` incluido.

### Requisitos mínimos (nota = 4)

- [ ] **1** — Inicio muestra lista de películas populares (`GET /movie/popular`).
- [ ] **2** — Barra de búsqueda por título; resultados en lista (`GET /search/movie`).
- [ ] **3** — Detalle con título, descripción, año, póster y dato extra (`GET /movie/{id}`).
- [ ] **4** — Filtro por género o clasificación por edades (`GET /discover/movie`).

### Requisitos para subir nota

- [ ] **5** — Botón "Agregar a favoritos" en detalle; persistencia en `localStorage`.
- [ ] **6** — Interfaz mobile first (una columna en móvil, layout responsive).
- [ ] **7** — Todo listado y detalle sale de TMDB vía `fetch` en `peliculas.js`.

### Calidad antes de entregar

1. Las **7 consignas** + modalidad cumplidas.
2. Nota 4: consignas 1 a 4 sin errores en consola del navegador.
3. Nota alta: consignas 5, 6 y 7 también implementadas.
4. Código homogéneo: `<script setup>`, lazy routes, Vuetify, `.then()` sin `async/await`.
5. Sin datos mock en la entrega.
6. Mensaje visible si falla la red o falta la API key.

---

## 12. Estado de cumplimiento del código (revisión)

Última revisión contra el código en `Vue-Parcial2/src/`.

### Consignas técnicas — cumplidas

| # | Estado | Evidencia |
|---|--------|-----------|
| 1 | OK | `HomeView.vue` → `obtenerPopulares()` |
| 2 | OK | `SearchBar.vue` + `buscarPeliculas()` |
| 3 | OK | `MovieDetailView.vue` → título, overview, año, póster, runtime, géneros, nota |
| 4 | OK | `MovieFilter.vue` → filtro por género (`descubrirPorGenero`) |
| 5 | OK | Botón "Agregar a favoritos" + `favorites.js` + vista `/favoritos` |
| 6 | OK | `cols="12"` + breakpoints; drawer móvil en `NavBar.vue` |
| 7 | OK | Solo `fetch` en `peliculas.js`; sin `async/await` ni Axios en `src/` |

### Convenciones de código — cumplidas

- `<script setup>` en todos los componentes y vistas.
- Named views + lazy load en `router/index.js`.
- Sin `fetch` fuera de `peliculas.js`.
- Textos de interfaz en español.

### Pendientes de entrega (no son bugs de código)

- [ ] Completar nombres de integrantes en `Vue-Parcial2/README.md`.
- [ ] Subir el repositorio a GitHub y compartir el enlace.
- [ ] Verificar que `.env` no esté commiteado (`.gitignore` ya lo excluye).

### Archivos de reglas deprecados

`Vue-Parcial2/docs/RULES1.md` y `RULES2.md` redirigen a este documento.

---

## 13. Referencias

- Consigna original: [CONSIGNA.md](../Vue-Parcial2/docs/CONSIGNA.md)
- TMDB documentación: https://developer.themoviedb.org/docs
- TMDB sitio: https://www.themoviedb.org/?language=es-ES