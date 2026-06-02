<template>
  <v-row class="mb-4">
    <v-col cols="12" sm="6" md="4">
      <v-select
        v-model="generoSeleccionado"
        :items="generos"
        item-title="name"
        item-value="id"
        label="Filtrar por género"
        variant="outlined"
        clearable
        hide-details
        @update:model-value="filtrar"
      />
    </v-col>
    <v-col cols="12" sm="4" md="2" class="d-flex align-center">
      <v-btn variant="outlined" block @click="limpiar">Ver populares</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerGeneros } from '@/services/tmdb.js'

const emit = defineEmits(['filtrar', 'limpiar'])

const generos = ref([])
const generoSeleccionado = ref(null)

function filtrar(valor) {
  if (valor) {
    emit('filtrar', valor)
  }
}

function limpiar() {
  generoSeleccionado.value = null
  emit('limpiar')
}

onMounted(function () {
  obtenerGeneros()
    .then(function (lista) {
      generos.value = lista
    })
    .catch(function () {
      generos.value = []
    })
})
</script>
