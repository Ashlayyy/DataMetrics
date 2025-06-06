<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar } from 'vue-chartjs';

const options = {
  scales: {
    y: {
      beginAtZero: false
    }
  }
};

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      options
    };
  },
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
