module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
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
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            login: {
                type : Sequelize.STRING(64),
                allowNull: false
            },
            pwd: {
                type : Sequelize.STRING(64),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    User.associate = (models) => {
        // Определение связи многие-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        User.belongsToMany(models.category, {
            through: 'user_category', //  указываем, как называется промежуточная таблица
            foreignKey: 'user_id' // определяем наименование внешнего ключа
        });
        // Определение связи один-ко-многим с таблицей user_expense. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_expense): в файле user_expense.model.js
        User.hasMany(models.user_expense, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

    };
    return User;
};