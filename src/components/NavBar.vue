<template>
  <div>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = true"
      />

      <v-app-bar-title>Películas</v-app-bar-title>

      <v-spacer />

      <div class="d-none d-md-flex ga-2">
        <v-btn variant="text" to="/" prepend-icon="mdi-home">
          Inicio
        </v-btn>
        <v-btn variant="text" to="/favoritos" prepend-icon="mdi-heart">
          Favoritos
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/" prepend-icon="mdi-home" title="Inicio" @click="drawer = false" />
        <v-list-item to="/favoritos" prepend-icon="mdi-heart" title="Favoritos" @click="drawer = false" />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
