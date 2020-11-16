import React from 'react';
import styled from 'styled-components';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { showModal, hideModal } from 'redux/slices/modalSlice'
import { Session } from 'customTypes/session'
import { STATUS } from 'constants/session'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ErrorIcon from '@material-ui/icons/Error';


interface SessionListProps {
  className?: string;
  session: Session;
}

const mapState = (state: RootState) => ({})

const connector = connect(mapState, { showModal, hideModal });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & SessionListProps;

const SessionList: React.FC<Props> = ( props ) => {
  const handleClick = () => {
    props.showModal({ modalType: "SESSION", modalProps: { session: props.session }});
  }

  return(
    <div className={props.className} onClick={handleClick}>
      <p className="name">{props.session.name}</p>
      <p className="cover_name">{props.session.cover_name}</p>
      {props.session.status === STATUS.COVERED && <CheckCircleIcon className={"status_icon"} fontSize={"small"}/>}
      {props.session.status === STATUS.CLOSED && <NotInterestedIcon className={"status_icon"} fontSize={"small"}/>}
      {props.session.status === STATUS.UNCOVERED && <ErrorIcon className={"status_icon"} fontSize={"small"}/>}
    </div>
  ); 
}

const backgroundColor = (status: STATUS) => {
  if (status === STATUS.NORMAL) {
    return "#E4F0F8";
  } else if (status === STATUS.UNCOVERED) {
    return "#FF5D5D";
  } else if (status === STATUS.COVERED) {
    return "#55C144";
  } else if (status === STATUS.CLOSED) {
    return "#757575";
  }
}

const StyledSessionList = styled(SessionList)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 240px;
  border-radius: 5px;
  background-color: ${props => backgroundColor(props.session.status)};

  &:hover {
    cursor: pointer;
    filter: brightness(97%);
  }
  
  p {
    margin: 0px;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${ props => props.session.status !== STATUS.NORMAL ? "white" : "#315A7B" };
  }

  .name {
    font-weight: ${ props => props.session.status === STATUS.COVERED ? 600 : 700 };
    text-decoration-line: ${ props => props.session.status === STATUS.COVERED ? "line-through" : "none" };
  }

  .cover_name {
    display: ${ props => props.session.status === STATUS.COVERED ? "block" : "none" };
  }

  .status_icon {
    position: absolute;
    top: 10px;
    right: 10px;
    display: ${ props => props.session.status !== STATUS.NORMAL ? "block" : "none" };
    color: white;
  }
`;

export default connector(StyledSessionList);