import Vue from "vue";
import Router from "vue-router";
import store from "./store";
// импорт компонентов
import Home from "./components/Home";

import ListUsers from "./components/user/ListUsers";
import AddUser from "./components/user/AddUser";
import User from "./components/user/User";

import ListCategories from "./components/category/ListCategories";
import AddCategory from "./components/category/AddCategory";
import Category from "./components/category/Category";

import ListUsersForAccountExpenses from "./components/expense/ListUsersForAccountExpenses";
import UserExpenses from "./components/expense/UserExpenses";

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

import UserReport from "./components/report/UserReport"
import ListUsersReports from "./components/report/ListUsersReports"

Vue.use(Router);

const routes = [
    {
        path: "/", // указание маршрута, по которому будем переходить к списку пользователей
        name: "home", // имя маршрута
        component: Home, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: 'Список пользователей',
        }
    },
    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: 'Список пользователей',
            requiresAuth: true
        }
    },
    {
        path: "/login", // указание маршрута, по которому будем переходить к списку пользователей
        name: "login", // имя маршрута
        component: Login, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: 'Вход в систему'
        }
    },
    {
        path: "/register", // указание маршрута, по которому будем переходить к списку пользователей
        name: "register", // имя маршрута
        component: Register, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: 'Регистрация в системе'
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры
        meta: {
            title: 'Пользователь',
            requiresAuth: true
        }
    },
    {
        path: "/listUsersReports",
        name: "list-reports",
        component: ListUsersReports,
        props: true, // указываем, что компонент User.vue может принимать параметры
        meta: {
            title: 'Список пользователей',
            requiresAuth: true
        }
    },
    {
        path: "/GetUserReport/:id",
        name: "report",
        component: UserReport,
        props: true, // указываем, что компонент User.vue может принимать параметры
        meta: {
            title: 'Отчет',
            requiresAuth: true
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: 'Добавление пользователя',
            requiresAuth: true
        }
    },
    {
        path: "/listCategories",
        name: "list-categories",
        component: ListCategories,
        meta: {
            title: 'Список категорий',
            requiresAuth: true
        }
    },
    {
        path: "/addCategory",
        name: "add-category",
        component: AddCategory,
        meta: {
            title: 'Добавление категории',
            requiresAuth: true
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: Category,
        props: true,
        meta: {
            title: 'Категория',
            requiresAuth: true
        }
    },
    {
        path: "/listUsersForAccountExpenses",
        name: "list-users-for-account-expenses",
        component: ListUsersForAccountExpenses,
        meta: {
            title: 'Учёт расходов',
            requiresAuth: true
        }
    },
    {
        path: "/userExpenses/:user_id",
        name: "user-expenses",
        component: UserExpenses,
        props: true,
        meta: {
            title: 'Учёт расходов',
            requiresAuth: true
        }
    }
]

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
  

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.auth.status.loggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});
  
export default router;