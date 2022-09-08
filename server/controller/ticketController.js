
const BusSchema = require('../models/busModels');
const User = require('../models/userModels');

const fetchTicketStatusBySeatNo = async (req, res) => {
  try {
    const seatNumber = req.params.seatNumber
    const result = await BusSchema.findOne({seatNumber}, 'seatStatus')

    if(!result) return res.status(400).send({errorMessage: 'Incorrect seat No'});
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

const bookTicket = async (req, res) => {
  try {
    const seatNumber = req.params.seatNumber
    let update = req.body
    update = {...update, ['userDetail']:req.user, ['seatStatus']:'CLOSE'}
    // fetch ticket status
    const ticket = await BusSchema.findOne({seatNumber})
    // return if ticket already booked
    if (ticket.seatStatus === 'CLOSE') return res.status(500).send({errorMessage: 'Ticket is already booked'})
    
    const result = await BusSchema.findOneAndUpdate({seatNumber:seatNumber}, update, {new:true})
    .populate('userDetail', 'firstName lastName email')

    if(!result) res.status(400).send({errorMessage: 'Incorrect seat No'});
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

const updateBookTicket = async (req, res) => {
  try {
    const seatNumber = req.params.seatNumber
    let update = req.body
    let result = ''
    if(req.body.seatStatus === 'open') {
       result = await BusSchema.find({seatNumber: seatNumber}).updateOne({ 
          "$unset": { source: 1, destination: 1, seatBookedDateTime: 1, companyName: 1, busNumber: 1, userDetail: 1},
          "$set": {seatStatus: 'OPEN'}
      })
    } else {
      result = await User.findOne({"_id": req.user}).updateOne({"$set": update})
    }

    if(!result) return res.status(400).send({errorMessage: 'Incorrect seat No'});

    return res.send(result)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

const fetchTicketsByStatus = async (req, res) => {
  try {
    const seatStatus = req.params.status
    let result = ''
    if (seatStatus === 'all') {
      result = await BusSchema.find({}, 'seatNumber pricePerSeat seatStatus')
    } else {
      result = await BusSchema.find({seatStatus: seatStatus.toUpperCase()}, 'seatNumber pricePerSeat seatStatus')
    }
    if(!result) return res.status(500).send({errorMessage: 'Something went wrong'});
    res.send(result)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

const fetchBookedTicketDetail = async (req, res) => {
  try {
    const seatNumber = req.params.seatNumber

    const result = await BusSchema.find({seatNumber}).populate('userDetail', 'firstName lastName email')

    if(!result) return res.status(400).send({errorMessage: 'Incorrect seat No'});
    return res.send(result)
  } catch (err) {
    return res.status(500).send(err)
  }
}

const addTicketDetailManually = async (req, res) => {
  if (!req.body) {
    return res
      .status(500)
      .json({ errorMessage: "Please enter data" });
  }
  const result = await BusSchema.insertMany(req.body)
  res.send(result)
}

const resetTicket = async (req, res) => {
  try {
    const result = await BusSchema.updateMany(
      { 
        "$unset":
        { source: 1, destination: 1, seatBookedDateTime: 1, companyName: 1, busNumber: 1, userDetail: 1},

        "$set": 
        {seatStatus: 'OPEN'}
    })
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  fetchTicketStatusBySeatNo,
  bookTicket, 
  updateBookTicket,
  fetchTicketsByStatus,
  fetchBookedTicketDetail,
  addTicketDetailManually,
  resetTicket,
}