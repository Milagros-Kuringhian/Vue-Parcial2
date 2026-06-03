<template>
  <v-row class="search-toolbar mb-3" dense>
    <v-col cols="12" sm="5" md="5">
      <v-text-field
        v-model="texto"
        placeholder="Buscar por título…"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        clearable
        hide-details
        single-line
        @keyup.enter="buscar"
        @click:clear="limpiar"
      />
    </v-col>
    <v-col cols="12" sm="4" md="5">
      <slot />
    </v-col>
    <v-col cols="12" sm="3" md="2" class="d-flex align-center">
      <v-btn
        class="search-toolbar__btn"
        color="primary"
        variant="tonal"
        block
        prepend-icon="mdi-magnify"
        @click="buscar"
      >
        Buscar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['buscar', 'limpiar'])

const texto = ref('')

function buscar() {
  if (texto.value && texto.value.trim()) {
    emit('buscar', texto.value.trim())
  }
}

function limpiar() {
  texto.value = ''
  emit('limpiar')
}
</script>
