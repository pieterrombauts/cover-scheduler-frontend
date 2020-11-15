import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: { calendarDate: DateTime.local().toISODate(), selectedDate: DateTime.local().toISODate()},
  reducers: {
    updateSelectedDate(state, action) {
      state.selectedDate = action.payload.selectedDate;
      state.calendarDate = action.payload.selectedDate;
    },
    updateCalendarDate(state, action) {
      state.calendarDate = action.payload.calendarDate;
    }
  }
})

export const { updateSelectedDate, updateCalendarDate } = calendarSlice.actions;
export default calendarSlice.reducer;