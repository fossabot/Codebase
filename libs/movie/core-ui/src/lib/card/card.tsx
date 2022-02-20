import styled, { css } from "styled-components";

/* eslint-disable-next-line */
export interface CardProps {
  width?: string;
  height?: string;
  padding?: string;
}

export const Card = styled.div`
  padding: ${({ padding = "0" }) => `${padding}rem`};
  display: flex;
  flex-direction: column;
  /* & > * {
    width: 100%;
  } */

  cursor: pointer;

  position: relative;

  width: ${(props: CardProps) => props.width};
  height: ${(props: CardProps) => props.height};

  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  background-color: ${({ theme }) => theme.background.secondary};

  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme, hoverColor = false }: any) =>
      theme.background.third};
  }
`;
