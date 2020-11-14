import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import * as SESSION from 'constants/session';
import StyledCalendarDay from 'components/calendar/CalendarDay'
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';

interface CalendarWeekProps {
  className?: string;
  calendarDate: DateTime;
  weekDate: DateTime;
}

const mapState = (state: RootState) => ({
  selectedDate: state.calendarReducer.selectedDate
})

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & CalendarWeekProps;

const handleSelectedWeekBackground = (weekDate: DateTime, selectedDate: DateTime) => {
  if (weekDate.hasSame(selectedDate, 'week')) {
    return "background-color: #E4F0F8";
  } else {
    return "";
  }
}

const CalendarWeek: React.FC<Props> = ( props ) => {
  const [selectedWeek, setSelectedWeek] = useState<boolean>(false);
  useEffect(() => {
    if (props.selectedDate !== null) {
      setSelectedWeek(props.weekDate.hasSame(DateTime.fromISO(props.selectedDate), 'week'));
    }
  }, [props.weekDate, props.selectedDate])
  return(
    <div className={props.className}>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate} status={SESSION.STATUS.NORMAL}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 1 })} status={SESSION.STATUS.NORMAL}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 2 })} status={SESSION.STATUS.NORMAL}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 3 })} status={SESSION.STATUS.CLOSED}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 4 })} status={SESSION.STATUS.COVERED}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 5 })} status={SESSION.STATUS.UNCOVERED}/>
      <StyledCalendarDay calendarDate={props.calendarDate} currWeek={selectedWeek} date={props.weekDate.plus({ days: 6 })} status={SESSION.STATUS.NORMAL}/>
    </div>
  ); 
}

const StyledCalendarWeek = styled(CalendarWeek)`
  padding: 3px;
  width: 305px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${props => props.selectedDate !== null ? handleSelectedWeekBackground(props.weekDate, DateTime.fromISO(props.selectedDate)) : ""};
  transition-duration: 0.3s;
`;

export default connector(StyledCalendarWeek);