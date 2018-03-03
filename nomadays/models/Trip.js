const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TripSchema = new Schema({
  originCity: {
    type: String,
    required: true,
  },

  destinationCity: {
    type: String,
    required: true,
  },

  dateInitial: {
    type: Date,
    required: true,
  },

  dateEnd: {
    type: Date,
    required: true,
  },

  estimatedPrice: {
    type: Number,
    required: false,
  },

  travelStyle: {
    type: Number,
    required: false,
  },

  accommodationRange: {
    type: Number,
    required: false,
  },

  transportRange: {
    type: Number,
    required: false,
  },

  foodRange: {
    type: Number,
    required: false,
  },

  cultureRange: {
    type: Number,
    required: false,
  },

  entertainmentRange: {
    type: Number,
    required: false,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

const Trip = mongoose.model('Trips', TripSchema);

module.exports = Trip;
