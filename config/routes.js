const axios = require('axios');
const bycrypt = require('bcryptjs');

const db = require('../database/dbConfig');
const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) { // creates user object, grabs password and hashes it before inserting into database
  // implement user registration
  const user = req.body;
  const hash = bycrypt.hashSync(user.password, 14);
  user.password = hash;
  db('users')
    .insert(user)
    .then(response => {
      const token = generateToken(response);
      res
        .status(201)
        .send(token)
    })
    .catch(err => {
      res
        .status(500)
        .json(err)
    })
}

function login(req, res) { // verifies password and generates login token
  // implement user login
  const credentials = req.body;
  const username = credentials.username;
  db('users')
    .where({ username })
    .first()
    .then(response => {
      const passwordMatch = bycrypt.compareSync(credentials.password, response.password);
      if (passwordMatch) {
        const token = generateToken(response)
        res
          .status(200)
          .send(token)
      } else {
        res
          .status(401)
          .json({ error: 'Incorrect Credentials' })
      }
    })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
