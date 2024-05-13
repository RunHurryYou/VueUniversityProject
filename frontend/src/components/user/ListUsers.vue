<template>
    <div class="col-sm-4">
        <h4>Список пользователей</h4>
        <!-- <router-link class="btn btn-success mb-2" to="/addUser">Добавить пользователя</router-link> -->
        <ul class="list-group">
            <li class="list-group-item" v-for="(user, index) in users" :key="index">
                <router-link :to="{
                        name: 'user-details',
                        params: { userParam: user, id: user.id, isAdmin: user.is_admin }
                    }">
                    {{user.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common";

    export default {
        name: "ListUsers",
        data() {
            return {
                users: []
            };
        },
        methods: {
            getUsers() {
                http
                    .get("/listUsers") // обращаемся к серверу для получения списка пользователей
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getUsers();
        }
    }
</script>