<template>
  <section class="settings">
    <h2>{{ $t('settings.title') }}</h2>
    <br />
    <v-sheet rounded width="400" max-width="600">
      <v-form rounded class="settings_form">
        <h3>{{ $t('settings.language') }}</h3>
        <v-select v-model="language" label="Language" :items="languages"></v-select>
      </v-form>
    </v-sheet>
    <v-sheet rounded width="400" max-width="600">
      <v-form rounded class="settings_form">
        <h3>{{ $t('settings.theme') }}</h3>
        <themePicker></themePicker>
      </v-form>
    </v-sheet>
    <br />
    <v-sheet rounded width="400" max-width="600">
      <v-form rounded class="settings_form">
        <v-btn size="large" rounded="xl" prepend-icon="mdi-chevron-left" variant="tonal">
          <router-link :to="{ name: 'home' }" class="backLink">
            {{ $t('getBackButton') }}
          </router-link>
        </v-btn>
      </v-form>
    </v-sheet>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import themePicker from '../components/settings/themePicker.vue';

const language = ref<string>('Nederlands');
const languages = ref<string[]>(['English', 'Nederlands']);

const { locale } = useI18n();

watch(language, (value) => {
  if (value === 'English') {
    locale.value = 'en';
    localStorage.setItem('language', 'en');
  } else {
    locale.value = 'nl';
    localStorage.setItem('language', 'nl');
  }
});

onMounted(() => {
  const lang = localStorage.getItem('language');
  if (lang) {
    language.value = lang === 'en' ? 'English' : 'Nederlands';
  }
});
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
  padding: 5rem;

  &_form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
