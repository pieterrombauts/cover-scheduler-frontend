import React from 'react';
import 'App.css';
import styled from 'styled-components';
import StyledLeftSidebar from 'components/LeftSidebar'
import StyledRightSidebar from 'components/RightSidebar'

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = ( props ) => {
  return (
    <div className={props.className}>
        <StyledLeftSidebar />
        <StyledRightSidebar />
    </div>
  );
}

export default styled(App)`
  width: 100%;
  height: 100%;
`;