import { Pool, PoolClient } from "pg";
import { pool } from "./pool";

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async queryPromise(query, values) {
    return this.pool.query(query, values);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) {
      query += clause;
    }
    return this.pool.query(query);
  }
}

export default Model;
