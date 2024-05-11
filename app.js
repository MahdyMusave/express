// import express from "express";
const express = require("express");
global.config = require("./config");
const passport = require("passport");

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

const stripeSecretKey = process.env.STRIPE_SEECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
console.log(stripeSecretKey);
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
    cookie: { _expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
  })
);

app.use(flash());

require("./passport/strategy_local");
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.render("index");
// });
app.use("/", require("./router/index"));
app.listen(3000, () => {
  console.log(`port is runing on port ${3000}`);
});
