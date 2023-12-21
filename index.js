import express from "express";
import routes from "./routes/index.js";
import session from "express-session";
import DatabaseConnect from "./config/mongoose.js";
import { passport } from "./config/passport-local.js";
import Url from "./models/url.models.js";
import crypto from "node:crypto";

let app = express();

const PORT = 8000; //port


//generating shorter urls for Each api
async function generateShorterUrl(req, next) {
  let url = await Url.findOne({ original_url: req.url });
  if (url) {
    req.newUrl = url;
    return next();
  } else {
    let original_url = req.url;
    let shorter_url;
    let buffer = await crypto.randomBytes(6);
    shorter_url = buffer.toString("base64");

    url = await Url.create({
      shorter_url,
      original_url,
    });

    req.newUrl = url;

    return next();
  }
}


// global middleware to check the routes of all api's
app.use(async (req, res, next) => {
  if (req.url === "/users/createAccount") {
    generateShorterUrl(req, next);
  } else if (req.url === "/users/login") {
    generateShorterUrl(req, next);
  } else if (req.url === "/users/logout") {
    generateShorterUrl(req, next);
  } else {
    try {
      req.url = req.url.substring(1, req.url.length);
      let url = await Url.findOne({ shorter_url: req.url });

      if (url) {
        req.url = url.original_url;
        req.newUrl = url;
        next();
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      next();
    }
  }
});


//creating session
app.use(
  session({
    secret: "thisisme",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


// Passport initialization and session function

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Server running on port", PORT);
  DatabaseConnect();
});
