import styled from 'styled-components';

const ComboList = styled.ul`
  position: absolute;
  max-height: 25rem;
  padding: 2rem;
  list-style: none;
  overflow-y: auto;
  background: ${({ theme: { color } }) => color.bg};
  box-shadow: ${({ theme: { shadow } }) => shadow.bottom};
  opacity: ${({ isOpen, isResultArrEmpty }) =>
    isOpen && !isResultArrEmpty ? 1 : 0};
  visibility: ${({ isOpen, isResultArrEmpty }) =>
    isOpen && !isResultArrEmpty ? 'visible' : 'hidden'};
  z-index: 1000;
`;

export default ComboList;
