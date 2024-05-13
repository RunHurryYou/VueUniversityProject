<template>
    <div class="col-sm-4">
        <h4>Добавление категории</h4>
        <form @submit="addCategory">
            <div class="form-group">
                <input type="text" name="name" id="name" class="form-control" placeholder="Наименование категории" required v-model="category.name">
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success" value="Добавить">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddCategory",
        data() {
            return {
                category: {
                    name: ""
                }
            };
        },
        methods: {
            addCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name
                };
                http
                    .post("/addCategory", data)
                    .then(() => { // запрос выполнился успешно
                        this.$awn.success(); // выводим уведомление
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            }
        }
    }
</script>