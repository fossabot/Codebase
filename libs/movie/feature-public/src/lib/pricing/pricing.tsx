import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PricingProps {}

const StyledPricing = styled.div`
  color: pink;
`;

export function Pricing(props: PricingProps) {
  return (
    <StyledPricing>
      <h1>Welcome to Pricing!</h1>
    </StyledPricing>
  );
}

export default Pricing;
