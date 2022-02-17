import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { getBoards } from '../apis/board'

export const fetchBoards = createAsyncThunk('BOARD/BOARDS', () => {
  return axios.get(`http://49.247.24.232:3000/board`)
    .then((res) => res.data)
    .catch((err) => err);
});

const initialState = {
  value: [],
  loading : false,
  error: ""
}

const loadingState = {...initialState, loading:true};
const errorState = (err) => {return {...initialState, error: err}};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBoards.pending] : (state) => {
      state = loadingState;
    },
    [fetchBoards.fulfilled] : (state, action) => {
      state.value= action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchBoards.rejected] : (_, action) => {
      errorState(action.payload)
    },
  }
})

export default boardSlice.reducer