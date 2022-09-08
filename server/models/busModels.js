const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const busSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    unique: true
  },
  companyName: {
    type: String,
    require: true
  },
  busNumber: {
    type: String,
    require: true
  },
  totalSeat: {
    type: Number,
    default: 40
  },
  pricePerSeat: {
    type: Number,
    default: 500
  },
  source: {
    type: String
  },
  destination: {
    type: String
  },
  seatStatus: {
    type: String,
    default: 'OPEN'
  },
  seatBookedDateTime: {
    type: Date, 
    default: Date.now
  },
  userDetail: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
})

const BusSchema = mongoose.model("Bus", busSchema);

module.exports = BusSchema;