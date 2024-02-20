const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const cors = require('cors')
const app = express();

const MongoStore = require('connect-mongo');

const dbString = "mongodb://0.0.0.0:27017/test";

const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connect = mongoose.createConnection(dbString, dbOption);
connect.on('connected', () => console.log('connected'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const sessionStore = MongoStore.create({
  mongoUrl: dbString,
  mongooseConnection: connect,
  collectionName: 'sessions'
});

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 60
  }
}))

app.get('/', (req, res, next) => {
  console.log("r", req.session.id);
  console.log("r", req.headers.cookie);
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else
    req.session.viewCount = 1;
  res.send(`<h1> You have visited this page ${req.session.viewCount} times.</h1>`);
})

app.listen(3000, () => {
  console.log("App running at 3000 port, express!")
})

