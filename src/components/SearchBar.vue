<template>
  <v-row class="mb-4">
    <v-col cols="12" sm="8" md="6">
      <v-text-field
        v-model="texto"
        label="Buscar películas por título"
        variant="outlined"
        hide-details
        @keyup.enter="buscar"
      />
    </v-col>
    <v-col cols="12" sm="4" md="2" class="d-flex align-center">
      <v-btn color="primary" block @click="buscar">Buscar</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['buscar'])

const texto = ref('')

function buscar() {
  if (texto.value.trim()) {
    emit('buscar', texto.value.trim())
  }
}
</script>
