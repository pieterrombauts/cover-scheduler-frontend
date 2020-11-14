import React from 'react';
import styled from 'styled-components';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';

interface PracticeCalSessionsProps {
  className?: string;
}

const mapState = (state: RootState) => ({
  selectedDate: state.calendarReducer.selectedDate
})

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PracticeCalSessionsProps;

const PracticeCalSessions: React.FC<Props> = ( props ) => {
  return(
    <div className={props.className}>
    </div>
  ); 
}

export default styled(PracticeCalSessions)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
`;

