import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/session';
import { DateTime } from 'luxon';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { modalType: null as (null | string), modalProps: {}},
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