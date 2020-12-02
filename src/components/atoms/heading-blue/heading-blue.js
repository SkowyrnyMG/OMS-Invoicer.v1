import styled from 'styled-components';

const HeadingBlue = styled.h5`
  margin-bottom: 0.5rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.regular};
  text-transform: uppercase;
  color: ${({ theme: { color } }) => color.primary};
`;

export default HeadingBlue;
