




  import styled from 'styled-components';
  

/* eslint-disable-next-line */
export interface RowProps {
}


const StyledRow = styled.div`
  color: pink;
`;


export function Row(props: RowProps) {
  return (
    <StyledRow>
      
      <h1>Welcome to Row!</h1>
      
    </StyledRow>
  );
};


export default Row;
