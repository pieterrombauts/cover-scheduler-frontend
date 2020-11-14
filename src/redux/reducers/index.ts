import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from 'redux/slices/calendarSlice';

const rootReducer = combineReducers({
  calendarReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer