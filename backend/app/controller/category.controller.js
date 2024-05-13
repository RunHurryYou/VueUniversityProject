var db = require('../config/db.config.js');
var Category = db.category;
var User = db.user;
var UserExpense = db.user_expense;
var globalFunctions = require('../config/global.functions.js');
var { Op } = require("sequelize");

exports.findAll = (req, res) => {
    Category.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    Category.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Category.update({
        name: req.body.name
    },
    {
        where: {
            id: req.params.id
        }
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Category.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findCategoriesForUser = (req, res) => {
    Category.findAll({
        include: [
            {
                model: User,
                required: true, // INNER JOIN
                where: {
                    id: req.params.user_id
                }
            },
            {
                model: UserExpense,
                required: false, // LEFT JOIN
                where: {
                    user_id: req.params.user_id
                }
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findCategoriesNotUser = (req, res) => {
    db.sequelize.query(
        `SELECT * FROM category 
            WHERE NOT EXISTS ( 
                SELECT * FROM user_category 
                WHERE user_id = ? AND user_category.category_id = category.id
            )`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.user_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.createCategories = (req, res) => {
    var categories = req.body.categories;
    var data = [];
    for (var i = 0; i < categories.length; i++) {
        // сначала добавляем идентификатор категории
        data.push(categories[i]);
        // затем добавляем идентификатор пользователя
        data.push(req.body.user_id);

    }
    var placeholders = categories.map((id) => '(?,?)').join(',');
    db.sequelize.query(
        `INSERT INTO user_category(category_id, user_id) VALUES ` + placeholders,
        {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: data // подстановка параметров
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.deleteCategoryForUser = (req, res) => {
    db.sequelize.query(
        `DELETE FROM user_category WHERE category_id=? AND user_id=?`,
        {
            type: db.sequelize.QueryTypes.DELETE,
            replacements: [req.params.category_id, req.params.user_id]
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};