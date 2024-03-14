const crudModel = require("../Models/CRUD");

const addTask = async (req, res) => {
  const { tasks, priority, status } = req.body;

  try {
    const doc = await crudModel.create({ tasks, priority, status });

    res.json({ doc });
  } catch (error) {
    res.status(400).json({ error: "nothing to add!" });
  }
};

const deleteTask = async (req, res) => {
  
  const { id } = req.params;
  console.log(id);
  try {
    const doc = await crudModel.findByIdAndDelete({ _id: id });

    if (doc) {
      console.log("Task deleted successfully");
    } else {
      console.log("error deleting Task");
    }
    res.status(200).json({ message: "item deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getItems = async (req, res) => {
  res.json(await crudModel.find().sort({ createdAt: -1 }));
};

const updateItems = async (req, res) => {
  const { id, tasks, priority, status } = req.body;
  try {
    await crudModel.findOneAndUpdate(
      { _id: id },
      {
        tasks,
        priority,
        status,
      }
    );

    res.json("Done with Updation");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { addTask, deleteTask, getItems, updateItems };
