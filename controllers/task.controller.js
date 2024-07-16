const {AddData, GetData,UpdateTask} = require("../services/task.service");


exports.addData = (req, res) => {
    AddData(req, res);
}

exports.getData = (req, res) => {
    GetData(req, res);
}
exports.updateTask = (req, res) => {
    UpdateTask(req, res);
}




