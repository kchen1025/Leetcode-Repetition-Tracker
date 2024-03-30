import { fileURLToPath } from "url";
import path from "path";
import parse from "pg-connection-string";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const config = parse(process.env.DATABASE_URL);

config.ssl = {
  rejectUnauthorized: false,
};

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      database: "leetcode",
      user: "kchen1025",
      password: "",
    },
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: config,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },
};

export default knexConfig;
