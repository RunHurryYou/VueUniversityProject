<template>
    <div class="row ml-2">
        <div class="col-sm-6">
            <h5 v-if="user">Пользователь {{user.name}}</h5>
            <button v-if="isMine" @click="$bvModal.show('add-category')" class="btn btn-danger mb-2">Настроить список категорий</button>
            <div class="list row">
                <div class="col-sm">
                    <div v-for="(category, index) in userCategories" v-bind:key="index">
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header">
                                <div class="row">
                                    <b-button v-b-toggle='"" + index' variant="link">
                                        <div class="col-sm">
                                            {{category.name}}
                                        </div>
                                    </b-button>
                                        <div class="col-sm d-flex justify-content-end">
                                            <button @click="deleteCategory(category.id, user_id)" class="btn text-danger" title="Удалить категорию из своего списка">
                                                <u>
                                                    <div v-if="isMine" class="enter-font" size="4">
                                                        <i class="fa fa-times"></i>
                                                        Удалить
                                                    </div>
                                                </u>
                                            </button>
                                        </div>
                                </div>
                            </b-card-header>
                            <b-collapse :id='"" + index' accordion="my-accordion" role="tabpanel">
                                <b-card-body class="card-body-include-list">
                                    <button v-if="isMine" @click="openModalWindowAddExpense(category.id)" class="btn btn-info btn-sm">Добавить данные о расходах</button>

                                    <div class="card mt-2" v-for="(expense, index) in category.user_expenses" :key="index">
                                        <div class="card-body">
                                            <div>
                                                <b>Сумма: </b> {{expense.amount}}
                                            </div>
                                            <div class="mt-2">
                                                <b>Дата: </b> {{$moment(expense.expense_date).format("DD.MM.YYYY")}}
                                            </div>
                                            <div class="mt-2">
                                                <b>Описание: </b>
                                                <div>
                                                    <!--Поскольку из поля WISIWYG-редактора в базу данных сохраняется код html, необходимо обрабатывать при выводе текст в формате HTML-->
                                                    <div v-html="expense.description"/>
                                                </div>
                                            </div>
                                            <a v-if="isMine" href @click.prevent="openModalWindowUpdateExpense(category.id, expense)" class="text-success">
                                                <u>
                                                    Изменить
                                                </u>
                                            </a>
                                            <a v-if="isMine" href @click.prevent="openModalWindowForDeletionExpense(expense)" class="text-danger ml-2">
                                                <u>
                                                    Удалить
                                                </u>
                                            </a>
                                        </div>
                                    </div>
                                </b-card-body>

                            </b-collapse>
                        </b-card>
                    </div>
                </div>
            </div>
            <b-modal id="add-category" title="Добавление категорий" hide-footer >
                <button @click="addCategories" :disabled="selectedCategories.length === 0" class="btn btn-success">Добавить категории</button>
                <ul class="list-group mt-2">
                    <li v-for="(category, index) in categoriesNotUser" v-bind:key="index" class="list-group-item">
                        <div class="row">
                            <div class="col-xs">
                                <input type="checkbox" v-model="selectedCategories" :value="category.id">
                            </div>
                            <div class="col-xs ml-2">
                                {{category.name}}
                            </div>
                        </div>
                    </li>
                </ul>
            </b-modal>

            <b-modal id="add-expense" title="Добавление данных о расходах" hide-footer >
                <form @submit="addExpense">
                    <div class="form-group">
                        <label>Сумма</label>
                        <input type="number" step="any" v-model="expense.amount" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Дата</label>
                        <input type="date" required v-model="expense.expense_date" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label>Описание</label>
                        <ckeditor :editor="editor" :config="editorConfig" required v-model="expense.description"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-success" value="Добавить">
                    </div>
                </form>
            </b-modal>

            <b-modal id="update-expense" title="Обновление данных о расходах" hide-footer >
                <form @submit="updateExpense">
                    <div class="form-group">
                        <label>Сумма</label>
                        <input type="number" step="any" v-model="expense.amount" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Дата</label>
                        <input type="date" required v-model="expense.expense_date" class="form-control">
                    </div>
                    <div class="form-group mt-2">
                        <label>Описание</label>
                        <ckeditor :editor="editor" :config="editorConfig" required v-model="expense.description"/>
                    </div>
                    <div class="float-right mt-2">
                        <input type="submit" class="btn btn-success" value="Обновить">
                        <button class="btn btn-secondary ml-2" @click="$bvModal.hide('update-expense')">Отмена</button>
                    </div>
                </form>
            </b-modal>
            <b-modal id="delete-expense" centered hide-footer hide-header hide-header-close>
                <div class="text-center">
                    <h5>Вы действительно хотите удалить запись?</h5>
                    <div class="col group-yes-no mx-auto">
                        <button class="btn btn-success" @click="deleteExpense()">Да</button>
                        <button class="btn btn-danger ml-2" @click="$bvModal.hide('delete-expense')">Нет</button>
                    </div>
                </div>
            </b-modal>
        </div>
        <div class="col-sm-4">
            <Pie
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                    :chart-id="chartId"
                    :dataset-id-key="datasetIdKey"
                    :plugins="plugins"
                    :css-classes="cssClasses"
                    :styles="styles"
                    :width="width"
                    :height="height"
            />
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    import randomColor from 'randomcolor';

    import { Pie } from 'vue-chartjs'

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        CategoryScale
    } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    export default {
        name: "user-expenses",
        props: { // параметры указываем в другом формате. Ранее указывали в виде обычного массива. Текущий формат необходим из-за использования диаграмм
            user_param: {
                type: Object,
                default: () => {
                }
            },
            user_id: {
                type: String
            },
            chartId: {
                type: String,
                default: 'pie-chart'
            },
            datasetIdKey: {
                type: String,
                default: 'label'
            },
            width: {
                type: Number,
                default: 400
            },
            height: {
                type: Number,
                default: 400
            },
            cssClasses: {
                default: '',
                type: String
            },
            styles: {
                type: Object,
                default: () => {
                }
            },
            plugins: {
                type: Array,
                default: () => []
            }
        },

        components: {
            Pie
        },
        data() {
            return {
                user: this.user_param,
                userCategories: [],
                categoriesNotUser: [],
                selectedCategories: [],
                selectedCategoryId: "",
                expense:{
                    id: "",
                    amount: 0,
                    expense_date: new Date(),
                    description: ""
                },
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                },
                chartData: {
                    labels: [],
                    datasets: [
                        {
                            backgroundColor: [],
                            data: []
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },

        methods: {
            // Проверяем входные параметры, так как при переходе к элементу из списка, объект с информацией передаётся в качестве параметра и его можно
            // обработать. Если переходим напрямую по ссылке вида userWishlist/1, нужно выполнить запрос к серверу.
            checkingInputParameters() {
                if(this.user == null){
                    this.getUser();
                }
            },
            getUser() {
                http
                    .get("/user/"+ this.user_id)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            getCategoriesForUser() {
                http
                    .get("/categoriesForUser/" + this.user_id)
                    .then(response => {
                        this.userCategories = response.data;
                        this.chartData.labels =  this.userCategories.map(item => item.name); // получаем категории
                        this.chartData.datasets[0].data =  this.userCategories.map(item => // считаем сумму по категориям
                            item.user_expenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)
                        );

                        // генерируем случайным образом цвета для диаграммы
                        this.chartData.datasets[0].backgroundColor = [];
                        this.userCategories.forEach(() => { // кол-во цветов = кол-во категорий
                            this.chartData.datasets[0].backgroundColor.push(randomColor());
                        });
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            getCategoriesNotUser() {
                http
                    .get("/categoriesNotUser/" + this.user_id)
                    .then(response => {
                        this.categoriesNotUser = response.data;
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            addCategories() {
                var data = {
                    categories: this.selectedCategories, // передаём массив выбранных категорий
                    user_id: this.user_id
                };
                http
                    .post("/addCategories", data) // новый метод для добавления массива категорий
                    .then(() => { // запрос выполнился успешно
                        this.$bvModal.hide('add-category'); // закрываем модальное окно
                        this.$awn.success();
                        this.getCategoriesForUser();
                        this.getCategoriesNotUser();
                        this.selectedCategories = [];

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            deleteCategory(category_id, user_id) {
                http
                    .post("/deleteCategoryForUser/category_id/" + category_id + "/user_id/" + user_id)
                    .then(() => {
                        this.$awn.success();
                        this.getCategoriesForUser();
                        this.getCategoriesNotUser();
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            openModalWindowAddExpense(category_id){
                this.selectedCategoryId = category_id;
                this.$bvModal.show('add-expense'); // открываем модальное окно
            },
            openModalWindowUpdateExpense(category_id, expense){
                this.selectedCategoryId = category_id;
                this.expense = expense;
                this.expense.id = expense.id;
                this.expense.amount = expense.amount;
                this.expense.expense_date = this.$moment(expense.expense_date).format("YYYY-MM-DD");
                this.expense.description = expense.description;
                this.$bvModal.show('update-expense'); // открываем модальное окно
            },
            openModalWindowForDeletionExpense(expense){
                this.expense = expense;
                this.$bvModal.show('delete-expense'); // открываем модальное окно
            },
            addExpense(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    amount: this.expense.amount,
                    expense_date: this.expense.expense_date,
                    description: this.expense.description,
                    user_id: this.user_id,
                    category_id: this.selectedCategoryId
                };
                http
                    .post("/addUserExpense", data) // новый метод для добавления массива категорий
                    .then(() => { // запрос выполнился успешно
                        this.$bvModal.hide('add-expense'); // закрываем модальное окно
                        this.$awn.success();
                        this.getCategoriesForUser();
                        this.getCategoriesNotUser();
                        this.expense = {};

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            updateExpense(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    amount: this.expense.amount,
                    expense_date: this.expense.expense_date,
                    description: this.expense.description,
                    user_id: this.user_id,
                    category_id: this.selectedCategoryId
                };
                http
                    .post("/updateUserExpense/" + this.expense.id, data) // новый метод для добавления массива категорий
                    .then(() => { // запрос выполнился успешно
                        this.$bvModal.hide('update-expense'); // закрываем модальное окно
                        this.$awn.success();
                        this.getCategoriesForUser();
                        this.getCategoriesNotUser();
                        this.expense = {};

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            deleteExpense() {
                http
                    .post("/deleteUserExpense/" + this.expense.id)
                    .then(() => {
                        this.$bvModal.hide('delete-expense');
                        this.$awn.success();
                        this.getCategoriesForUser();
                        this.getCategoriesNotUser();
                        this.expense = {};
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },

        },
        computed: {
            isMine() {
                return this.user_id == this.$store.state.auth.user.id;
            },
        },
        mounted() {
            this.checkingInputParameters();
            this.getCategoriesForUser();
            this.getCategoriesNotUser();
        }
    }
</script>

<style scoped>

</style>