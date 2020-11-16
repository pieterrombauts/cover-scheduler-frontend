import React from 'react';
import 'App.css';
import styled from 'styled-components';
import StyledLeftSidebar from 'components/LeftSidebar'
import StyledRightSidebar from 'components/RightSidebar'
import ModalRoot from 'components/modals/ModalRoot';

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = ( props ) => {
  return (
    <div className={props.className}>
        <ModalRoot />
        <StyledLeftSidebar />
        <StyledRightSidebar />
    </div>
  );
}

export default styled(App)`
  width: 100%;
  height: 100%;
`;