import styled from 'styled-components';
import { Link as RLink } from 'react-location';

/* eslint-disable-next-line */
export interface LinkProps {
  children: any;
  to: string;
}

const StyledLink = styled(RLink)`
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function Link(props: LinkProps) {
  return <StyledLink {...props}>{props.children}</StyledLink>;
}
