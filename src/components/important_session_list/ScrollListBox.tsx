import React from 'react';
import styled from 'styled-components';
import StyledListCategory from 'components/important_session_list/ListCategory';

interface ScrollListBoxProps {
  className?: string;
}

const ScrollListBox: React.FC<ScrollListBoxProps> = ( props ) => {
  return(
    <div className={props.className}>
      <StyledListCategory headingText="Needs Cover" />
      <StyledListCategory headingText="Closed" />
    </div>
  ); 
}

export default styled(ScrollListBox)`
  display: flex;
  flex-direction: column;
  max-height: 470px;
  padding-right: 15px;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #E4F0F8;
    border-radius: 100px;
  }

  .list-category {
    align-self: flex-start;
  }
`;