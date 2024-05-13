<template>
    <div class="col-sm-4">
        <h4>Список категорий</h4>
        <router-link class="btn btn-danger mb-2" to="/addCategory">Добавить категорию</router-link>
        <ul class="list-group">
            <li class="list-group-item" v-for="(category, index) in categories" :key="index">
                <router-link :to="{
                            name: 'category-details',
                            params: { categoryParam: category, id: category.id }
                        }">
                    {{category.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common";

    export default {
        name: "ListCategory",
        data() {
            return {
                categories: []
            };
        },
        methods: {
            getCategories() {
                http
                    .get("/listCategories")
                    .then(response => {
                        this.categories = response.data;
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            }
        },
        mounted() {
            this.getCategories();
        }
    }
</script>