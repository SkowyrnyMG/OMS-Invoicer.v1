import styled from 'styled-components';

const ComboButton = styled.button`
  padding: 0.5rem 1rem;
  /* width: 5rem; */
  /* height: 2rem; */
  border: 2px solid ${({ theme: { color } }) => color.primary};
  border-radius: 0.5rem;
  background: none;
  cursor: pointer;
  transition: all 0.2s;

  &:not(:first-child) {
    margin-left: 2rem;
  }

  :hover {
    background: ${({ theme: { color } }) => color.primary};
    color: ${({ theme: { color } }) => color.bgSecondary};
  }
`;

export default ComboButton;
