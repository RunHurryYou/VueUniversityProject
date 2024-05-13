var { authJwt, verifySignUp } = require("../middleware");
var auth = require("../controller/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // регистрация пользователя с предварительной проверкой существования логина
    app.post("/api/register", [verifySignUp.checkDuplicateUsername], auth.register);

    // аутентификация пользователя
    app.post("/api/login", auth.login);

    // проверка, что пользователь авторизован
    app.get("/api/userBoard", [authJwt.verifyToken], auth.userBoard);
};