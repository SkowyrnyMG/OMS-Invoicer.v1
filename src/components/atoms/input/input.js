import styled from 'styled-components';

const Input = styled.input`
    margin: 1rem 0;
    padding: 0.5rem;
    width: 100%;
    height: 3rem;
    font-size: ${({ theme: { fontSize } }) => fontSize.ms};
    color: ${({ theme: { color } }) => color.secondaryFont};
    border: none;
    outline: none;
    border-bottom: 2px solid currentColor;

    transition: 0.5s transform;

    :focus {
      transform: translateX(2px);
    }
  }

  input,
  input::placeholder {
    color: currentColor;
`;

export default Input;
