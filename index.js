import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import { initDb } from "./src/models/index.js";
import { apiRouter } from "./src/routes/api/index.js";
import { authRouter } from "./src/routes/auth/index.js";
import passportConfig from "./src/services/passport.js";
import { fileURLToPath } from "url";
import path from "path";
import redis from "redis";
import RedisStore from "connect-redis";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
passportConfig(passport);
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false, // prevents multiple redis keys from being created
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day (in ms)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// BEGIN initialize sequelize connection
const db = initDb();
db.sequelize.sync();
// END sequelize initialization

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes go here, pull them out into different files later
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
