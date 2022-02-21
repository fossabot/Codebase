import { Button, Divider, Link, Title } from "@projects/libs/movie/core-ui";
import { useNavigate } from "@tanstack/react-location";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding-top: 2rem; */
  align-items: center;
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
`;

export function Navbar(props: NavbarProps) {
  const router = useNavigate();

  const toCreateGroup = () => router({ to: "../create" });

  return (
    <>
      <StyledNavbar>
        <Title>Groups</Title>
        <NavLinks>
          <Link to="/home">To Home</Link>
          <Button onClick={toCreateGroup}>Create Group</Button>
        </NavLinks>
      </StyledNavbar>
      <Divider />
    </>
  );
}

export default Navbar;
