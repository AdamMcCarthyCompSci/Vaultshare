import logger from 'morgan';
// import express from 'express';
// import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import { sessionSecret } from './settings';
import { addMember } from './register';

const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
// const methodOverride = require('method-override');
// const cookieSession = require('cookie-session')
// app.use(cookieSession({
//   keys: [sessionSecret]
// }))
const initializePassport = require('./passportConfig')
initializePassport(
  passport
)
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser(sessionSecret));

app.use('/split', indexRouter);

app.use((err, req, res, next) => {
    res.status(400).json({ result: err.stack });
  });

app.get('/', checkAuthenticated, (req, res) => {
  res.json({ result: [true, req.user] })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.json({ result: "Login" })
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.json({ result: "Register" })
})
app.post('/register', addMember);

app.post('/logout', (req, res) => {
  req.logOut()
  res.json({ result: 'Login' })
})
  
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("Authenticated!")
    return next()
  }
  console.log("Not Authenticated!")
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
  
export default app;