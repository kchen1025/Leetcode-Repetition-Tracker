import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Account from "./Account.js";
dotenv.config();

const db = {};

const initDb = () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Note: Setting this to false can introduce security vulnerabilities.
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
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
