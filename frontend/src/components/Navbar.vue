<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-danger navbar-dark">
            <div class="navbar-nav">
                <div v-if="isAdmin">
                    <router-link class="navbar-brand" to="/listUsers"><i class="fa fa-users"></i> Пользователи</router-link>
                </div>
                <router-link class="navbar-brand" to="/listCategories"><i class="fa fa-list-ol"></i> Категории</router-link>
                <div v-if="isAdmin">
                    <router-link class="navbar-brand" to="/listUsersForAccountExpenses"><i class="fa fa-coins"></i> Расходы</router-link>
                </div>
                <div v-else>
                    <router-link class="navbar-brand" :to="{
                        name: 'user-expenses',
                        params: { user_param: currentUser, user_id: currentUser.id }
                    }"><i class="fa fa-coins"></i> Расходы</router-link>
                </div>
                <div v-if="isAdmin">
                    <router-link class="navbar-brand" :to="{
                        name: 'list-reports'
                    }"><i class="fa fa-chart-pie"></i> Отчёты </router-link>
                </div>
                <div v-else>
                    <router-link class="navbar-brand" :to="{
                        name: 'report',
                        params: { userParam: currentUser, id: currentUser.id }
                    }"><i class="fa fa-chart-pie"></i> Отчёты </router-link>
                </div>
            </div>
            <div class="text-right ml-auto">
            <div v-if="currentUser">
            <router-link to="/profile" class="navbar-brand text-light">
                <div class="enter-font" size="4">
                <i class="fa fa-user"></i>
                {{ currentUser.name }}
                </div>
            </router-link>
            <a href @click.prevent="logOut" class="navbar-brand text-light">
                <div class="enter-font" size="4">
                Выйти
                <i class="fas fa-sign-in-alt"></i>
                </div>
            </a>
            </div>
            <div v-else>
            <router-link to="/login" class="navbar-brand text-light">
                <div class="enter-font" size="4">
                Войти
                <i class="fas fa-sign-in-alt"></i>
                </div>
            </router-link>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "nav-bar",
        data() {
            return {};
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            },
            isAdmin() {
                return this.currentUser.isAdmin;
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
                window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            }
        }
    };
</script>