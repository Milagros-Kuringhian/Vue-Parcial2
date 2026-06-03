<template>
  <v-select
    v-model="generoSeleccionado"
    :items="generos"
    item-title="name"
    item-value="id"
    placeholder="Género"
    prepend-inner-icon="mdi-theater"
    density="compact"
    clearable
    hide-details
    @update:model-value="filtrar"
  />
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
  } else {
    emit('limpiar')
  }
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
