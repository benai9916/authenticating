import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  data : [],
  isLoading: true,
  isError: false
}

export const getTicket = createAsyncThunk(
  'fetchData/fetchAllData',
  async () => {
    const response = await axios.get('http://localhost:5001/api/v1/ticket/all', {withCredentials: true})
    return response.data
  }
)

const getTicketSlice = createSlice({
  name: 'fetchData',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setTicket(state, action) {
      state.data = [...action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTicket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.data = [...action.payload]
      state.isLoading = false
    })
    builder.addCase(getTicket.rejected, (state) => {
      state.isLoading = true
      state.isError = true
    })
  },
})

export const {reset, setTicket}  = getTicketSlice.actions
export default getTicketSlice