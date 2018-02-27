const express = require('express');

const router = express.Router();

const City = require('../models/City');

router.get('/', (req, res, next) => {
  City.find({})
    .sort({ name: 'asc' })
    .then((cities) => {
      res.json(cities);
    });
});
