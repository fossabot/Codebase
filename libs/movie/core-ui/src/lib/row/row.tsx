import styled, { css } from "styled-components";

interface Inputs {
  gap?: string;
  far?: boolean;
}

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  ${({ gap, far }: Inputs) => {
    if (far) {
      return css`
        justify-content: space-between;
      `;
    }
    return css`
      gap: ${gap}rem;
    `;
  }}
`;

export function RowTest(props: any) {
  return <Row {...props} />;
}
