<template>
    <div v-if="this.user" class="col-sm-4">
        <h4>Пользователь</h4>
        <form @submit="updateUser">
            <div class="form-group">
                <input type="text" name="name" id="name" class="form-control" placeholder="ФИО" required v-model="user.name">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="user.isAdmin" id="flexCheckChecked">
                    <label class="form-check-label" for="flexCheckChecked">
                        Администратор
                    </label>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success" value="Обновить">
                <input v-on:click="deleteUser()" class="btn btn-danger ml-2" type='submit' value='Удалить'>
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "user-details",
        props: ['userParam'],
        data() {
            return {
                user: {
                    id: this.userParam.id,
                    name: this.userParam.name,
                    isAdmin: this.userParam.is_admin
                }
            };
        },
        methods: {
            updateUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.user.name,
                    is_admin: this.user.isAdmin
                };

                http
                    .post("/updateUser/" + this.user.id, data)
                    .then(() => {
                        this.$awn.success();
                        this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            },
            deleteUser() {
                http
                    .post("/deleteUser/" + this.user.id)
                    .then(() => {
                        this.$awn.success();
                        this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        this.$awn.alert(this.$globalFunction.formatError(e));
                    });
            }
        }
    }
</script>
