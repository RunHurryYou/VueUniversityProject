<template>
  <div class="container">
    <div class="input-group">
      <input class="form-control" type="date" v-model="options.begin"/>
      <input class="form-control" type="date" v-model="options.end"/>
      <select class="form-select form-control" aria-label="Выбор по умолчанию" v-model="options.category" multiple>
        <option v-for="(category, id) in categories" :key="id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <b-button v-on:click="getReport()" class="btn btn-danger">
        Вывести отчет
      </b-button>
    </div>
    <div class="container" v-if="isBarVisible">
      <Bar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
// DataPage.vue
import Bar from './Bar'

export default {
  name: 'BarChart',
  components: { Bar },
  props: ['userParam'],
  data() {
    return {
      user: {
          id: this.userParam.id,
          name: this.userParam.name,
          isAdmin: this.userParam.isAdmin
      },
      isBarVisible: false,
      response: {},
      dateBegin: '',
      dateEnd: '',
      categories: [],
      options: {
        category: [],
        begin: '',
        end: ''
      },
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Данные о расходах',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    listCategories() {
      http
        .get("/listCategories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(e => {
            this.$awn.alert(this.$globalFunction.formatError(e));
        });
    },
    getReport() {
      this.isBarVisible = false;
      let data = {
        date_begin: this.options.begin != '' ? this.options.begin : '2000-01-01',
        date_end: this.options.end != '' ? this.options.end : '3000-12-31',
        user_id: this.user.id,
        categories: this.options.category.length != 0 ? this.options.category : this.categories.map((x) => x.id),
      }
      http
        .post("/listExpensesByOptions", data)
        .then(response => {
          this.response = response.data;
          this.$set(this.chartData, 'labels', response.data.map((x) => x.expense_date.slice(0, 10)));
          this.$set(this.chartData.datasets[0], 'data', response.data.map((x) => x.amount));
          this.isBarVisible = true;
        })
        .catch(e => {
            this.$awn.alert(this.$globalFunction.formatError(e));
        });
    }
  },
  created() {
    this.listCategories();
  },
  watch: {
  chartData () {
    this.$data._chart.update();
  }
}
}
</script>