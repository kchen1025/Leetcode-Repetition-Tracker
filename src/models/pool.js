import { Pool } from "pg";
require("dotenv").config();

// let ssl = {};
// if (process.env.NODE_ENV === "production") {
//   ssl = {
//     rejectUnauthorized: false,
//   };
// }

// refresher on how to connect,
// I use pg-cli for all direct database connections and elephantsql for easy instances setup
// the password goes into your .pgpass file
// the command for launching sql goes in your bash_profile and will look like this
// pgcli -h <dbURL> -U <DBUSER> -d <DBNAME>'
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Note: Setting this to false can create security vulnerabilities
  },
});
