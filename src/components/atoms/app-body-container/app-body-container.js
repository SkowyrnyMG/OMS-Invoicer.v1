import styled from 'styled-components';

const AppBodyContainer = styled.div`
  width: 100%;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 0.5rem;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
`;

export default AppBodyContainer;
