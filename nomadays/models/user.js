const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;

