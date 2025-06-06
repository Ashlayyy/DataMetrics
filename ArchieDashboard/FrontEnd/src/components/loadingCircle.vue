<template>
  <v-progress-circular indeterminate :size="100" color="teal" :width="10" v-if="linear == false">
    <template v-slot:default>Loading...</template>
  </v-progress-circular>
  <v-progress-linear v-else indeterminate color="teal" :height="25" rounded> Loading Data... </v-progress-linear>
</template>

<script lang="ts">
export default {
  props: { linear: Boolean }
};
</script>

<style lang="scss"></style>
