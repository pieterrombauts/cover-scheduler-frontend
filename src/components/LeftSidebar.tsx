import React from 'react';
import styled from 'styled-components';
import StyledOverview from 'components/overview/Overview'
import StyledStaff from 'components/staff/Staff'
import StyledSessionConfig from 'components/sess_conf/SessionConfig'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import IconButton from '@material-ui/core/IconButton'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ( props ) => {
  return(
    <div className={props.className}>
      <Tab.Container id="nav-tabs" defaultActiveKey="cal" transition={false}>
        <Nav defaultActiveKey="cal">
          <Nav.Link eventKey="cal">
            <IconButton size="medium">
              <EventOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </Nav.Link>
          <Nav.Link eventKey="staff">
            <IconButton size="medium">
              <PersonOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </Nav.Link>
          <Nav.Link eventKey="settings">
            <IconButton size="medium">
              <SettingsOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </Nav.Link>
          <Nav.Link eventKey="mail">
            <IconButton size="medium">
              <MailOutlineOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </Nav.Link>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="cal">
            <StyledOverview />
          </Tab.Pane>
          <Tab.Pane eventKey="staff">
            <StyledStaff />
          </Tab.Pane>
          <Tab.Pane eventKey="settings">
            <StyledSessionConfig />
          </Tab.Pane>
          <Tab.Pane eventKey="mail">
            <div></div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  ); 
}

export default styled(LeftSidebar)`
  width: auto;
  height: 100%;
  display: flex;
  margin-right: 400px;

  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 15px;
    background-color: white;
    box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .nav-link > .MuiIconButton-root {
    margin-bottom: 30px;
    font-size: 50px;
    color: #90B6D4;

    &:hover {
      background-color: #E4F0F8;
    }
  }
  
  .nav-link {
    padding: 0px;
  }
  .nav-link.active > .MuiIconButton-root {
    color: #315A7B;
    background-color: #E4F0F8;
  }

  .tab-content {
    width: 100%;
    height: 100%;
    margin-left: 100px;
  }

  .tab-pane {
    width: 100%;
    height: 100%;
  }
`;