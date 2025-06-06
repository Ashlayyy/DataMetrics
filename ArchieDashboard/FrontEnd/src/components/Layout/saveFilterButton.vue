<template>
  <v-btn variant="tonal" @click="emit('data-saving')"> {{ $t('buttonTekst.save') }} </v-btn>
</template>

<script lang="ts" setup>
const emit = defineEmits(['data-saving']);
</script>
