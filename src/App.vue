<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppTheme } from '@/composables/useAppTheme.js'

const { initTheme } = useAppTheme()

onMounted(function () {
  initTheme()
})
</script>

<template>
  <v-app>
    <RouterView name="navbar" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
