'use strict';

var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var log = require('util').log;

var config = require('./config');

module.exports  = (function(app, g, undefined) {

  app
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static('public'))
    .use(expressSession({
      secret: 'secret',
      saveUninitialized: true,
      resave: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash())

  // init db
  mongoose.connect('mongodb://localhost/' + config.dbname);

  // log route in console
  app.use(function(req, res, next) {
    log(req.method + ' ' + req.path);
    next();
  });

  app.get('/', function(req, res) {
    if (!req.isAuthenticated()) {
      res.render('login');
    } else {
      res.redirect('/home');
    }
  });

  require('./routes/auth')(app);
  require('./routes/views')(app);

  var server = app.listen(3000, function() {
    var add = server.address();
    console.log('server running on ' + add.address + ':' + add.port);
  });

})(express(), this);