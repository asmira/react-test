import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSessionInfoApi, loginApi, logoutApi } from '../apis/authApi';

// actions 
export const fetchSessionInfo = createAsyncThunk('SESSION/SESSION_INFO', () => {
  return getSessionInfoApi();
});

export const postLogin = createAsyncThunk('SESSION/LOGIN', async ({data}, { dispatch, rejectWithValue }) => {
  return loginApi(data).then(() => {
      dispatch(fetchSessionInfo());
    }).catch((err) => rejectWithValue(err.response.data));
});

export const postLogout = createAsyncThunk('SESSION/LOGOUT', async (_, {rejectWithValue}) => {
  return logoutApi().catch((err) => rejectWithValue(err.response.data));
});


// init states
const initialState = {
  session: {
    userid:"",
    email:""
  },
  loading : false,
  error: ""
}

// slice
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchSessionInfo.pending] : (state) => {
      state.loading = true;
      state.error = "";
    },
    [fetchSessionInfo.fulfilled] : (state, action) => {
      state.session= action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchSessionInfo.rejected] : (state, action) => {
      state.error=action.payload;
    },
    [postLogin.rejected] : (state, action) => {
      state.error=action.payload;
    },
    [postLogout.fulfilled] : (state) => {
      state.session = {userId:"", email:""}
    },
    [postLogout.rejected] : (state, action) => {
      state.error=action.payload;
    },
  }
})

export default sessionSlice.reducer