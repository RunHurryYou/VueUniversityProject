var db = require('../config/db.config.js');
var UserExpense = db.user_expense;
var User = db.user;
var Category = db.category;
var globalFunctions = require('../config/global.functions.js');
var { Op } = require("sequelize");

exports.findExpensesByOptions = (req, res) => {
    let categories = '('
    for (let i = 0; i < req.body.categories.length; i++) {
        categories += req.body.categories[i].toString(); 
        categories += i < req.body.categories.length - 1 ? ', ' : '';
    }
    categories += ')';
    db.sequelize.query(
        `SELECT expense_date, sum(amount) as amount from user_expense where expense_date between ? and ? and user_id = ? and category_id in `
        + categories +
        ` group by expense_date`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [
                req.body.date_begin
                ,req.body.date_end
                ,req.body.user_id
            ]
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findExpensesByUser = (req, res) => {
    UserExpense.findAll({
        where: {
            expense_dat
        },
        include: [
            {
                model: User,
                required: true, // INNER JOIN
                where: {
                    user_id: req.params.user_id
                }
            },
            {
                model: Category,
                required: true // INNER JOIN
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

exports.create = (req, res) => {
    UserExpense.create({
        amount: req.body.amount,
        expense_date: req.body.expense_date,
        description: req.body.description,
        user_id: req.body.user_id,
        category_id: req.body.category_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    UserExpense.update(
        {
            amount: req.body.amount,
            expense_date: req.body.expense_date,
            description: req.body.description,
            user_id: req.body.user_id,
            category_id: req.body.category_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    UserExpense.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};