const {AddDataService,AddPerticularData ,UpdateData} = require("../services/addData.service");


exports.addData = (req, res) => {
    AddDataService(req, res);
}

exports.addPerticularData = (req, res) => {
    AddPerticularData(req, res);
}

exports.updateData = (req, res) => {
    UpdateData(req, res);
}


