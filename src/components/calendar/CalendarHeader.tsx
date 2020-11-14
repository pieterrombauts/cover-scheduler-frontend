import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { updateCalendarDate } from 'redux/slices/calendarSlice';
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

interface CalendarHeaderProps {
  className?: string;
}

const mapState = (state: RootState) => ({
  calendarDate: state.calendarReducer.calendarDate
})

const connector = connect(mapState, { updateCalendarDate });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & CalendarHeaderProps;

const CalendarHeader: React.FC<Props> = ( props ) => {
  const changeCalendarMonth = (direction: string) => {
    let calDate: DateTime;
    if (props.calendarDate !== null) {
      calDate = DateTime.fromISO(props.calendarDate);
    } else {
      calDate = DateTime.local();
    }
    switch (direction) {
      case 'left':
        props.updateCalendarDate({ calendarDate: calDate.minus( { month: 1 }).toISO() })
        return;
      case 'right':
        props.updateCalendarDate({ calendarDate: calDate.plus( { month: 1 }).toISO() })
        return;
    }
  }
  return(
    <div className={props.className}>
      {props.calendarDate !== null &&
        <>
          <p id="cal-header-year">{DateTime.fromISO(props.calendarDate).toFormat('yyyy')}</p>
          <div id="cal-header-month">
            <IconButton size="small" onClick={() => changeCalendarMonth('left')}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <p>{DateTime.fromISO(props.calendarDate).toFormat('LLLL')}</p>
            <IconButton size="small" onClick={() => changeCalendarMonth('right')}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </>
      }
    </div>
  ); 
}

const StyledCalendarHeader = styled(CalendarHeader)`
  font-family: 'Nunito', sans-serif;
  margin-bottom: 26px;

  p {
    margin: 0;
    text-align: center;
  }

  button {
    margin: 0 15px;
    color: #315A7B;
  }

  #cal-header-year {
    color: #90B6D4;
    font-size: 14px;
    font-weight: 800;
  }

  #cal-header-month {
    display: flex;
    align-items: center;
    color: #315A7B;
    font-size: 18px;
    font-weight: 700;

    p {
      width: 90px;
    }
  }
`;

export default connector(StyledCalendarHeader);