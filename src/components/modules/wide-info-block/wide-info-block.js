import React from 'react';
import styled from 'styled-components';

import ViesVerificationImg from 'assets/images/homepage-body-1.jpg';

const Wrapper = styled.div`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 5rem [start] repeat(2, 1fr) [end] 5rem;
  grid-column: 1 / -1 !important;
  grid-gap: 3%;
  grid-row-gap: 5%;
  min-height: 60rem;
  background-color: ${({ theme: { color } }) => color.transparentMain};
  margin: 0 0 20rem;
  padding-top: 10rem;

  > * {
    grid-column: start / end;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10rem;
  justify-items: center;
  text-align: center;
  align-items: center;
`;

const StyledHeading = styled.h3`
  margin-bottom: 5rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};
`;

const StyledImg = styled.img`
  width: 100%;
`;

const RightSide = styled.div`
  text-align: left;
  ol {
    padding: 1rem;
    margin-left: 5rem;
    margin-bottom: 5rem;
  }
`;

const StyledParagraph = styled.p``;

const WideInfoBlock = () => (
  <Wrapper>
    <ContentWrapper>
      <div>
        <StyledHeading>VIES database integration!</StyledHeading>
        <StyledImg src={ViesVerificationImg} alt='VIES VERIFICATION' />
      </div>
      <RightSide>
        <StyledParagraph>
          Adding new customer by head is just a relic of past. With OMS you can
          fetch most important details about your customers directly from VIES
          database. To do that you have to just provide country prefix and new
          customer VAT EU number into invoices modal.
          <br />
          <b>What benefints do you have using VIES autofil?</b>
        </StyledParagraph>
        <ol>
          <li>Save your time!</li>
          <li>Avoid mistakes!</li>
          <li>
            You will be always sure if your new customer have active VAT number
          </li>
          <li>It is just easier to do!</li>
        </ol>
        <span>Do not wait! Try it on your own!</span>
      </RightSide>
    </ContentWrapper>
  </Wrapper>
);

export default WideInfoBlock;
