const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Заголовок обязателен"],
      minlength: [2, "Заголовок должен быть не менее 2 символов"],
    },
    author: {
      type: String,
      required: [true, "Автор обязателен"],
      minlength: [2, "Имя автора должно быть не менее 2 символов"],
    },
    year: {
      type: Number,
      required: [true, "Год выпуска обязателен"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("book", bookSchema);
