import { Title } from "@projects/libs/movie/core-ui";
import styled from "styled-components";
import Navbar from "../../components/navbar/navbar";

/* eslint-disable-next-line */
export interface PricingProps {}

const Root = styled.div``;

export function Pricing(props: PricingProps) {
  return (
    <Root>
      <Navbar />
      <Title>Pricing</Title>
    </Root>
  );
}

export default Pricing;
