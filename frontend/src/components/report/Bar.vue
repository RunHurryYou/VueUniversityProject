<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: ['options', 'data'],
  computed: {
      chartData() { return this.data },
      chartOptions() { return this.options }
  }
}
</script>