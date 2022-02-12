import styled from 'styled-components';

import { Link, Title } from '@projects/libs/movie/core-ui';
import { useState } from 'react';
import { SignUpButton } from '../sign-up-button/sign-up-button';
// import {} from "@projects/libs/movie/data-access"

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 3rem;
  align-items: center;
  font-size: 1.05rem !important;
`;

const NavLink = styled(Link)`
  font-size: 1.05rem;
  margin-bottom: 0.1rem;
`;

export function Navbar(props: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSignInModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledNavbar>
        <Title size="1.8">Movie Reviewer</Title>
        <NavLinks>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <SignUpButton />
          {/* <Button variant="contained" onClick={showSignInModal}>
            Sign Up
          </Button> */}
        </NavLinks>
      </StyledNavbar>
      <SignUpButton />
    </>
  );
}

export default Navbar;
