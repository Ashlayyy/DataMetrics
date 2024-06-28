<template>
  <v-btn variant="tonal" @click="emit('data-saving')"> Opslaan! </v-btn>
</template>

<script lang="ts" setup>
const emit = defineEmits(['data-saving']);
</script>
