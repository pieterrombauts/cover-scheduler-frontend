import React from 'react';
import styled from 'styled-components';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import StyledPracticeCalDay from 'components/overview/PracticeCalDay';
import { DateTime } from 'luxon';
import { Session } from 'customTypes/session';
import { STATUS } from 'constants/session';

interface PracticeCalSessionsProps {
  className?: string;
  practice: string;
}

const mapState = (state: RootState) => ({
  selectedDate: state.calendarReducer.selectedDate
})

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PracticeCalSessionsProps;

const sessions_list: Session[] = [{name: "Pieter Rombauts", cover_name: "Karl Rombauts", status: STATUS.NORMAL, date: DateTime.local()}, {name: "Sofie Piessens", cover_name: "Karl Rombauts", status: STATUS.COVERED, date: DateTime.local()}, {name: "Luk Rombauts", cover_name: "Karl Rombauts", status: STATUS.CLOSED, date: DateTime.local()}]

const PracticeCalSessions: React.FC<Props> = ( props ) => {
  return(
    <div className={props.className}>
      <h2 className={"practice_title"}>{props.practice}</h2>
      <div className={"practice_days"}>
        <StyledPracticeCalDay className="day_col" sessions={sessions_list} date={DateTime.fromISO(props.selectedDate!).set({"weekday": 1})}/>
        <StyledPracticeCalDay className="day_col" sessions={sessions_list} date={DateTime.fromISO(props.selectedDate!).set({"weekday": 2})}/>
        <StyledPracticeCalDay className="day_col" sessions={sessions_list} date={DateTime.fromISO(props.selectedDate!).set({"weekday": 3})}/>
        <StyledPracticeCalDay className="day_col" sessions={sessions_list} date={DateTime.fromISO(props.selectedDate!).set({"weekday": 4})}/>
        <StyledPracticeCalDay className="day_col" sessions={sessions_list} date={DateTime.fromISO(props.selectedDate!).set({"weekday": 5})}/>
      </div>
    </div>
  ); 
}

const StyledPracticeCalSessions = styled(PracticeCalSessions)`
  margin-top: 30px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);

  .practice_title {
    margin-bottom: 10px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #315A7B;
    text-transform: capitalize;
  }

  .practice_days {
    display: flex;
  }

  .day_col {
    margin-right: 10px;
  }
`;

export default connector(StyledPracticeCalSessions)

