import styled from 'styled-components';
import Navbar from '../../components/navbar/navbar';

/* eslint-disable-next-line */
export interface HomeProps {}

const Root = styled.div`
  /* background: var(--bg-primary-color); */
`;

export function Home(props: HomeProps) {
  return (
    <Root>
      <Navbar />
    </Root>
  );
}

export default Home;
