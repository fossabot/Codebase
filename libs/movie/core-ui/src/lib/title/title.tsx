import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

interface Inputs {
  size?: string;
  children: ReactNode;
}
export const Title = styled(motion.h1)`
  font-family: "Roboto";
  font-weight: 600;
  font-size: ${(props: Inputs) => (props.size || "2") + "rem"};
  color: ${({ theme }) => theme.text.primary};

  @media screen and (max-width: 500px) {
    font-size: ${(props: Inputs) => {
      const digit = parseInt(props.size || "2");

      return (digit / 1.5).toString() + "rem";
    }};
  }
`;

export function TitleTest(props: Inputs) {
  return <Title {...props}>{props.children}</Title>;
}
