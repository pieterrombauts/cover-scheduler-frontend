import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from 'redux/slices/calendarSlice';
import modalReducer from 'redux/slices/modalSlice';

const rootReducer = combineReducers({
  calendarReducer,
  modalReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer