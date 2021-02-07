import React from 'react';
import styled from 'styled-components';

import NavLink from 'components/atoms/nav-link/nav-link';
import Logo from 'components/modules/logo/logo';
import PatternSection from 'components/atoms/pattern-section/pattern-section';
import HomePageDetailsSection from 'components/organisms/home-page/home-page-details-section/home-page-details-section';
import HomePageFeaturesSection from 'components/organisms/home-page/home-page-features-section/home-page-features-section';

import pattern from 'assets/images/bg-pattern.png';

import { routes } from 'utils/routes';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 5rem [start] repeat(3, 1fr) [end] 5rem;
  grid-auto-rows: minmax(min-content);
  grid-column-gap: 3%;
  margin: 0;
  > *:not(section) {
    grid-column: start / end;
  }

  > section {
    grid-column: -1 / 1 !important;
  }
`;

const RevertPatternSection = styled(PatternSection)`
  background-position: center;
`;

const StyledBodyHeading = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.heading};
  color: ${({ theme: { color } }) => color.danger};
  text-align: center;
  grid-column: start / end;

  ${({ theme: { mq } }) => mq.smallTablet} {
    font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};
  }
`;

const InfoBox = styled.div`
  margin: 0 auto;
  background-color: ${({ theme: { color } }) => color.bgSecondary};
  padding: 3rem 8.5rem;
  width: fit-content;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  border-radius: 5px;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};

  ${({ theme: { mq } }) => mq.smallTablet} {
    padding: 3rem 2rem;
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20%;
  grid-column: 1 / -1 !important;
  height: 20rem;
  background: ${({ theme: { color } }) => color.primary};
  background-image: url(${pattern});
  background-position: bottom left;

  > * {
    color: ${({ theme: { color } }) => color.tertiaryFont} !important;
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-evenly;
    padding: 0 2rem;
    text-align: center;
    height: 30rem;
  }
`;

const HomePageBody = () => (
  <BodyWrapper>
    <HomePageFeaturesSection />
    <HomePageDetailsSection />
    <Banner>
      <Logo />
      <h3>Are you ready to get started?</h3>
      <NavLink path={routes.register}>Register now!</NavLink>
    </Banner>
    <RevertPatternSection patternUrl={pattern}>
      <StyledBodyHeading>IMPORTANT!</StyledBodyHeading>
      <InfoBox>
        This app was created for learning purpuses. Please do not use it to
        issue real inovice or to keep real customer data!
      </InfoBox>
    </RevertPatternSection>
  </BodyWrapper>
);

export default HomePageBody;
