import React from 'react';
import styled from 'styled-components';
import StyledSession from 'components/overview/Session';
import { DateTime } from 'luxon';
import { Session } from 'customTypes/session';

interface PracticeCalDayProps {
  className?: string;
  sessions: Session[];
  date: DateTime;
}

const PracticeCalDay: React.FC<PracticeCalDayProps> = ( props ) => {
  return(
    <div className={props.className}>
      <div className={"day_header"}>
        <p className={"day_of_week"}>{props.date.toFormat('ccc').toUpperCase()}</p>
        <p className={"date_num"}>{props.date.toFormat('dd')}</p>
      </div>
      <div className={"sessions"}>
        {props.sessions.map((session, index) => {
            return (
              <StyledSession
                key={index}
                className={"session_item"}
                session={session}
              />
            );
          })
        }
      </div>
    </div>
  ); 
}

export default styled(PracticeCalDay)`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
  }

  .day_header {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .day_header::after {
    display: ${props => props.date.hasSame(DateTime.local(), "day") ? "block" : "none"};
    margin-top: -5px;
    position: absolute;
    height: 67px;
    width: 67px;
    content: "";
    background-color: #4489BF;
    border-radius: 90px;
    z-index: -1;
  }

  .day_of_week {
    margin-bottom: -8px;
    font-size: 14px;
    color: ${props => props.date.hasSame(DateTime.local(), "day") ? "white" : "#A2C2DB"};
  }

  .date_num {
    font-size: 32px;
    color: ${props => props.date.hasSame(DateTime.local(), "day") ? "white" : "#315A7B"};
  }

  .session_item:not(:first-child) {
    margin-top: 10px;
  }
`;

