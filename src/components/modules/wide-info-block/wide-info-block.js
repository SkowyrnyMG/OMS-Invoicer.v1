import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 5rem [start] repeat(2, 1fr) [end] 5rem;
  grid-column: 1 / -1 !important;
  grid-gap: 3%;
  grid-row-gap: 5%;
  min-height: 60rem;
  background-color: ${({ isCounterEven, theme: { color } }) =>
    isCounterEven ? color.bg : color.transparentMain};
  margin: 0;
  padding-top: 10rem;

  > * {
    grid-column: start / end;
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    grid-template-columns: [start] 1fr [end];
    padding: 2rem;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10rem;
  text-align: center;
  align-items: center;

  ${({ theme: { mq } }) => mq.bigTablet} {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    position: relative;
    padding-top: 15rem;
  }
`;

const StyledHeading = styled.h3`
  position: relative;
  margin: ${({ image }) => (image ? '10rem 0' : '0')};
  width: fit-content;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingSmall};

  ${({ theme: { mq } }) => mq.smallTablet} {
    position: static;
  }
`;

const Counter = styled.div`
  position: absolute;

  line-height: 1;
  top: 0;
  left: 0;
  font-size: ${({ theme: { fontSize } }) => fontSize.headingBig};
  color: ${({ theme: { color } }) => color.transparentMain};
  transform: translate(-100%, -50%);
  z-index: 0;

  svg {
    position: absolute;
    width: 70px;
    fill: ${({ theme: { color } }) => color.primary};
    left: 0;
    top: 50%;
    transform: translate(-50%, -30%);
  }

  ${({ theme: { mq } }) => mq.smallTablet} {
    font-size: ${({ theme: { fontSize } }) => fontSize.headingBig};
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const StyledImg = styled.img`
  width: 70%;
  margin-bottom: 5rem;
`;

const RightSide = styled.div`
  text-align: left;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: calc(15rem + 3%);

  ${({ theme: { mq } }) => mq.smallTablet} {
    padding-left: 0;
    align-items: center;
  }
`;

const WideInfoBlock = ({ image, Icon, counter, title, children }) => {
  const [isCounterEven] = useState(counter % 2 === 0);
  return (
    <Wrapper isCounterEven={isCounterEven}>
      <ContentWrapper>
        <LeftSide>
          <StyledHeading image={image}>
            <Counter>
              <Icon />
              {counter}
            </Counter>
            {title}
          </StyledHeading>
          {image && <StyledImg src={image} alt='position image' />}
        </LeftSide>
        <RightSide>{children}</RightSide>
      </ContentWrapper>
    </Wrapper>
  );
};

WideInfoBlock.defaultProps = {
  image: '',
};

WideInfoBlock.propTypes = {
  image: PropTypes.string,
  Icon: PropTypes.shape({}).isRequired,
  counter: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

export default WideInfoBlock;
