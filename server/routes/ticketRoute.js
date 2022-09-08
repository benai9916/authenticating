const express = require('express');
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const {fetchTicketStatusBySeatNo, bookTicket, updateBookTicket, fetchTicketsByStatus,
  fetchBookedTicketDetail, addTicketDetailManually, resetTicket} = require('../controller/ticketController');

const ticketRoute = express.Router()

//for admin, protected route
ticketRoute.post('/add', auth, roleCheck, addTicketDetailManually)
ticketRoute.get('/reset', auth, roleCheck, resetTicket)

ticketRoute.get('/:seatNumber/status', auth, fetchTicketStatusBySeatNo)
ticketRoute.post('/:seatNumber/book', auth, bookTicket)
ticketRoute.patch('/:seatNumber/update', auth, updateBookTicket)
ticketRoute.get('/:status', auth, fetchTicketsByStatus)
ticketRoute.get('/:seatNumber/detail', auth, fetchBookedTicketDetail)

module.exports = ticketRoute