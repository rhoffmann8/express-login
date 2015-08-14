'use strict';
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_at: Date,
  updated_at: Date
});

userSchema.plugin(passportLocalMongoose, {
  hashField: 'password'
});

var User = mongoose.model('User', userSchema);

module.exports = User;