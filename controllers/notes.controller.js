const {AddData, GetData} = require("../services/note.service");


exports.addData = (req, res) => {
    AddData(req, res);
}

exports.getData = (req, res) => {
    GetData(req, res);
}



