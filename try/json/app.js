// import express from "express";
const express = require("express");
global.config = require("./config");

// let users = require("./users");
// const { body, validationResult } = require("express-validator");
// console.log(users);

let ejs = require("ejs");
const app = express();

//access to file in folder public som css and image ,video and  ...
app.use(express.static(__dirname + "/public"));

//let you to send data from client server
app.use(express.urlencoded({ extended: true }));

// let you to show you server side rendering to client;
app.set("view engine", "ejs");

//midllvre
app.use((req, res, next) => {
  console.log("midd 1");
  next();
});

//Route
app.use("/", (req, res) => {
  // res.send("home");
  res.render("index");
});

//midllvre
app.use((req, res, next) => {
  console.log("midd 2");
  next();
});

//Router
app.use("/users", require("./user_router"));

app.listen(3000, () => {
  console.log(`port is runing on port ${3000}`);
});
