import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteBoardApi, getBoardApi, getBoardsApi, postBoardApi, putBoardApi } from '../apis/boardApi'
import { openSnackbar } from './snackbarReducer';

// actions 
export const fetchBoards = createAsyncThunk('BOARD/BOARDS', (payload) => {
  return getBoardsApi(payload);
});

export const fetchBoard = createAsyncThunk('BOARD/BOARD', (payload) => {
  const id = (!!payload && typeof payload === 'object') ? payload.id : payload;
  return getBoardApi(id);
});

export const postBoard = createAsyncThunk('BOARD/CREATE_BOARD', ({data,navigate,message="등록에 성공하였습니다!"}, {dispatch}) => {
  return !!data && postBoardApi(data).then(() => {
    (!!navigate) && navigate();
    (message !== "_") && dispatch(openSnackbar({message}));
    return data;
  });
});

export const putBoard = createAsyncThunk('BOARD/UPDATE_BOARD', ({data,navigate,message="수정에 성공하였습니다!"}, {dispatch}) => {
  const id = data?.id || 0;
  return !!data && putBoardApi(id, data).then(() => {
    (!!navigate) && navigate();
    (message !== "_") && dispatch(openSnackbar({message}));
    return data;
  });
});

export const deleteBoard = createAsyncThunk('BOARD/DELETE_BOARD', ({data,navigate,message="삭제에 성공하였습니다!"}, {dispatch}) => {
  const id = data?.id || 0;
  return !!data && deleteBoardApi(id).then(() => {
    (!!navigate) && navigate();
    (message !== "_") && dispatch(openSnackbar({message}));
    return data;
  });
});

export const initList = createAction("INIT_LIST");
export const initView = createAction("INIT_VIEW");

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

const errorState = (err) => {
  return {...initialState, error: err} 
};

// slice
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {

  },
  extraReducers: {
    [initList] : (state) => {
      state.list = [];
    },
    [initView] : (state) => {
      state.view = {};
    },
    [fetchBoards.pending] : (state) => {
      state.loading = true;
      state.error = "";
    },
    [fetchBoards.fulfilled] : (state, action) => {
      state.list= action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchBoards.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [fetchBoard.pending] : (state) => {
      state.view= [];
      state.loading = true;
      state.error = "";
    },
    [fetchBoard.fulfilled] : (state, action) => {
      state.view= action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchBoard.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [postBoard.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [putBoard.rejected] : (_, action) => {
      errorState(action.payload)
    },
    [deleteBoard.rejected] : (_, action) => {
      errorState(action.payload)
    },
  }
})

export default boardSlice.reducer