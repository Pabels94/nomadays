const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const City = require('../models/City');

router.get('/', ensureAuthenticated, (req, res, next) => {
  City.find({})
    .sort({ name: 'asc' })
    .then((cities) => {
      res.json(cities);
    });
});
