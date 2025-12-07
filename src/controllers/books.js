const Book = require("../models/Book");

// Получить все книги
const getBooks = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.status(200).send(books);
    })
    .catch((e) => {
      next(e);
    });
};

// Получить книгу по ID
const getBook = (req, res, next) => {
  const { id } = req.params;

  Book.findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          error: "Not Found",
          message: `Книга с ID ${id} не найдена`,
        });
      }
      res.status(200).send(book);
    })
    .catch((e) => {
      next(e);
    });
};

// Создать книгу
const createBook = (req, res, next) => {
  const data = req.body;

  Book.create(data)
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((e) => {
      next(e);
    });
};

// Обновить книгу
const updateBook = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  Book.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          error: "Not Found",
          message: `Книга с ID ${id} не найдена`,
        });
      }
      res.status(200).send(book);
    })
    .catch((e) => {
      next(e);
    });
};

// Удалить книгу
const deleteBook = (req, res, next) => {
  const { id } = req.params;

  Book.findByIdAndDelete(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          error: "Not Found",
          message: `Книга с ID ${id} не найдена`,
        });
      }
      res.status(200).json({ message: "Книга успешно удалена" });
    })
    .catch((e) => {
      next(e);
    });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
