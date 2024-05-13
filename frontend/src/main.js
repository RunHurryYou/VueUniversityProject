import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

// Подключение менеджера метаданных HTML (необходимы для изменения содержимого тега title в зависимости от страницы)
// import VuePageTitle from 'vue-page-title'
// Vue.use(VuePageTitle, { router: router });

// Подключение уведомлений
import VueAWN from "vue-awesome-notifications"
import "vue-awesome-notifications/dist/styles/style.css";
// устанавливаем значения по умолчанию
var options = {
    messages: {
        success: "Успешно"
    },
    labels: {
        success: "",
        info: "",
        alert: ""
    }
};
Vue.use(VueAWN, options);

// Подключение  WISIWYG-редактора
import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use( CKEditor );

// Подключение библиотеки для работы с датой и временем Moment.js
import moment from 'moment'
moment.locale('ru');
Vue.prototype.$moment = moment;

// Подключение Font Awesome
import "../public/fontawesome-pro-5.13.0-web/css/all.css";

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

Vue.use(Vuex);

// Подключение глобальных функций
import {globalFunctions} from './global.functions'
Vue.prototype.$globalFunction = globalFunctions;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
