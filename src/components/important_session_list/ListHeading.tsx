import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface ListHeadingProps {
  className?: string;
}

const ListHeading: React.FC<ListHeadingProps> = ( props ) => {
  return(
    <div className={props.className}>
      <p>Sessions to resolve</p>
      <IconButton size="small">
        <MoreHorizIcon />
      </IconButton>
    </div>
  ); 
}

export default styled(ListHeading)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  p {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #315A7B;
    margin: 0px;
  }
`;