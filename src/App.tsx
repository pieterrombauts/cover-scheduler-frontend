import React from 'react';
import 'App.css';
import styled from 'styled-components';
import StyledLeftSidebar from 'components/LeftSidebar'
import StyledRightSidebar from 'components/RightSidebar'
import StyledModalRoot from 'components/modals/ModalRoot';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

interface AppProps {
  className?: string;
}

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const App: React.FC<AppProps> = ( props ) => {
  return (
    <div className={props.className}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <StyledModalRoot />
          <StyledLeftSidebar />
          <StyledRightSidebar />
          <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    </div>
  );
}

export default styled(App)`
  width: 100%;
  height: 100%;
`;