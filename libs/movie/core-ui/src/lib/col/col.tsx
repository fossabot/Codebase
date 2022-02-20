import styled from "styled-components";

/* eslint-disable-next-line */
interface ColProps {
  gap?: string;
  far?: boolean;
}

export const Col = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ far = false }: ColProps) =>
    far ? "space-between" : "center"};
  align-items: center;
  gap: ${({ gap = "1", far = false }: ColProps) =>
    far ? "0rem" : `${gap}rem`};
`;
