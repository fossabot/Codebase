import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DividerProps {}

const StyledDivider = styled.div`
  color: pink;
`;

export function Divider(props: DividerProps) {
  return (
    <StyledDivider>
      <h1>Welcome to Divider!</h1>
    </StyledDivider>
  );
}

export default Divider;
