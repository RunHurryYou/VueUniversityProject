<template>
    <div v-if="category" class="col-sm-4">
        <h4>Категория</h4>
        <form @submit="updateCategory">
            <div class="form-group">
                <input type="text" name="name" id="name" class="form-control" placeholder="Наименование категории" required v-model="category.name">
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success" value="Обновить">
                <input v-on:click="deleteCategory()" class="btn btn-danger ml-2" type='submit' value='Удалить'>
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "category-details",
        props: ['categoryParam', 'id'],
        data() {
            return {
                category: this.categoryParam,
                categories: [],
                submitted: false
            };
        },
        methods: {
            // Проверяем входные параметры, так как при переходе к элементу из списка, объект с информацией передаётся в качестве параметра и его можно
            // обработать. Если переходим напрямую по ссылке вида category/1, нужно выполнить запрос к серверу.
            checkingInputParameters() {
                if(this.category == null){
                    this.getCategory();
                }
            },
            getCategory() {
                http
                    .get("/category/"+ this.id)
                    .then(response => {
                        this.category = response.data;
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            updateCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name,
                };
                http
                    .post("/updateCategory/" + this.category.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$awn.success();
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            deleteCategory() {
                http
                    .post("/deleteCategory/" + this.category.id)
                    .then(() => {
                        this.$awn.success();
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            }
        },
        mounted() {
            this.checkingInputParameters();
        }
    }
</script>