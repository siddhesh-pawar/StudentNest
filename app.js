const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

const port = 3000;

const session = require('express-session');
// Use sessions for tracking user authentication
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

app.get('/createListings', requireLogin, (req, res) => {
  res.render('createListings.ejs');
});


const pool = new Pool({
  user: 'sidpawar',
  host: 'localhost',
  database: 'houseup',
  password: 'Sidpawar1@',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/login', (req,res) => {
    res.render("login.ejs");
});

app.get('/register', (req,res) => {
    res.render("register.ejs");
});

app.get('/createListings', (req,res) => {
  res.render("createListings.ejs");
});



app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database with the hashed password and salt
    const query = 'INSERT INTO students (name, email, password, salt) VALUES ($1, $2, $3, $4)';
    const values = [name, email, hashedPassword, salt];

    await pool.query(query, values);
    return res.redirect("/login");
   
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting user into the database');
  }
});



app.post('/login', async (req, res) => {

    const { email, password } = req.body;
  
    try {
      const query = 'SELECT * FROM students WHERE email = $1';
      const result = await pool.query(query, [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).send('User not found');
      }
  
      const user = result.rows[0];
      const hashedPassword = user.password;
  
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  
      if (isPasswordValid) { 
        req.session.userId = email; // Set the user ID in the session
        
        res.redirect("/createListings");
      } else {
        res.status(401).send('Invalid password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during login');
    }
  });
    


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
