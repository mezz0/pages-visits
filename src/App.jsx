import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as vars from './styles/exports';

// css reset
import './styles/index.css';

// pages
import Home from './pages/home';
import NoMatch from './pages/noMatch';

// components
import Header from './components/header';

const RouteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100vh;
  font-family: 'SunRegular', Helvetica, Arial;
  background-color: ${vars.colors.white};
  line-height: 1.3;
`;

const BodyWrapper = styled.div`
  width: 100%;
`;

function App({ location }) {
  return (
    <RouteWrapper>
      <Header location={location} />
      <BodyWrapper>
        <Switch location={location}>
          <Route exact path={`/`} component={Home} />;
          <Route component={NoMatch} />;
        </Switch>
      </BodyWrapper>
    </RouteWrapper>
  );
}

export default withRouter(App);
