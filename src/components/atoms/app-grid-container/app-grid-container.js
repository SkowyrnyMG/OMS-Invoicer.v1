import styled from 'styled-components';

const AppGridContainer = styled.div`
  display: grid;
  grid-template-columns: 65vw min-content;
  grid-template-rows: min-content;
  grid-column-gap: 2rem;

  ${({ theme: { mq } }) => mq.mediumDesktop} {
    grid-template-columns: 63vw min-content;
  }

  ${({ theme: { mq } }) => mq.desktop} {
    grid-template-columns: 73vw min-content;
  }

  ${({ theme: { mq } }) => mq.tablet} {
    grid-template-columns: 90vw;
  }
`;

export default AppGridContainer;
