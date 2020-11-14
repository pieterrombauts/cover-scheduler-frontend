import React from 'react';
import styled from 'styled-components';
import { DateTime, Interval } from 'luxon';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { updateSelectedDate } from 'redux/slices/calendarSlice'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

interface DateSwitcherProps {
  className?: string;
}

const mapState = (state: RootState) => ({
  selectedDate: state.calendarReducer.selectedDate
})

const connector = connect(mapState, { updateSelectedDate });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & DateSwitcherProps;

const DateSwitcher: React.FC<Props> = ( props ) => {
  const changeSelectedWeek = (direction: string) => {
    let selDate: DateTime;
    if (props.selectedDate !== null) {
      selDate = DateTime.fromISO(props.selectedDate);
    } else {
      selDate = DateTime.local();
    }
    switch (direction) {
      case 'left':
        props.updateSelectedDate({ selectedDate: selDate.minus( { week: 1 }).toISO() })
        return;
      case 'right':
        props.updateSelectedDate({ selectedDate: selDate.plus( { week: 1 }).toISO() })
        return;
    }
  }
  return(
    <div className={props.className}>
      <div id="dateswitcher">
        <IconButton size="small" onClick={() => changeSelectedWeek('left')}>
          <KeyboardArrowLeftIcon fontSize="large"/>
        </IconButton>
        <div id="dateswitcher-date">
          {props.selectedDate !== null &&
            <>
              <p id="dateswitcher-year">
                {DateTime.fromISO(props.selectedDate).set({ weekday: 2 }).toFormat('yyyy')}
                {DateTime.fromISO(props.selectedDate).set({ weekday: 2 }).hasSame(DateTime.fromISO(props.selectedDate).set({ weekday: 6 }), "year") ? "" : ` – ${DateTime.fromISO(props.selectedDate).set({ weekday: 6 }).toFormat('yyyy')}`}
              </p>
              <p id="dateswitcher-daymonth">
                {`${DateTime.fromISO(props.selectedDate).set({ weekday: 2 }).toFormat('dd MMM')} – ${DateTime.fromISO(props.selectedDate).set({ weekday: 6 }).toFormat('dd MMM')}`}
              </p>
            </>
          }
        </div>
        <IconButton size="small" onClick={() => changeSelectedWeek('right')}>
          <KeyboardArrowRightIcon fontSize="large"/>
        </IconButton>
      </div>
      { props.selectedDate !== null && !Interval.fromDateTimes(DateTime.fromISO(props.selectedDate).set({ weekday: 1 }), DateTime.fromISO(props.selectedDate).set({ weekday: 7 })).contains(DateTime.local()) &&
      <div id="dateswitcher-today" onClick={() => props.updateSelectedDate({ selectedDate: DateTime.local().toISO() })}>
        <p>Today</p>
      </div>
      }
    </div>
  ); 
}

const StyledDateSwitcher = styled(DateSwitcher)`
  display: flex;
  align-items: center;
  width: 570px;

  #dateswitcher {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 380px;
    height: 80px;
    padding: 15px;
    margin-left: 95px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);
  }
  
  #dateswitcher-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 35px;

    p {
      font-family: 'Nunito', sans-serif;
      margin: 0px;
    }

    #dateswitcher-year {
      font-size: 18px;
      font-weight: 800;
      color: #6FA0C7;
    }
    #dateswitcher-daymonth {
      font-size: 24px;
      font-weight: 700;
      color: #315A7B;
    }
  }

  .MuiIconButton-root {
    color: #315A7B;
  }

  #dateswitcher-today {
    position: relative;
    right: 0;
    margin-left: 15px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);
    cursor: pointer;

    p {
      font-family: 'Nunito', sans-serif;
      margin: 0px;
      font-size: 18px;
      font-weight: 700;
      color: #315A7B;
    }
  }
`;

export default connector(StyledDateSwitcher);