const { Pool } = require('pg');

class Database {
  static pool = new Pool({
    user: 'sidpawar',
    host: 'localhost',
    database: 'houseup',
    password: 'Sidpawar1@',
    port: 5432,
  });

  static async query(query, values) {
    return await this.pool.query(query, values);
  }
}

module.exports = Database;