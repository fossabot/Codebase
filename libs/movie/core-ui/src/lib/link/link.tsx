import styled from "styled-components";
import { Link as RLink } from "@tanstack/react-location";

export interface LinkProps {
  children: any;
  to?: string;
  onClick?: () => void;
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
