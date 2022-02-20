import styled from "styled-components";

/* eslint-disable-next-line */
export interface DividerProps {
  width?: string;
}

const StyledDivider = styled.div`
  background-color: ${({ theme }) => theme.background.third};
  height: 1px;
  margin: 0 auto;

  margin-block: 2rem;
  width: ${({ width }: DividerProps) => width || "97.5%"};
`;

export function Divider(props: DividerProps) {
  return <StyledDivider {...props} />;
}

export default Divider;
