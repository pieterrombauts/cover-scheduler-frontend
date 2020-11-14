import React, {useState} from 'react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import StyledListDay from 'components/important_session_list/ListDay';
import { DateTime } from 'luxon';

interface ListCategoryProps {
  className?: string;
  headingText: string;
}

const ListCategory: React.FC<ListCategoryProps> = ( props ) => {
  const [open, setOpen] = useState<boolean>(true);
  return(
    <div className={props.className}>
      <div className="list-category" onClick={() => setOpen(!open)}>
        <p>{props.headingText}</p><ArrowLeft className={`${open ? "down" : ""}`}/>
      </div>
      <Collapse isOpened={open}>
        <div>
          <StyledListDay date={DateTime.local()} />
          <StyledListDay date={DateTime.local().plus({ week: 1 })} />
          <StyledListDay date={DateTime.local().plus({ week: 1 })} />
          <StyledListDay date={DateTime.local().plus({ week: 1 })} />
          <StyledListDay date={DateTime.local().plus({ week: 1 })} />
        </div>
      </Collapse>
    </div>
  ); 
}

export default styled(ListCategory)`
  display: flex;
  flex-direction: column;

  .list-category {
    align-self: flex-start;
    display: flex;
    padding: 5px 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: ${props => (props.headingText === "Closed") ? "#757575" : "#FF5D5D"};

    p {
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: white;
      margin: 0px 10px 0px 0px;
    }

    svg {
      color: white;
      transition: all 0.4s ease-in-out;
    }
    svg.down {
      transform: rotate(-90deg);
    }
  }

  .list-category:hover {
    cursor: pointer;
  }

  .ReactCollapse--collapse {
    transition: height 500ms;
  }
`;