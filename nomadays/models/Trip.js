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

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

const Trip = mongoose.model('Trips', TripSchema);

module.exports = Trip;
