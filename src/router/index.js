import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      components: {
        default: () => import('@/views/HomeView.vue'),
        navbar: () => import('@/components/NavBar.vue'),
      },
    },
    {
      path: '/pelicula/:id',
      components: {
        default: () => import('@/views/MovieDetailView.vue'),
        navbar: () => import('@/components/NavBar.vue'),
      },
    },
    {
      path: '/favoritos',
      components: {
        default: () => import('@/views/FavoritesView.vue'),
        navbar: () => import('@/components/NavBar.vue'),
      },
    },
  ],
})

export default router
