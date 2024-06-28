<template>
  <v-select v-model="selectedItem" :items="items" :label="$t('growth.title')"></v-select>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const selectedItem = ref(t('growth.types.1'));
const items = reactive([t('growth.types.1'), t('growth.types.2'), t('growth.types.3'), t('growth.types.4')]);

const emit = defineEmits(['update:selectedItem']);

watch(selectedItem, (newValue) => {
  emit('update:selectedItem', newValue);
});
</script>
