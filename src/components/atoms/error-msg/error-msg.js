import styled from 'styled-components';

const ErrorMsg = styled.span`
  width: 100%;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color } }) => color.danger};
`;

export default ErrorMsg;
