import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteBoardApi, getBoardApi, getBoardsApi, postBoardApi, putBoardApi } from '../apis/boardApi'
import { isPendingAction, isRejectedAction } from '../configs/reducerConfig';

// actions 
export const fetchBoards = createAsyncThunk('BOARD/BOARDS', async (payload) => {
  return getBoardsApi(payload);
});

export const fetchBoard = createAsyncThunk('BOARD/BOARD', async (payload) => {
  const id = (!!payload && typeof payload === 'object') ? payload.id : payload;
  return getBoardApi(id);
});

export const postBoard = createAsyncThunk('BOARD/CREATE_BOARD', async (payload, {rejectWithValue}) => {
  const {data, errorMsg} = payload;
  return !!data 
      && postBoardApi(data)
        .catch((err) => rejectWithValue(errorMsg || err.response.data));
});

export const putBoard = createAsyncThunk('BOARD/UPDATE_BOARD', async (payload, {rejectWithValue}) => {
  const {data, errorMsg} = payload;
  const id = data?.id || 0;
  return !!data 
      && putBoardApi(id, data)
        .catch((err) => rejectWithValue(errorMsg || err.response.data))
});

export const deleteBoard = createAsyncThunk('BOARD/DELETE_BOARD', async (payload, {rejectWithValue}) => {
  const {data, errorMsg} = payload;
  const id = data?.id || 0;
  return !!data 
      && deleteBoardApi(id)
        .catch((err) => rejectWithValue(errorMsg || err.response.data));
});

// init states
const initialState = {
  list: {
    item:[],
    paging:{}
  },
  view: {
    id:"",
    title:"",
    content:"",
    writer:"",
    regdate:""
  },
  loading : false,
  error: ""
}

// slice
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initList : (state) => {
      state.list = [];
      state.loading = false;
      state.error = "";
    },
    initView : (state) => {
      state.view = {};
      state.loading = false;
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.list= action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.view= action.payload;
        state.loading = false;
        state.error = "";
      })
      .addMatcher(isPendingAction,(state,action) => {
        state.loading = true;
        state.error = "";
      })
      .addMatcher(isRejectedAction,(state,action) => {
        state.loading = false;
        state.error=action.payload;
      });
  }
})

export const {initList,initView} = boardSlice.actions;
export default boardSlice.reducer;