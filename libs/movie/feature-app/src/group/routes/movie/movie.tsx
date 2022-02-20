import styled from "styled-components";

/* eslint-disable-next-line */
export interface MovieProps {}

const StyledMovie = styled.div`
  color: pink;
`;

export function GroupMovie(props: MovieProps) {
  return (
    <StyledMovie>
      <h1>Welcome to Movie!</h1>
    </StyledMovie>
  );
}
