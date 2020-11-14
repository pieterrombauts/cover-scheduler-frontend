import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import StyledCalendarWeek from 'components/calendar/CalendarWeek'

interface CalendarMonthProps {
  className?: string;
  calendarDate: DateTime;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ( props ) => {
  const [firstDate, setFirstDate] = useState<DateTime>(props.calendarDate.startOf('month').startOf('week'));
  useEffect(() => {
    setFirstDate(props.calendarDate.startOf('month').startOf('week'));
  }, [props.calendarDate])
  return(
    <div className={props.className}>
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate} />
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate.plus({ weeks: 1 })} />
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate.plus({ weeks: 2 })} />
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate.plus({ weeks: 3 })} />
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate.plus({ weeks: 4 })} />
      <StyledCalendarWeek calendarDate={props.calendarDate} weekDate={firstDate.plus({ weeks: 5 })} />
    </div>
  ); 
}

export default styled(CalendarMonth)`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;