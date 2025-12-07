const router = require("express").Router();
const userRouter = require("./users");
const bookRouter = require("./books");

router.use("/users", userRouter);
router.use("/books", bookRouter);

// Корневой маршрут для проверки
router.get("/", (req, res) => {
  res.json({
    message: "Library API is running!",
    endpoints: {
      users: [
        { method: "GET", path: "/users" },
        { method: "POST", path: "/users" },
        { method: "GET", path: "/users/:id" },
        { method: "PATCH", path: "/users/:id" },
        { method: "DELETE", path: "/users/:id" },
      ],
      books: [
        { method: "GET", path: "/books" },
        { method: "POST", path: "/books" },
        { method: "GET", path: "/books/:id" },
        { method: "PATCH", path: "/books/:id" },
        { method: "DELETE", path: "/books/:id" },
      ],
    },
  });
});

module.exports = router;
