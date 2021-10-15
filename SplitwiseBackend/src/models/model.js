import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += ' ' + clause;
    return this.pool.query(query);
  }
  
  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING ${columns}
      `
    return this.pool.query(query);
  }

  async multipleInsertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES ${values}
          RETURNING ${columns}
      `
    return this.pool.query(query);
  }

  async insertWithSpecificReturn(columns, values, returning) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING ${returning}
      `
    return this.pool.query(query);
  }


}

export default Model;