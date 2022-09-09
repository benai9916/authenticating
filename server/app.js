const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const ticketRoute = require('./routes/ticketRoute')
const userRouter = require('./routes/userRoute')

const PORT = process.env.PORT || 5001;
const app = express()
app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());

// connect to db
mongoose.connect(process.env.MONGO_URL_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
  .catch((error) => console.log('Encounter Error => ',error));

// route
<<<<<<< HEAD
app.get('/', (req, res)=>{
  res.send('Works!!')
})
=======
>>>>>>> e310d5254ca58d7fb59e737ea52a7223bc9b3168
app.use('/api/v1/ticket', ticketRoute)
app.use('/api/v1', userRouter)