# Películas Vue — Parcial 2

Aplicación web con **Vue 3** para buscar, ver detalle y guardar películas favoritas usando la API de [The Movie Database (TMDB)](https://www.themoviedb.org/?language=es-ES).

## Integrantes

- _(Completar con los nombres del grupo, máximo 3)_

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`
- pnpm

### Instalar pnpm (solo una vez)

Si no tenés pnpm instalado:

```sh
npm install -g pnpm
```

O con Corepack (incluido en Node.js):

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

## Instalación del proyecto

```sh
pnpm install
```

## Configuración de la API

1. Crear una cuenta en [TMDB](https://www.themoviedb.org/?language=es-ES).
2. Obtener una **API Key (v3)** en [developer.themoviedb.org](https://developer.themoviedb.org/docs).
3. Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

> **Importante:** no subir el archivo `.env` a GitHub.

## Desarrollo

```sh
pnpm dev
```

Abrir [http://localhost:5173](http://localhost:5173)

## Build de producción

```sh
pnpm build
```

## Consignas implementadas

1. Lista de películas populares en inicio
2. Búsqueda por título
3. Detalle de película al seleccionar
4. Filtro por género
5. Favoritos con localStorage
6. Interfaz mobile first con Vuetify
7. Datos con `fetch` a TMDB
