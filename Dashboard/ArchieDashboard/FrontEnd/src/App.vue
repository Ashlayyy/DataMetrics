<script setup lang="ts">
import { RouterView } from 'vue-router';
import NotificationHolder from './components/NotificationHolder.vue';
import HomeViewLayout from './layouts/HomeViewLayout.vue';
</script>

<template>
  <NotificationHolder />
  <HomeViewLayout>
    <template #content>
      <RouterView :key="$route.fullPath" />
    </template>
  </HomeViewLayout>
</template>

<style scoped></style>
