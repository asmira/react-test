import { createSlice } from '@reduxjs/toolkit'

// init states
const initialState = {
  isOpen: false,
  message: "",
  severity: "success",
  label: "",
}

// slice
// const AVAILABLE_SEVERITY = ["error","info","success","warning"];
export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    snackError : (state,action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.severity = "error"
    },
    snackInfo : (state,action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.severity = "success"
    },
    snackWarning : (state,action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.severity = "success"
    },
    snackSuccess : (state,action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.severity = "success"
    },
    openSnackbar : (state, action) => {
      state.isOpen = true;
      state.message = action.payload?.message;
      state.severity = action.payload?.severity;
    },
    closeSnackbar : (state) => {
        state.isOpen = false;
        state.message = "";
    }
  },
  extraReducers: {}
});

export const {snackError, snackInfo, snackWarning, snackSuccess, openSnackbar, closeSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;