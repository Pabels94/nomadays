const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nomadays', {
  useMongoClient: true,
})
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));

const Trip = require('../models/Trip');
const City = require('../models/City');

// City Objects
// -----------------------------------------------------------
const city1 = {
  name: 'Barcelona',
  position: {
    lat: '41.38879',
    lng: '2.15899',
  },
};

const city2 = {
  name: 'Paris',
  position: {
    lat: '48.82857',
    lng: '-67.52197' },
};

const city3 = {
  name: 'London',
  position: {
    lat: '51.50853',
    lng: '-0.12574',
  },

};

const city4 = {
  name: 'Atenas',
  position: {
    lat: '9.97489',
    lng: '-84.37886',
  },
};


const city5 = {
  name: 'Budapest',
  position: {
    lat: '47.49801',
    lng: '19.03991',
  },
};

const city6 = {
  name: 'Rome',
  position: {
    lat: '41.89193',
    lng: '12.51133',
  },
};


const city7 = {
  name: 'Montecarlo',
  position: {
    lat: '43.85218',
    lng: '10.66742',
  },
};


// Trip Objects
// -----------------------------------------------------------

const trip1 = {
  originCity: 'Barcelona',
  destinationCity: 'Paris',
  dateInitial: '2018-02-18',
  dateEnd: '2018-04-20',
  userId: '5a898fff6bad38205ccf19a1',
};

const trip2 = {
  originCity: 'Atenas',
  destinationCity: 'Montecarlo',
  dateInitial: '2018-04-25',
  dateEnd: '2018-05-15',
  userId: '5a898fff6bad38205ccf19a1',
};


function createCities() {
  City.create(city1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city2, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city3, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city4, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city5, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city6, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  City.create(city7, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}

function createTrips() {
  Trip.create(trip1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  Trip.create(trip2, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}


// createCities();
createTrips();
