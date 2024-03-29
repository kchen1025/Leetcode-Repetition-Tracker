// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// If using a version of node-postgres newer than 8.3, you need to manually parse
// the DATABASE_URL because node-postgres no longer supports passing the connection
// string directly to the client constructor. Heroku's DATABASE_URL includes SSL parameters.
const { parse } = require("pg-connection-string");

// Parse the environment variable into an object
const config = parse(process.env.DATABASE_URL);

// Add SSL configuration
config.ssl = {
  rejectUnauthorized: false, // Note: Setting this to false can create security vulnerabilities.
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
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  production: {
    client: "postgresql",
    connection: config,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};

export default knexConfig;
