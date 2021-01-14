import styled from 'styled-components';

const ComboButton = styled.button`
  padding: 0.2rem;
  width: 5rem;
  height: 2rem;
  border: 2px solid ${({ theme: { color } }) => color.primary};
  background: none;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 2rem;
  }
`;

export default ComboButton;
