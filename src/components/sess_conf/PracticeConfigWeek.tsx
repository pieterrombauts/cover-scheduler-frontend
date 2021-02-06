import React from 'react';
import styled from 'styled-components';
import StyledPracticeConfigDay from 'components/sess_conf/PracticeConfigDay';
import { SessionConfig as SessionConfigType } from 'customTypes/sess_conf';

interface PracticeConfigWeekProps {
  className?: string;
  practice: string;
  config: SessionConfigType[];
  onSelect: (practice: string, day: string, session:number, value: number[] | null) => void; 
}

const PracticeConfigWeek: React.FC<PracticeConfigWeekProps> = ( props ) => {
  const handleSelect = (day: string, session: number, value: number[] | null) => {
    props.onSelect(props.practice, day, session, value);
  }

  return(
    <div className={`${props.className} config_practice`}>
      <h2 className={"practice_title"}>{props.practice}</h2>
      <div className={"practice_days"}>
        <StyledPracticeConfigDay day="monday" config={props.config.filter((conf: SessionConfigType) => conf.day === "monday")} onSelect={handleSelect} />
        <StyledPracticeConfigDay day="tuesday" config={props.config.filter((conf: SessionConfigType) => conf.day === "tuesday")} onSelect={handleSelect} />
        <StyledPracticeConfigDay day="wednesday" config={props.config.filter((conf: SessionConfigType) => conf.day === "wednesday")} onSelect={handleSelect} />
        <StyledPracticeConfigDay day="thursday" config={props.config.filter((conf: SessionConfigType) => conf.day === "thursday")} onSelect={handleSelect} />
        <StyledPracticeConfigDay day="friday" config={props.config.filter((conf: SessionConfigType) => conf.day === "friday")} onSelect={handleSelect} />
      </div>
    </div>
  ); 
}

export default styled(PracticeConfigWeek)`
  width: 100%;
  height: 420px;
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
