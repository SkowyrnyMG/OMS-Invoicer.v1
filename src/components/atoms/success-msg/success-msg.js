import styled from 'styled-components';

const SuccessMsg = styled.span`
  margin-bottom: 1rem;
  width: 100%;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color } }) => color.success};
`;

export default SuccessMsg;
