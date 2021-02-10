import styled from 'styled-components';

const AppBodyContainer = styled.div`
  height: 60vh;
  width: 100%;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 0.5rem;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
  overflow: scroll;

  ${({ theme: { mq } }) => mq.tablet} {
    height: ${({ isModalOpen }) => (isModalOpen ? '30vh' : '60vh')};
  }
`;

export default AppBodyContainer;
