// import express from "express";
const express = require("express");
const login = require("./router/login");
const register = require("./router/register");
const profile = require("./router/profile");
global.config = require("./config");

// let users = require("./users");
// const { body, validationResult } = require("express-validator");
// console.log(users);

let ejs = require("ejs");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

//require the dotenv package and call the config() method to load the environment variables
require("dotenv").config();

//Require the Mongoose module in your Node.js file
const mongoose = require("mongoose");
const app = express();

//access to file in folder public som css and image ,video and  ...
app.use(express.static(__dirname + "/public"));

//let you to send data from client server
app.use(express.urlencoded({ extended: true }));

// let you to show you server side rendering to client;
app.set("view engine", "ejs");
// let you use the form with post request
app.use(methodOverride("method"));

app.use(
  session({
    secret: process.env.sesstion_secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

/****/
//clean your file
//and create new module
//and let you go to next router
/****/

app.use("/users", require("./router/user_router"));
app.use("/auth/login", login);
app.use("/auth/register", register);
app.use("/profile", profile);

app.all("*", (req, res, next) => {
  // console.log(404);
  try {
    let err = new Error("not founnd your page my frind");
    err.status = 404;
    throw err;
  } catch (err) {
    // console.log(err);
    next(err);
  }
});

app.use((err, req, res, next) => {
  // console.log(err);
  const code = err.status || "";
  const message = err.message || "";
  const stack = err.stack || "";

  if (config.debug == true) {
    res.render("errors/devloper.ejs", { messag: message, stack: stack });
  } else {
    res.render(`errors/${code}`, { messag: message });
  }
});
//Route
app.use("/", (req, res) => {
  // res.send("home");
  res.render("index");
});
app.listen(3000, () => {
  console.log(`port is runing on port ${3000}`);
});
