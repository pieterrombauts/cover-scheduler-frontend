import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import StyledListItem from 'components/important_session_list/ListItem';

interface ListDayProps {
  className?: string;
  date: DateTime;
}

const ListDay: React.FC<ListDayProps> = ( props ) => {
  return(
    <div className={props.className + " list-item"}>
      <p>{props.date.toLocaleString(DateTime.DATE_HUGE)}</p>
      <StyledListItem practice="City" employee="Narelle Spinner" />
      <StyledListItem practice="Peninsula" employee="Julie Davis" />
    </div>
  ); 
}

export default styled(ListDay)`
  padding-bottom: 30px;

  p {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #315A7B;
    margin: 0px;
  }
`;