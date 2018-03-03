const express = require('express');

const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const Trip = require('../models/Trip');
const City = require('../models/City');
const Place = require('../models/Place');


router.get('/addPlace', ensureAuthenticated, (req, res, next) => {
  res.render('profile/addPlace');
});

router.post('/addPlace', ensureAuthenticated, (req, res, next) => {
  const place = req.body;
  Place.create(place)
    .then((value) => {
      res.status(200);
      res.json(value);
    })
    .catch((err) => {
      res.status(500);
      res.json(err);
    });
});

router.get('/editPlace/:id', ensureAuthenticated, (req, res, next) => {
  Place.findOne({
    _id: req.params.id,
  })
    .then((place) => {
      res.render('profile/editPlace', {
        place,
      });
    });
});


router.get('/', ensureAuthenticated, (req, res, next) => {
  // res.render('profile/profile', { trips });
  Trip.find({})
    .sort({ dateInitial: 'asc' })
    .then((trips) => {
      Place.find({})
        .sort({ name: 'asc' })
        .then((places) => {
          res.render('profile/profile', { trips,
            places,
          });
        });
    });
});


router.get('/addTrip', ensureAuthenticated, (req, res, next) => {
  City.find({})
    .sort({ name: 'asc' })
    .then((cities) => {
      res.render('profile/addTrip', {
        cities,
      });
    });
});

router.post('/addTrip', ensureAuthenticated, (req, res, next) => {
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

router.get('/updateTrip/:id', ensureAuthenticated, (req, res, next) => {
  City.find({})
    .then((cities) => {
      Trip.findOne({
        _id: req.params.id,
      })
        .then((trip) => {
          res.render('profile/updateTrip', { cities,
            trip,
          });
        });    
    });
});

router.put('/updateTrip/:id', ensureAuthenticated, (req, res, next) => {
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


router.delete('/deleteTrip/:id', ensureAuthenticated, (req, res, next) => {
  Trip.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(req.get('referer'));
      console.log('Trip deleted');
    });
});


router.delete('/deletePlace/:id', ensureAuthenticated, (req, res, next) => {
  Place.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(req.get('referer'));
      console.log('Place deleted');
    });
});

router.get('/editProfile', (req, res, next) => {
  res.render('profile/editProfile');
})



module.exports = router;

