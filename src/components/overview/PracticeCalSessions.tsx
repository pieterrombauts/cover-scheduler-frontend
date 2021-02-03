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

const sessions_list: Session[] = [{id: 1, name: "Pieter Rombauts", cover_name: "Karl Rombauts", practice: "city", status: STATUS.NORMAL, date: "2020-11-17"}, {id: 2, name: "Sofie Piessens", cover_name: "Karl Rombauts", practice: "city", status: STATUS.COVERED, date: "2020-11-17"}, {id: 3, name: "Luk Rombauts", cover_name: "Karl Rombauts", practice: "city", status: STATUS.CLOSED, date: "2020-11-17"}]

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

  .practice_days .day_col:not(:last-child) {
    margin-right: 10px;
  }
`;

export default connector(StyledPracticeCalSessions)

