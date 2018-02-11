const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChema = new Schema(
  {
    email: String,
    password: String,
    rol: String,
    name: String,
    lastName: String,
    age: Number,
    description: String,
    trips: [],
  },
  {
    timestamps:
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const User = mongoose.model('User', userChema);

module.exports = User;

