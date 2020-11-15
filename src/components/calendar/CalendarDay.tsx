import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import * as SESSION from 'constants/session';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { updateSelectedDate } from 'redux/slices/calendarSlice'

interface CalendarDayProps {
  className?: string;
  calendarDate: DateTime;
  date: DateTime;
  status: SESSION.STATUS;
  currWeek: boolean;
}

const mapState = (state: RootState) => ({
  selectedDate: state.calendarReducer.selectedDate
})

const connector = connect(mapState, { updateSelectedDate });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & CalendarDayProps;

const handleBorderType = (date: DateTime) => {
  if (DateTime.local().hasSame(date, 'day')) {
    return "border: 2px solid #4489BF !important";
  } else {
    return "border: none";
  }
}

const CalendarDay: React.FC<Props> = ( props ) => {  
  const handleDateSelection = (e: React.MouseEvent, date: DateTime) => {
    e.preventDefault();
    props.updateSelectedDate({ selectedDate: date.toISODate() });
  };

  return(
    <div className={props.className}>
      <button className={props.status} onClick={(e) => handleDateSelection(e, props.date)}>{props.date.toFormat('dd')}</button>
    </div>
  ); 
}

const StyledCalendarDay = styled(CalendarDay)`
  height: 35px;
  width: 35px;
  position: relative;

  button {
    position: absolute;
    top: 0;
    left: 0;
    ${props => handleBorderType(props.date)};
    height: 35px;
    width: 35px;
    border-radius: 6px;
    border: none;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    ${props => props.date.hasSame(props.calendarDate, 'month') ? "" : "opacity: 40%"};
  }

  .normal {
    background-color: transparent;
    color: #315A7B;
  }
  .normal:hover {
    background-color: ${props => props.currWeek ? "#C4E0F8" : "#E4F0F8"};
    color: #315A7B;
  }

  .closed {
    background-color: #757575;
    color: white;
  }
  .closed:hover { 
    background-color: #555555;
    color: white;
  }

  .covered {
    background-color: #55C144;
    color: white;
  }
  .covered:hover {
    background-color: #35A124;
    color: white;
  }

  .uncovered {
    background-color: #FF5D5D;
    color: white;
  }
  .uncovered:hover {
    background-color: #EF3030;
    color: white;
  }

  button:focus {
    outline: 0 !important;
  }
`;

export default connector(StyledCalendarDay);