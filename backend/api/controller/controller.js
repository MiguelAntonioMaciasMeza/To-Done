const {
  getTaskList,
  createNewTask,
  getUserByEmail,
  getUserByUsername,
  // checkUserExist, -> No Longer Exists?
} = require('../services/services.js');

const User = require('../models/User');
const Task = require('../models/Task');

// Get Controllers
const getUserTasks = async (req, res) => {
  try {
    //getting list from _id of a user
    const userId = req.user;
    const tasks = await getTaskList(userId);
    res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
  }
};

// Post Controllers
const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = req.body;
    createNewTask(req, res, task);
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'No Task, Not Found' });
    }
    res.status(200).json({ status: 'Delete Task Successful' });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    newUser = req.newUser;
    await newUser.save();
    res.status(200).json({ status: 'User Created Successfully' });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'No User, Not Found' });
    }
    res.status(200).json({ status: 'Delete User Successful' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserTasks,
  createTask,
  deleteTask,
  createUser,
  deleteUser,
};
