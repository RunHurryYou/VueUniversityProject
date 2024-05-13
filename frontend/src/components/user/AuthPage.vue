<template>
  <div class="col-sm-4">
      <form @submit="addUser">
          <div class="form-group">
              <input type="text" name="name" id="name" class="form-control" placeholder="ФИО" required v-model="user.name">
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
      name: "AddUser",
      data() {
          return {
              user: {
                  name: ""
              }
          };
      },
      methods: {
          addUser(e) {
              e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
              var data = {
                  name: this.user.name
              };

              http
                  .post("/addUser", data)
                  .then(() => { // запрос выполнился успешно
                      this.$awn.success();
                      this.$router.push('/listUsers'); // переходим к списку пользователей
                  })
                  .catch(e => { // при выполнении запроса возникли ошибки
                      this.$awn.alert(this.$globalFunction.formatError(e));
                  });

          }
      }
  }
</script>