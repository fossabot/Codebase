import styled from 'styled-components';
import { CoreButton } from './core';
export const OutlinedButton = styled(CoreButton)`
  border: 2px solid var(--bg-secondary-color);
  &:hover {
    border: 2px solid var(--bg-secondary-color--hover);
  }
`;
console.log(OutlinedButton);
