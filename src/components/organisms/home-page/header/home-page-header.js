import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import HeadingBg from 'assets/images/main-bg.webp';
import { routes } from 'utils/routes';

const HeaderWrapper = styled.header`
  grid-column: 1 / -1 !important;
`;
const HeadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(
      circle at 100%,
      transparent 0%,
      rgba(0, 0, 0, 1) 90%
    ),
    url(${HeadingBg});
  background-position: right;
  min-height: 72.5rem;
`;

const StyledHeading = styled.h1`
  color: ${({ theme: { color } }) => color.mainFont};
  margin: 2rem 0;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};
  text-align: center;
`;

const CtaLink = styled(Link)`
  padding: 2rem 3rem;
  background-color: ${({ theme: { color } }) => color.danger};
  color: ${({ theme: { color } }) => color.tertiaryFont};
  border-radius: 5px;
  transition: all 0.25s;

  :hover {
    color: ${({ theme: { color } }) => color.mainFont};
    background-color: ${({ theme: { color } }) => color.error};
  }
`;

const HomePageHeader = () => (
  <HeaderWrapper>
    <StyledHeading>
      Better way to organize your orders and invoices!
    </StyledHeading>
    <HeadingContent>
      <CtaLink to={routes.register}>
        TRY FOR FREE AND SEND ME SOME FEEDBACK
      </CtaLink>
    </HeadingContent>
  </HeaderWrapper>
);

export default HomePageHeader;
