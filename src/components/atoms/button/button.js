import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8rem 1rem;
  width: 16rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.ms};
  text-align: left;
  color: ${({ theme: { color } }) => color.tertiaryFont};
  background-color: ${({ theme: { color } }) => color.primary};
  border: none;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.25s transform;

  :hover,
  :active {
    transform: translateX(2px);
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ::first-letter {
    text-transform: uppercase;
  }
`;

export default Button;
