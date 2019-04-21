var express = require("express");
var http = require("http");
var path = require("path");
var bodyparser = require("body-parser");
var cookieparser = require("cookie-parser");
var static = require("serve-static");
var errorhandler = require("errorhandler");

var expressErrorHandler = require("express-error-handler");
var expressSession = require("express-session");

var multer = require("multer");
var fs = require("fs");
var cors = require("cors");

var app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.use("/pulbic", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

app.use(cookieparser());

app.use(
  expressSession({
    secret: "my key",
    resave: "true",
    saveUninitialized: "true"
  })
);

app.use(cors());

app.use(
  multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "uploads");
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname, date.now());
    }
  })
);

var storage = multer({
  storage: storage,
  limits: {
    files: 100,
    fieldSize: 999 * 999 * 999
  }
});

var router = express.Router();
