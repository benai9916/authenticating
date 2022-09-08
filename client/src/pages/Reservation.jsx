import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, TextField, Pagination, IconButton, Container, InputAdornment, Box } from '@mui/material'
import { useEffect } from 'react'
import { getTicket } from '../store/slice/ticketSlice'

const Reservation = () => {
  const dispatch = useDispatch()
  const ticket = useSelector(state => state.ticket)
  
  console.log('===========', ticket)
  useEffect(() => {
   
    dispatch(getTicket())
  }, [])

  return (
    <Container maxWidth="lg" className="container" sx={{ mt: 4, mb: 4, }}>
      <Grid
        container
        spacing={4}
        textAlign="left"
      >
        <Grid item sm={12} md={12} lg={10} textAlign="center" mb={4} sx={{ m: '0 auto', }}>

        </Grid>
      </Grid>
    </Container>
  )
}

export default Reservation