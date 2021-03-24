import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  h1 {
    font-size: 40px;
    margin: 10px;
  }
`;
const NoMatch = ({ location }) => (
  <Wrapper>
    <Helmet>
      <title>404</title>
    </Helmet>
    <h1>404</h1>
    <p>
      Page not found: <code>{location.pathname}</code>
    </p>
    <Link to="/">Home</Link>
  </Wrapper>
);

export default withRouter(NoMatch);
