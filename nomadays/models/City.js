const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  // currency: {
  //   type: String,
  //   required: true,
  // },
  images: [String],

  position: {
    lat: Number,
    lng: Number,
  },
});

const City = mongoose.model('Cities', CitySchema);

module.exports = City;
