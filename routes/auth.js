'use strict';

var Promise   = require('bluebird');
var bcrypt    = Promise.promisifyAll(require('bcrypt'));
var passport = Promise.promisifyAll(require('passport'));
var LocalStrategy = require('passport-local').Strategy;

var session   = require('../helpers/session');
var User      = Promise.promisifyAll(require('../models/user'));

module.exports = function(app) {

  // Configure passport
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app
    // Login
    .get('/login', function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/home');
      } else {
        res.render('login', { message: req.flash('error') });
      }
    })
    .post('/login', passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    }))

    // Register
    .get('/register', function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/home');
      } else {
        res.render('register', { message: req.flash('error') });
      }
    })
    .post('/register', function(req, res, next) {
      var user = req.body.username;
      var pass = req.body.password;
      var confirmpass = req.body.confirmpassword;

      if (pass != confirmpass) {
        req.flash('error', 'Passwords do not match.');
        res.redirect('/register');
        return;
      }

      User
        .registerAsync(new User({username: req.body.username}), req.body.password)
        .then(function() {
          passport.authenticate('local')(req, res, function() {
            res.redirect('/');
          });
        })
        .catch(function(err) {
          req.flash('error', err.message);
          res.redirect('/register');
        });
    })

    // Logout
    .post('/logout', function(req, res) {
      if (req.isAuthenticated()) {
        req.logout();
      }
      res.redirect('/login');
    })

    // gate all subsequent requests
    .use(function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.redirect('/login');
      } else{
        // initialize session wrapper
        session.init(req.session);
        next();
      }
    });
};