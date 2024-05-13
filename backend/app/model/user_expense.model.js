module.exports = (sequelize, Sequelize) => {
    var UserExpense = sequelize.define(
        'user_expense', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            expense_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(1024),
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });

    // Определяем связи таблицы user_expense с другими таблицами
    UserExpense.associate = (models) =>  {

        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        UserExpense.belongsTo(models.category, {
            foreignKey: 'category_id'
        });

        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        UserExpense.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

    };

    return UserExpense;
};