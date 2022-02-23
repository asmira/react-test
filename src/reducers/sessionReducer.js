import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSessionInfoApi, loginApi, logoutApi } from '../apis/authApi';
import { openSnackbar } from './snackbarReducer';

// actions 
export const fetchSessionInfo = createAsyncThunk('SESSION/SESSION_INFO', () => {
  return getSessionInfoApi();
});

export const postLogin = createAsyncThunk('SESSION/LOGIN', async ({data, navigate}, { dispatch, rejectWithValue }) => {
  return loginApi(data).then(() => {
      dispatch(fetchSessionInfo({navigate}));
    }).catch((err)=>{
    console.log("error",err);
    dispatch(openSnackbar({message:"로그인에 실패하였습니다.",severity:"error"}));
    return rejectWithValue(err.response.data)
  });
});

export const postLogout = createAsyncThunk('SESSION/LOGOUT', () => {
  console.log("here!!");
  return logoutApi().catch(e=>{
    console.log(e);
  });
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

const errorState = (err) => {
  return {...initialState, error: err} 
};

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
    [fetchSessionInfo.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [postLogin.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [postLogout.fulfilled] : (state) => {
      state.session = {userId:"", email:""}
    }
  }
})

export default sessionSlice.reducer