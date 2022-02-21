import { createAction, createSlice } from '@reduxjs/toolkit'

export const showLoader = createAction("SHOW_LOADER");
export const hideLoader = createAction("HIDE_LOADER");
export const toggleLoader = createAction("TOGGLE_LOADER");

// init states
const initialState = {
  isOpen: false,
}

// slice
export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {},
  extraReducers: {
    [showLoader] : (state) => {
        state.isOpen = true;
    },
    [hideLoader] : (state) => {
        state.isOpen = false;
    },
    [toggleLoader] : (state, action) => {
        state.isOpen = action.payload;
    }
  }
})

export default loaderSlice.reducer