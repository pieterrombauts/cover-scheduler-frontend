import React from 'react';
import styled from 'styled-components';

interface ListItemProps {
  className?: string;
  practice: string;
  employee: string;
}

const ListItem: React.FC<ListItemProps> = ( props ) => {
  return(
    <div className={props.className + " list-item"}>
      <p className="item-practice">{props.practice}</p>
      <p className="item-employee">{props.employee}</p>
    </div>
  ); 
}

export default styled(ListItem)`
  background-color: #E4F0F8;
  border-radius: 5px;
  display: flex;
  margin-top: 10px;

  p {
    width: 35%;
    padding: 5px 15px;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #315A7B;
    margin: 0px;
  }

  p.item-employee {
    width: 65%;
    font-weight: 600;
  }
`;