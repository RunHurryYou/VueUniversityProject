module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define(
        'category', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(64),
                allowNull: false
            }
        });

    // Определяем связи таблицы category с другими таблицами
    Category.associate = (models) => {
        // Определение связи многие-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        Category.belongsToMany(models.user, {
            through: 'user_category', //  указываем, как называется промежуточная таблица
            foreignKey: 'category_id' // определяем наименование внешнего ключа. Если не указать, тогда имя ключа будет задано автоматически, как categoryId
        });

        // Определение связи один-ко-многим с таблицей user_expense. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_expense): в файле user_expense.model.js
        Category.hasMany(models.user_expense, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

    };
    return Category;
};