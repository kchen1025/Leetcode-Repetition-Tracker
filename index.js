import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import { initDb } from "./models/index.js";
import { apiRouter } from "./routes/api/index.js";
import { authRouter } from "./routes/auth/index.js";
import passportConfig from "./services/passport.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
passportConfig(passport);
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// // the reason we need both .dotenv and the heroku .env file, is that the .env file provided by heroku is not read unless
// // we run the app through their command line tool. i don't want to to that, so here we are.
// require("dotenv").config();

// app.use(app/index.js
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ["sdfsdfdsfdsdsfsdfdsfaertasdfadsrfsd"],
//   })
// );
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// BEGIN initialize sequelize connection
const db = initDb();
db.sequelize.sync();
// END sequelize initialization

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes go here, pull them out into different files later
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// .set("views", path.join(__dirname, "views"))
// .set("view engine", "ejs")

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
