<template>
  <LineGraph :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'LineChart',
  components: { LineGraph: Line },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
