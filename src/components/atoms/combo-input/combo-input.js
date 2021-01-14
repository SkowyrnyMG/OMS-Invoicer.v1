import styled from 'styled-components';

const StyledInput = styled.input`
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 3rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.ms};
`;

export default StyledInput;
