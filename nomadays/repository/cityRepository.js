const City = require('../models/City');


exports.getCities = () => {
  const promise = City.find({}).sort({ name: 'asc' }).exec();
};

