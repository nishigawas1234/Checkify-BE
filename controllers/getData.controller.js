const GetDataService = require("../services/getData.service");

exports.getdata = (req, res) => {
    GetDataService()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};
