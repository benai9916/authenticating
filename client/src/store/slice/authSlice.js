import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  signInvalidUser : false,
  signUpvalidUser: false,
  isLoading: true,
  isError: false
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (args) => {
    let baseUrl = `http://localhost:5001/api/v1/signUp`

    const response = await axios.post(baseUrl, args)
    return response.data
  }
)

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (args) => {
    let baseUrl = `http://localhost:5001/api/v1/signIn`

    const response = await axios.post(baseUrl, args, {withCredentials: true})
    console.log(response.data)
    return response.data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.signUpvalidUser = true
      state.isLoading = false
    })
    builder.addCase(signUp.rejected, (state) => {
      state.signUpvalidUser = false
      state.isLoading = true
      state.isError = true
    })

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.signInvalidUser = true
      state.isLoading = false
    })
    builder.addCase(signIn.rejected, (state) => {
      state.signInvalidUser = false
      state.isLoading = true
      state.isError = true
    })
  },
})

export const {reset} = authSlice.actions
export default authSlice