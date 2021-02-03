import React from 'react';
import styled from 'styled-components';
import StyledAvailabilityWeek from 'components/staff/AvailabilityWeek'
import {AvailType} from 'customTypes/staff'

interface SelectableAvailabilityWeekProps {
  className?: string;
  availability: AvailType;
  onDayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SelectableAvailabilityWeek: React.FC<SelectableAvailabilityWeekProps> = ( props ) => {
  return (
    <div id="staff_search_avail" className={props.className}>
      <StyledAvailabilityWeek availability={props.availability} onDayClick={props.onDayClick} />
    </div>
  );
}

export default styled(SelectableAvailabilityWeek)`
  display: flex;
  align-items: center;

  .avail_day {
    cursor: pointer;

    p {
      font-weight: 800;
    }
  }

  .avail_day:not(:last-child) {
    margin-right: 5px;
  }
`;