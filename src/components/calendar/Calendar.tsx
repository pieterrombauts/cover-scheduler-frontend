import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import StyledCalendarMonth from 'components/calendar/CalendarMonth'
import StyledCalendarLetters from 'components/calendar/CalendarLetters'
import StyledCalendarHeader from 'components/calendar/CalendarHeader'
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { updateCalendarDate } from 'redux/slices/calendarSlice'

interface CalendarProps {
  className?: string;
}

const mapState = (state: RootState) => ({
  calendarDate: state.calendarReducer.calendarDate
})

const connector = connect(mapState, { updateCalendarDate });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & CalendarProps;

const Calendar: React.FC<Props> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledCalendarHeader />
      <StyledCalendarLetters />
      {props.calendarDate !== null &&
      <StyledCalendarMonth calendarDate={DateTime.fromISO(props.calendarDate)} />
      }
    </div>
  ); 
}

const StyledCalendar = styled(Calendar)`
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default connector(StyledCalendar);