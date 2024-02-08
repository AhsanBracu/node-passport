const express = require('express');
const mongoose = require('mongoose');
const connect = require('./session/app.js')

const app = express();

// const dbString = "mongodb://0.0.0.0:27017/smartlotto_db";

// const dbOption = {
//   useNewUrlParser: true,
//   useUnifiendTopology: true
// }
// const connect = mongoose.createConnection(dbString);
// connect.on('connected', () => console.log('connected'));
// connect.err

// mongoose.connect(dbString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

app.get('/', (req, res, next) => {
  res.send("Welcome to express session");
})

app.listen(3000, () => {
  console.log("App running at 3000 port, express!")
})
