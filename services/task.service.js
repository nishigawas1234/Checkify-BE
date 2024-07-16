const model = require("../models");
const { v4: uuidv4 } = require("uuid");

const AddData = (req, res) => {
  const payload = req.body;
  const id = req.params.user_id;
  console.log(req.body, "reqreq");

  if (!id || !payload || !payload.title.length) {
    return res.status(400).json({ error: 'payload is missing' });
  }

  const post = {
    uuid: uuidv4(),
    title: payload.title,
    isChecked: payload.isChecked || false,
    isPersonal: payload.isPersonal || false,
    description: payload.description,
    created_at: new Date(),
    user_id: id,
  };

  model.Task.create(post)
    .then((result) => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const GetData = async (req, res) => {
  const { user_id } = req.params; // Extract user_id from URL parameter
  try {
    const tasks = await model.Task.findAll({
      where: {
        user_id,
      },
    });


    res.status(200).json({
      message: "Notes fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

const UpdateTask = async (req, res) => {
  const user_id = req.params.user_id;
  const task_id = req.params.task_id;
  const post = {
    isChecked: req.body.isChecked,
  };

  try {
    // Check if the task exists
    const task = await model.Task.findOne({ where: { user_id: user_id, uuid: task_id } });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Update the task if it exists
    await model.Task.update(post, { where: { user_id: user_id, uuid: task_id } });
    res.status(201).json({ success: true, message: "Task updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "An error occurred", error: err.message });
  }
};

module.exports = { AddData, GetData,UpdateTask };
