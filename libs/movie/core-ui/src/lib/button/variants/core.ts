import styled, { css } from 'styled-components';
import { Props } from '../button';

export const CoreButton = styled.button`
  /* --color: black; */

  /* --color: black;
  --bg-color: rgb(144, 202, 249);
  --bg-hover: rgb(170, 220, 255);

  --bg-secondary: rgba(150, 220, 240);
  --bg-secondary-hover: rgba(144, 202, 249, 0.1); */

  color: ${({ theme }) => theme.color.primary};

  border: none;

  background-color: transparent;

  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: ${({ size }: Props) => `${size || '1.05'}rem`};
  font-weight: 500;
  cursor: pointer;
  font-family: 'Roboto';
  position: relative;
  overflow: hidden;

  line-height: 1.75;

  @media screen and (max-width: 600px) {
    font-size: ${({ size }: Props) => {
      const digit = parseInt(size || '1.15');

      return (digit / 1.25).toString() + 'rem';
    }};
  }
  /* 
  &:hover {
    ${({ theme }) => {
    if (theme.theme !== 'dark') {
      return css`
        box-shadow: 0 0 ${(props: Props) => props?.shadow || '10px'} lightgray;
      `;
    } else {
      return '';
    }
  }};
  } */
`;
