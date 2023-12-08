const bcrypt = require('bcrypt');
const Database = require('./database');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.saltRounds = 10;
  }

  // Inserts user details into the database when user fills registration form
  async SaveUser() {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const HashedPassword = await bcrypt.hash(this.password, salt);
    const query = 'INSERT INTO students (name, email, password, salt) VALUES ($1, $2, $3, $4)';
    const values = [this.name, this.email, HashedPassword, salt];
    await Database.query(query, values);
  }

  // Checks if user has entered correct login credentials
  async AuthenticateUser() {
    const query = 'SELECT * FROM students WHERE email = $1';
    const result = await Database.query(query, [this.email]);

    if (result.rows.length === 0) {
      return false;
    }

    const user = result.rows[0];
    const HashedPassword = user.password;
    return await bcrypt.compare(this.password, HashedPassword);
  }
}

module.exports = User;