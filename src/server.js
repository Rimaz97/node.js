const app = require('./app');
const mongoose = require('mongoose');

const { PORT = 3005, MONGODB_URI } = process.env;

// Подключаемся к MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Подключено к MongoDB');
    
    // Запускаем сервер
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err.message);
    process.exit(1);
  });