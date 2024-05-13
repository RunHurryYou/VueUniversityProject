var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true,
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.listen(3000);

var category = require('./app/route/category.route.js');
category(app);

var user = require('./app/route/user.route.js');
user(app);

var user_expense = require('./app/route/user_expense.route.js');
user_expense(app);

var auth = require('./app/route/auth.route.js');
auth(app);
