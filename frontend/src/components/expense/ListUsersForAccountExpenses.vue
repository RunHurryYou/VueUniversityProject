<template>
    <div class="col-sm-4">
        <h4>Список пользователей</h4>
        <ul class="list-group">
            <li class="list-group-item" v-for="(user, index) in users" :key="index">
                <router-link :to="{
                        name: 'user-expenses',
                        params: { user_param: user, user_id: user.id }
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
        name: "list-users-for-account-expenses",
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