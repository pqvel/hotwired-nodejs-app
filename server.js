const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const uuid = require("uuid");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(cookieParser('secret key'));
app.use(
  session({
      secret: 'you secret key',
      saveUninitialized: true,
  })
);

app.use((err, req, res, next) => {
  console.log(req.session.isSecondLoad)
  req.session.isSecondLoad = true
  next()
})

const publicPath = path.join(__dirname, "views");
const port = process.env.PORT || 9000;

const todos = [];
let isAuth = false;

app.get("/", (req, res) => {
  res.render("index", {
    isAuth,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    isAuth,
  });
});

app.get("/todo-list", (req, res) => {
  if (!isAuth) {
    return res.redirect("/login")
  }
  res.render("todo-list", {
    todos,
    isAuth,
  });
});

app.get("/login", (req, res) => {
  res.render("turbo/modals/login");
});

app.post("/create-todo", (req, res) => {
  const body = req.body;
  todos.push({ ...body, id: uuid.v4() });
  res.render("todo-list", {
    todos,
    isAuth,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// $env:NODE_OPTIONS = "--openssl-legacy-provider"
