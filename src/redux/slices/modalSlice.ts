import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/session';
import { DateTime } from 'luxon';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { modalType: 'SESSION' as (null | string), modalProps: { session: {id: 1, name: "Pieter Rombauts", cover_name: "Karl Rombauts", practice: "city", status: STATUS.NORMAL, date: "2020-11-17"}} as {}},
  reducers: {
    showModal(state, action) {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideModal(state) {
      state.modalType = null;
      state.modalProps = {};
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;