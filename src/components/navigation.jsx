import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import pageData from '../assets/data/pages_data.json';

const StyledUL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;

  li {
  }
`;

const Navigation = (props) => {
  const links = pageData.map((x) => (
    <li key={x.path}>
      <Link
        to={x.path}
        aria-label={`${x.page}${props.location.pathname === x.path ? ' active' : ''}`}
        className={props.location.pathname === x.path ? 'active' : ''}
      >
        {x.page}
      </Link>
    </li>
  ));
  return <StyledUL>{links}</StyledUL>;
};

export default Navigation;
