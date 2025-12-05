const http = require("http");
const url = require("url");
const usersModule = require("./modules/users");

const HOSTNAME = "127.0.0.1";
const PORT = 3003;

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const queryParams = parsedUrl.query;

  // Обработка ?hello=<name>
  if (queryParams.hello !== undefined) {
    const name = queryParams.hello;

    if (name && name.trim() !== "") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end(`Hello, ${name}.`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end("Enter a name");
    }
    return;
  }

  // Обработка ?users
  if (queryParams.users !== undefined) {
    usersModule
      .getUsers()
      .then((users) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(users));
      })
      .catch((error) => {
        console.error("Ошибка при получении пользователей:", error);
        response.statusCode = 500;
        response.end();
      });
    return;
  }

  // Если параметров нет
  if (Object.keys(queryParams).length === 0) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Hello, World!");
    return;
  }

  // Другие параметры
  response.statusCode = 500;
  response.end();
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен по адресу http://${HOSTNAME}:${PORT}/`);
});
