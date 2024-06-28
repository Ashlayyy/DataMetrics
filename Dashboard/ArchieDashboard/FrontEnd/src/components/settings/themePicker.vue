<template>
  <section class="theme_picker">
    <VaSwitch v-model="theme" color="#5123a1" off-color="#fccc03" style="--va-switch-checker-background-color: #252723">
      <template #innerLabel>
        <div class="va-text-center">
          <VaIcon :name="theme ? 'dark_mode' : 'light_mode'" />
        </div>
      </template>
    </VaSwitch>
  </section>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useColors } from 'vuestic-ui';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme();
const { applyPreset } = useColors();

const theme = ref(false);

watch(theme, (value) => {
  applyPreset(value ? 'dark' : 'light');
  vuetifyTheme.global.name.value = vuetifyTheme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', value ? 'dark' : 'light');
});

onMounted(() => {
  theme.value = localStorage.getItem('theme') === 'dark';
});
</script>

<style lang="scss" scoped>
.theme_picker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
