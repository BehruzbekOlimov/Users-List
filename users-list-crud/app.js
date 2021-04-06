const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost/users-list',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('Connection to database successfully!')
}).catch((e)=>{
  console.error('Connection to database failure!',e)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err.message);
});

module.exports = app;
