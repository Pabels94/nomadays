const express = require('express');

const router = express.Router();

const Trip = require('../models/Trip');
const City = require('../models/City');
const cityRepository = require('../repository/cityRepository');


router.get('/', (req, res, next) => {
  Trip.find({})
    .sort({ dateInitial: 'asc' })
    .then((trips) => {
      res.render('profile/profile', {
        trips,
      });
    });
});

router.get('/addTrip', (req, res, next) => {
  City.find({})
    .sort({ name: 'asc' })
    .then((cities) => {
      res.render('profile/addTrip', {
        cities,
      });
    });
});

router.post('/addTrip/', (req, res, next) => {
  const errors = [];
  if (!req.body.originCity) {
    errors.push({ text: 'Please, add a origin city' });
  }
  if (!req.body.destinationCity) {
    errors.push({ text: 'Please, add a destination city' });
  }
  if (!req.body.dateInitial) {
    errors.push({ text: 'Please add a date initial' });
  }
  if (!req.body.dateEnd) {
    errors.push({ text: 'Please add a date end' });
  }

  if (errors.length > 0) {
    res.render('profile/addTrip', {
      errors,
      originCity: req.body.originCity,
      destinationCity: req.body.destinationCity,
      dateInitial: req.body.dateInitial,
      dateEnd: req.body.dateEnd,

    });
  } else {
    const newTrip = {
      originCity: req.body.originCity,
      destinationCity: req.body.destinationCity,
      dateInitial: new Date(req.body.dateInitial),
      dateEnd: new Date(req.body.dateEnd),
      userId: '5a898fff6bad38205ccf19a1',
    };
    Trip.create(newTrip)
      .then((trip) => {
        res.redirect('/profile');
      });
  }
});

router.get('/updateTrip/:id', (req, res, next) => {
  Trip.findOne({
    _id: req.params.id,
  })
    .then((trip) => {
      res.render('profile/updateTrip', {
        trip,
      });
    });
});

router.put('/updateTrip/:id', (req, res, next) => {
  Trip.findOne({
    _id: req.params.id,
  })
    .then((trip) => {
      trip.originCity = req.body.originCity;
      trip.destinationCity = req.body.destinationCity;
      trip.dateInitial = new Date(req.body.dateInitial);
      trip.dateEnd = new Date(req.body.dateEnd);
      trip.save()
        .then((trip) => {
          res.redirect('/profile');
        });
    });
});


module.exports = router;

