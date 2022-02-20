import styled from "styled-components";

/* eslint-disable-next-line */
interface TextProps {}

export const Text = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  max-width: 75ch;
`;
