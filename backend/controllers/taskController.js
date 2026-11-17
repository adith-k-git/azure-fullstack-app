const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { search, status, sort, page = 1, limit = 8 } = req.query;
    const filters = {};

    if (search) {
      filters.title = { $regex: search, $options: 'i' };
    }

    if (status) {
      filters.status = status;
    }

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    const total = await Task.countDocuments(filters);
    let tasks;

    if (sort === 'priority_asc' || sort === 'priority_desc') {
      const direction = sort === 'priority_asc' ? 1 : -1;
      tasks = await Task.aggregate([
        { $match: filters },
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ['$priority', 'Low'] }, then: 1 },
                  { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
                  { case: { $eq: ['$priority', 'High'] }, then: 3 },
                ],
                default: 2,
              },
            },
          },
        },
        { $sort: { priorityOrder: direction, createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
        { $project: { priorityOrder: 0 } },
      ]);
    } else {
      tasks = await Task.find(filters).sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec();
    }

    res.json({
      tasks,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      totalTasks: total,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const { title, description, status, priority, dueDate } = req.body;

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
