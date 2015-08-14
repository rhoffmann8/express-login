'use strict';

var Promise   = require('bluebird');
var bcrypt    = Promise.promisifyAll(require('bcrypt'));
var passport = Promise.promisifyAll(require('passport'));
var LocalStrategy = require('passport-local').Strategy;

var session   = require('../helpers/session');
var User      = Promise.promisifyAll(require('../models/user'));

module.exports = function(app) {

  // Configure passport
  passport.use(new LocalStrategy(strategy));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOneAsync({
      username: username
    })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err);
    })
  });

  function strategy(username, password, done) {
    User
      .findOneAsync({
        username: username
      })
      .bind({})
      .then(function(user) {
        if (!user) {
          return [false, {message: 'Invalid username'}];
        }
        this.user = user;
        return bcrypt.compareAsync(password, user.password);
      })
      .then(function(result) {
        if (!result) {
          return [false, {message: 'Invalid password'}];
        }

        return this.user;
      })
      .nodeify(done, {spread: true});
  }

  app
    .get('/login', function(req, res, next) {
      res.render('login');
    })
    .post('/login', passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login'
    }))
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