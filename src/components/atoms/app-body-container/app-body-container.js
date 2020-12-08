import styled from 'styled-components';

const AppBodyContainer = styled.div`
  height: 70vh;
  width: 1268px;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 0.5rem;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
  overflow: scroll;
`;

export default AppBodyContainer;
