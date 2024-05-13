module.exports = function(app) {

    const user = require('../controller/user.controller');

    const auth = require('../controller/auth.controller');

    // Получение списка пользователей
    app.get('/api/listUsers', user.findAll);

    // Добавление пользователя
    app.post('/api/addUser', user.create);

    // Обновление пользователя
    app.post('/api/updateUser/:id', user.update);

    // Удаление пользователя
    app.post('/api/deleteUser/:id', user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', user.findById);
};