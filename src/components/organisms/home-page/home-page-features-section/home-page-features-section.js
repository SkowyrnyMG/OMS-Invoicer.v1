import React from 'react';
import styled from 'styled-components';

import PatternSection from 'components/atoms/pattern-section/pattern-section';
import Feature from 'components/modules/feature/feature';
import pattern from 'assets/images/bg-pattern.png';

import { featuresContent } from './features-content';

const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
  ${({ theme: { mq } }) => mq.bigTablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme: { mq } }) => mq.bigPhoneBreak} {
    grid-template-columns: 1fr;
    margin-bottom: 40rem;
  }
`;

const FeatureInfo = styled.div`
  width: 65vw;

  > * {
    margin-bottom: 5rem;
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    width: 100%;
    grid-column: 1 / -1;
    padding: 0 2rem;
  }
`;

const HomePageFeaturesSection = () => (
  <PatternSection patternUrl={pattern}>
    <FeatureInfo>
      <h2>6 reasons to choose OMS invoicer</h2>
      <p>
        OMS is here for you! Adding customer, orders and invoices never been
        easier! Typos and simple mistakes on your invoices will never trouble
        you again! All customer data can be fetched from VIES database!
      </p>
    </FeatureInfo>
    <FeatureWrapper>
      {featuresContent.map(({ title, icon }, index) => (
        <Feature title={title} counter={index + 1} key={title}>
          {icon}
        </Feature>
      ))}
    </FeatureWrapper>
  </PatternSection>
);

export default HomePageFeaturesSection;
