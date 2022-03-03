
import { createSlice } from '@reduxjs/toolkit'

// init states
const initialState = {
  modal : {
    isOpen : false,
    type: "",//component, alert, confirm
    title: "",
    content: null,
  },
  childModal : {
    isOpen : false,
    type: "",//component, alert, confirm
    title: "",
    content: null,
  },
  grandChildModal : {
    isOpen : false,
    type: "",//component, alert, confirm
    title: "",
    content: null,
  }
}


// slice
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal : (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload?.type;
      state.modal.title = action.payload?.title;
      state.modal.content = action.payload?.content;
    },
    openChildModal : (state, action) => {
      if(state.modal.isOpen) {
        state.childModal.isOpen = true;
        state.childModal.type = action.payload?.type;
        state.childModal.title = action.payload?.title;
        state.childModal.content = action.payload?.content;
      }
    },
    openGrandChildModal : (state, action) => {
      if(state.childModal.isOpen) {
        state.grandChildModal.isOpen = true;
        state.grandChildModal.type = action.payload?.type;
        state.grandChildModal.title = action.payload?.title;
        state.grandChildModal.content = action.payload?.content;
      }
    },
    closeModal : (state) => {
      closeChildModal(state);
      state.modal.isOpen = false;
      state.modal.type = "";
      state.modal.title = "";
      state.modal.content = "";
      
    },
    closeChildModal : (state) => {
      closeGrandChildModal(state);
      state.childModal.isOpen = false;
      state.childModal.type = "";
      state.childModal.title = "";
      state.childModal.content = "";
    },
    closeGrandChildModal : (state) => {
      state.grandChildModal.isOpen = false;
      state.grandChildModal.type = "";
      state.grandChildModal.title = "";
      state.grandChildModal.content = "";
    }
  },
  extraReducers: {}
});

export const {openModal, openChildModal, openGrandChildModal, closeModal, closeChildModal, closeGrandChildModal} = modalSlice.actions;
export default modalSlice.reducer;