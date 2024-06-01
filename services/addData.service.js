const model = require("../models");

const AddData = (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    };

    model.Post.create(post)
        .then((result) => {
            res.status(201).json({ success: true });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const UpdateData = (req, res) => {
    const userId = 1
    const id = req.params.id;
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    };

    model.Post.update(post, { where: { userId: userId ,id:id } })
        .then((result) => {
            res.status(201).json({ success: true, message: "updated" });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({err});
        });
};

const AddPerticularData = (req, res) => {
      const userId = req.params.userId
    model.Post.findByPk(userId)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

module.exports = {AddData, AddPerticularData ,UpdateData};
