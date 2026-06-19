<template>
  <v-select
    v-model="generoSeleccionado"
    :items="generos"
    item-title="name"
    item-value="id"
    placeholder="Género"
    prepend-inner-icon="mdi-theater"
    :variant="selectDefaults.variant"
    :density="selectDefaults.density"
    :rounded="selectDefaults.rounded"
    clearable
    hide-details
    @update:model-value="filtrar"
  />
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { obtenerGeneros } from '@/services/peliculas.js'
import { useDesignFormat } from '@/composables/useVisualTheme.js'

const emit = defineEmits(['filtrar', 'limpiar'])

const { designVuetify } = useDesignFormat()

const selectDefaults = computed(function () {
  return designVuetify.value.VSelect
})

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
