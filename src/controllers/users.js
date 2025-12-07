const User = require("../models/User");

// Получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      next(e);
    });
};

// Получить пользователя по ID
const getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "Not Found",
          message: `Пользователь с ID ${id} не найден`,
        });
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      next(e);
    });
};

// Создать пользователя
const createUser = (req, res, next) => {
  const data = req.body;

  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      next(e);
    });
};

// Обновить пользователя
const updateUser = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "Not Found",
          message: `Пользователь с ID ${id} не найден`,
        });
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      next(e);
    });
};

// Удалить пользователя
const deleteUser = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "Not Found",
          message: `Пользователь с ID ${id} не найден`,
        });
      }
      res.status(200).json({ message: "Пользователь успешно удален" });
    })
    .catch((e) => {
      next(e);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
