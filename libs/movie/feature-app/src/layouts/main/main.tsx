import { Outlet } from "@tanstack/react-location";
import styled from "styled-components";

interface Inputs {
  gap?: string;
  maxWidth?: string;
}

const SMain = styled.div`
  @media screen and (max-width: 800px) {
    padding-inline: 1rem;
  }

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: ${(props: Inputs) => `${props.gap || "2"}rem`};
  max-width: ${({ maxWidth = "1300px" }) => maxWidth};
  min-height: 100vh;
  margin: 0 auto;
`;

export function Main() {
  return (
    <SMain>
      <Outlet />
    </SMain>
  );
}
