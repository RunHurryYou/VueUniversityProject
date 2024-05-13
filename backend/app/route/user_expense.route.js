module.exports = function(app) {

    const user_expense = require('../controller/user_expense.controller');

    // Получение списка расходов пользователя
    app.get('/api/listExpensesByUser/:user_id', user_expense.findExpensesByUser);

    // Получение суммированного списка расходов по опциям
    app.post('/api/listExpensesByOptions', user_expense.findExpensesByOptions);

    // Добавление записи о расходах
    app.post('/api/addUserExpense', user_expense.create);

    // Обновление записи о расходах
    app.post('/api/updateUserExpense/:id', user_expense.update);

    // Удаление записи о расходах
    app.post('/api/deleteUserExpense/:id', user_expense.delete);
};