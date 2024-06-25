const model = require("../models");
const { v4: uuidv4 } = require("uuid");

const AddData = (req, res) => {
  const { body } = req.body;
  const id = req.params.user_id;
  console.log(req.body, "reqreq");

  if (!id || !body) {
    return res.status(400).json({ error: 'id and body are required fields' });
  }

  const post = {
    uuid: uuidv4(),
    body: body,
    created_at: new Date(),
    user_id: id,
  };

  model.Note.create(post)
    .then((result) => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const GetData = async (req, res) => {
  const { user_id } = req.params; // Extract user_id from URL parameter
  //    const user_id = "3664ed07-4b22-4ce3-a937-ca1c4578bf68"
  try {
    const notes = await model.Note.findAll({
      where: {
        user_id,
      },
    });

    console.log(notes, "notes");

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

module.exports = { AddData, GetData };
