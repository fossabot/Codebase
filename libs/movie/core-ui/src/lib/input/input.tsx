import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
// export interface InputProps {}

export const Input = styled.input`
  padding: 0.9rem;
  border-radius: 7.5px;
  border: 2px solid ${({ theme }) => theme.background.third};
  appearance: none;
  background: ${({ theme }) => theme.background.secondary};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text.third};
`;

// export function Input(props: any) {
//   return <StyledInput {...props} />;
// }

// export default Input;
