<template>
  <div class="filterComponent">
    <div class="filterComponent_filter">
      <v-autocomplete
        v-model="typedFilter"
        class="typingComponent"
        clearable
        label="Select or type!"
        :items="defaultItems"
      ></v-autocomplete>
      <v-btn
        @click="openMenu()"
        :ripple="true"
        elevation="0"
        size="x-large"
        icon="mdi-calendar"
        variant="plain"
        rounded="xl"
      ></v-btn>
    </div>
    <VueDatePicker
      class="menu-activator"
      v-show="false"
      v-model="date"
      range
      :enable-time-picker="false"
      :teleport="true"
      :clearable="true"
      position="center"
      ref="datepicker"
      :alt-position="customPosition"
    ></VueDatePicker>
  </div>
</template>

<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ApiService from '../../services/ApiService.service';

const i18n = useI18n();
const apiService = new ApiService();

const datepicker = ref<DatePickerInstance>();
const date = ref('');
const defaultItems = ref([
  `${i18n.t('filterItems.item1')}`,
  `${i18n.t('filterItems.item2')}`,
  `${i18n.t('filterItems.item3')}`,
  `${i18n.t('filterItems.item4')}`,
  `${i18n.t('filterItems.item5')}`,
  `${i18n.t('filterItems.item6')}`
]);
const formattedDate = ref('');
const typedFilter = ref('');

const customPosition = () => ({ top: 50, left: 875 });

const emits = defineEmits(['data-change-calendar', 'data-change-typing']);

const openMenu = () => {
  if (datepicker.value) {
    datepicker.value.openMenu();
  }
};

watch(typedFilter, async (newVal) => {
  const response = await apiService.fetchApi('/database/metrics/statistics');
  const lastDate = response.data.Date;

  const amount = Number(newVal?.split(' ')[0].toLowerCase());
  const type = newVal?.split(' ')[1].toLowerCase();
  let date = [0, 0];

  switch (type) {
    case 'dagen':
    case 'days':
      date = [lastDate - amount, lastDate];
      break;
    case 'weken':
    case 'months':
      date = [
        lastDate - amount * 7 * 4,
        lastDate - amount * 7 * 3,
        lastDate - amount * 7 * 2,
        lastDate - amount * 7 * 1,
        lastDate
      ];
      break;
    case 'jaar':
    case 'year':
      date = [
        lastDate - amount * 30 * 12,
        lastDate - amount * 30 * 10,
        lastDate - amount * 30 * 8,
        lastDate - amount * 30 * 6,
        lastDate - amount * 30 * 4,
        lastDate - amount * 30 * 2,
        lastDate
      ];
      break;
    default:
      date = [
        lastDate - 30 * 6,
        lastDate - 30 * 5,
        lastDate - 30 * 4,
        lastDate - 30 * 3,
        lastDate - 30 * 2,
        lastDate - 30 * 1,
        lastDate
      ];
      break;
  }
  emits('data-change-typing', date);
});

watch(date, (newVal) => {
  let dateValues: any = [...newVal];
  formattedDate.value = dateValues.map((element: any) => {
    const year = new Date(element).getFullYear();
    const month = new Date(element).getMonth();
    const date = new Date(element).getDate();
    return `${date}-${month + 1}-${year}`;
  });
  emits('data-change-calendar', formattedDate.value);
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.filterComponent {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  min-width: 15rem;

  &_filter {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
  }
}

.typingComponent {
  width: 100%;
}
</style>
