import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';
import Input from 'components/atoms/input/input';
import Button from 'components/atoms/button/button';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  align-items: center;
  margin-bottom: 5rem;
`;
const StyledParagraph = styled.p`
  grid-column: -1 / 1;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;

const StyledButton = styled(Button)`
  grid-column: 3 / 4;
  width: fit-content;
  height: fit-content;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledInput = styled(Input)`
  grid-column: 1 / 3;
`;

const ViesSearchInput = ({ newValues }) => {
  const handleViesSubmit = () => {
    newValues({
      nameOfCompany: '',
    });
  };

  return (
    <Wrapper>
      <StyledParagraph>
        Put VAT Number below and search customer details in VIES database
      </StyledParagraph>
      <StyledInput placeholder='Search in VIES' />
      <StyledButton type='button' onClick={() => handleViesSubmit()}>
        <SearchIcon />
      </StyledButton>
    </Wrapper>
  );
};

ViesSearchInput.propTypes = {
  newValues: PropTypes.func.isRequired,
};

export default ViesSearchInput;
