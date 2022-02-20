import { motion } from "framer-motion";
import styled from "styled-components";

interface Inputs {
  size?: string;
  children: any;
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

// export function Title(props: Inputs) {
//   return <H1 {...props}>{props.children}</H1>;
// }
