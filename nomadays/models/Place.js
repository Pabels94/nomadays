const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: String,
  description: String,
  locationType: {
    type: String,
    enum: ['Bar', 'Restaurante', 'Hotel', 'Monumento', 'Museo', 'Otros'],
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

PlaceSchema.index({
  location: '2dsphere',
});

module.exports = mongoose.model('Place', PlaceSchema);

