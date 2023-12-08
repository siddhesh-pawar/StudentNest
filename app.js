const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./user');
const Database = require('./database');

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

const port = 3000;

// Session for tracking user login
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/login', (req, res) => {
  res.render("login.ejs");
});

app.get('/register', (req, res) => {
  res.render("register.ejs");
});

// User has to login before going to this route
app.get('/createListings', requireLogin, (req, res) => {
  res.render("createListings.ejs");
});

app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = new User(name, email, password);

  try {
    await user.SaveUser();
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting user into the database');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = new User(null, email, password);

  try {
    const isValid = await user.AuthenticateUser();
    if (isValid) {
      req.session.userId = email;
      res.redirect("/createListings");
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
