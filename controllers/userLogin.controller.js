const UserLogin = require("../services/userLogin.service");


exports.userLogin = (req, res) => {
    UserLogin(req, res);
}


