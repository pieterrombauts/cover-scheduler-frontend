import React from 'react';
import styled from 'styled-components';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import StyledPracticeCalDay from 'components/overview/PracticeCalDay';
import { DateTime } from 'luxon';
import { Session } from 'customTypes/session';
import { STATUS } from 'constants/session';

interface PracticeConfigWeekProps {
  className?: string;
  practice: string;
}

const PracticeConfigWeek: React.FC<PracticeConfigWeekProps> = ( props ) => {
  return(
    <div className={`${props.className} config_practice`}>
      <h2 className={"practice_title"}>{props.practice}</h2>
      <div className={"practice_days"}>
        <p>Hello</p>
      </div>
    </div>
  ); 
}

export default styled(PracticeConfigWeek)`
  width: 100%;
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
