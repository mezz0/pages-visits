import React from 'react';
import styled from 'styled-components';
import Navigation from './navigation';
import * as vars from '../styles/exports';

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${vars.sizes.maxWidth};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  box-shadow: inset 0 -2px transparent;
  border-bottom: 1px solid hsla(0, 0%, 54%, 0.3);
  background-color: ${vars.colors.white};
`;

const Header = (props) => (
  <HeaderWrapper>
    <h1 aria-label="Company Name / Logo">Page Visits</h1>
    <nav>
      <Navigation location={props.location} />
    </nav>
  </HeaderWrapper>
);

export default Header;
