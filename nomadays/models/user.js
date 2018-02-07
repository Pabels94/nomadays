const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChema = new Schema(
  {
    username: String,
    password: String,
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

