import { createAction, createSlice } from '@reduxjs/toolkit'


export const openSnackbar = createAction("OPEN_SNACKBAR");
export const closeSnackbar = createAction("CLOSE_SNACKBAR");

// init states
const initialState = {
  isOpen: false,
  message: "",
  severity: "success",
  label: "",
  error: "",
}

// slice
export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {},
  extraReducers: {
    [openSnackbar] : (state, action) => {
        state.isOpen = true;
        state.message = action.payload?.message;
        state.severity = action.payload?.severity;
        state.label = action.payload?.label;
    },
    [closeSnackbar] : (state) => {
        state.isOpen = false;
        state.message = "";
        state.label = "";
    }
  }
})

export default snackbarSlice.reducer