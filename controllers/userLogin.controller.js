const {signUp , login} = require("../services/userLogin.service");


exports.userSignUp = (req, res) => {
    signUp(req, res);
}

exports.userLogin = (req, res) => {
    login(req, res);
}



