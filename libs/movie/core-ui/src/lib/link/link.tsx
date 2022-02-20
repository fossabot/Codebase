import styled from "styled-components";
import { Link as RLink } from "@tanstack/react-location";
import { ReactNode } from "react";

export interface LinkProps {
  children: ReactNode;
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
