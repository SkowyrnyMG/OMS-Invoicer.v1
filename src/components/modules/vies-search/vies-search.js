import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Button from 'components/atoms/button/button';
import Input from 'components/atoms/input/input';
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';

import { COUNTRY_CODES } from 'utils/constant-data';
import {
  setLoadingOn,
  setLoadingOff,
} from 'store/slices/loading-slice/loading-slice';

const ViesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  align-items: center;
  margin-bottom: 5rem;
`;
const StyledParagraph = styled.p`
  grid-column: -1 / 1;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  color: ${({ theme: { color }, isNoError }) => !isNoError && color.error};
`;

const StyledViesButton = styled(Button)`
  grid-column: 3 / 4;
  width: fit-content;
  height: fit-content;

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme: { color } }) => color.bg};
    pointer-events: none;
  }
`;

const StyledInput = styled(Input)`
  grid-column: 1 / 3;
`;

const ViesSearch = ({
  setValidation,
  isValid,
  setInitialsFn,
  setQueryVat,
  queryVat,
  setQueryCountryCode,
  queryCountryCode,
}) => {
  const dispatch = useDispatch();

  const handleViesClick = async () => {
    dispatch(setLoadingOn());
    // * get request to the local lambda funciton. Query string params are later beeing used to get response from vies
    const result = await axios.get(
      `/api/verify?vat=${queryVat}&countrycode=${queryCountryCode}`,
    );
    const {
      data: { data },
    } = result;
    // console.log(result);
    dispatch(setLoadingOff());
    if (!data) {
      setValidation(false);
      return;
    }

    if (data.valid) {
      const { address } = data;
      setValidation(true);

      // * sometimes data from vies response is not fully complete and it returns --- instead. Without below conditinals app would crash on try to split ---.
      const splittedAddres = address !== '---' ? address.split(',') : '---';
      const streetVies = address !== '---' ? splittedAddres[0] : '---';
      const postCodeVies =
        address !== '---'
          ? splittedAddres[1].split(' ')[1].replace('-', '')
          : '---';
      const townVies =
        address !== '---' ? splittedAddres[1].split(' ')[2] : '---';

      setInitialsFn((state) => ({
        ...state,
        name: data.name,
        vat_number: data.countryCode + data.vatNumber,
        country: data.countryCode,
        town: townVies,
        street: streetVies,
        postCode: data.countryCode + postCodeVies,
      }));
    }

    if (!data.valid) {
      setValidation(false);
    }
  };

  return (
    <ViesWrapper data-testid='vies-search'>
      <StyledParagraph isNoError>
        Put VAT Number below and search customer details in VIES database
      </StyledParagraph>
      <select
        name='countryCode'
        onChange={(e) => setQueryCountryCode(e.target.value)}
        defaultValue='PL'
      >
        {COUNTRY_CODES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <StyledInput
        placeholder='Search in VIES'
        value={queryVat}
        onChange={(e) => setQueryVat(e.target.value)}
      />
      <StyledViesButton type='button' onClick={() => handleViesClick('verify')}>
        <SearchIcon />
      </StyledViesButton>
      {!isValid && (
        <StyledParagraph isNoError={isValid}>
          Your customer&apos;s VAT number is not valid/active!
        </StyledParagraph>
      )}
    </ViesWrapper>
  );
};

ViesSearch.propTypes = {
  setValidation: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  setInitialsFn: PropTypes.func.isRequired,
  setQueryVat: PropTypes.func.isRequired,
  queryVat: PropTypes.string.isRequired,
  setQueryCountryCode: PropTypes.func.isRequired,
  queryCountryCode: PropTypes.string.isRequired,
};

export default ViesSearch;
