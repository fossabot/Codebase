import styled, { css } from "styled-components";

interface Inputs {
  gap?: string;
  far?: boolean;
}

export const Col = styled.div`
  display: flex;
  flex-direction: row;

  /* gap: ${({ gap = "1" }: Inputs) => `${gap}rem`}; */
  ${({ gap, far }: Inputs) =>
    far
      ? css`
          align-items: space-between;
        `
      : css`
          gap: ${gap}rem;
        `}
`;
