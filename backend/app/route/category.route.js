module.exports = function(app) {
    const category = require('../controller/category.controller');

    // Получение списка категорий
    app.get('/api/listCategories', category.findAll);

    // Добавление категории
    app.post('/api/addCategory', category.create);

    // Обновление категории
    app.post('/api/updateCategory/:id', category.update);

    // Удаление категории
    app.post('/api/deleteCategory/:id', category.delete);

    // Получение категории по id
    app.get('/api/category/:id', category.findById);

    // Получение категорий пользователя
    app.get('/api/categoriesForUser/:user_id', category.findCategoriesForUser);

    // Получение категорий, которые пользователь не выбрал
    app.get('/api/categoriesNotUser/:user_id', category.findCategoriesNotUser);

    // Добавление массива категорий
    app.post('/api/addCategories', category.createCategories);

    // Удаление категории пользователя
    app.post('/api/deleteCategoryForUser/category_id/:category_id/user_id/:user_id', category.deleteCategoryForUser);
};