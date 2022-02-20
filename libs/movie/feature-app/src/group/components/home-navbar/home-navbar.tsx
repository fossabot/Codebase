import { Button, Title } from "@projects/libs/movie/core-ui";
import { useNavigate } from "@tanstack/react-location";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface NavbarProps {
  group: unkown;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

export function Navbar({ group }: NavbarProps) {
  const router = useNavigate();

  return (
    <Container>
      <Title>{group?.name}</Title>
      <NavLinks>
        <Button variant="outlined" onClick={() => router({ to: "../search" })}>
          Add Movie
        </Button>
        <Button>Invite Others!</Button>
      </NavLinks>
    </Container>
  );
}

export default Navbar;
