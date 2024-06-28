<template :vue-mounted="handleIncomingList()">
  <section class="select">
    <v-autocomplete
      v-model="selected"
      v-model:search="search"
      :hide-no-data="false"
      clearable
      chips
      multiple
      persistent-hint
      label="Select DB's!"
      :items="databases"
      center-affix
      :menu-props="{ width: '300', maxHeight: '300' }"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title v-if="items.length > 0">
            {{ $t('select.geenResultaatMatching') }} "<strong>{{ search }}</strong
            >"
          </v-list-item-title>
          <v-list-item-title v-else> {{  $t('select.geenResultaat') }} </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const items = ref<string[]>([]);
const selected = ref([]);
const search = ref('');

defineProps({
  databases: {
    type: Array<string>,
    required: true
  }
});

const emit = defineEmits(['data-change']);

watch(selected, () => {
  emit('data-change', selected.value);
});
</script>
