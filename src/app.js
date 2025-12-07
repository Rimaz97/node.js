const express = require("express");
const dotenv = require("dotenv");
const cors = require("./middlewares/cors");
const logger = require("./middlewares/logger");

// Импортируем роуты
const routes = require("./routes");

dotenv.config();

const app = express();

// Middleware
app.use(cors);
app.use(logger);
app.use(express.json()); // встроенный body-parser для JSON

// Подключаем роуты
app.use("/", routes);

// Обработка несуществующих роутов
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Обработка ошибок
app.use((err, req, res, _next) => {
  // Изменили next на _next
  console.error("Ошибка:", err.message);

  // Если ошибка валидации Mongoose
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      error: "Validation Error",
      messages: errors,
    });
  }

  // Ошибка кастинга (неправильный ID)
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID",
      message: "Предоставлен некорректный ID",
    });
  }

  // Ошибка дублирования (уникальное поле)
  if (err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate",
      message: "Пользователь с таким username уже существует",
    });
  }

  // По умолчанию 500
  res.status(500).json({
    error: "Internal Server Error",
    message: "Что-то пошло не так на сервере",
  });
});

module.exports = app;
