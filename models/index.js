import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Account from "./Account.js";
dotenv.config();

const db = {};

const initDb = () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL || "");
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.account = Account(sequelize, Sequelize);

  return db;
};

export { initDb, db };
