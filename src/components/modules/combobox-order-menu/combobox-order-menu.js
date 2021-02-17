import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCombobox } from 'downshift';

import ComboButton from 'components/atoms/combo-button/combo-button';
import ComboList from 'components/atoms/combo-list/combo-list';
import ComboInput from 'components/atoms/combo-input/combo-input';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const StyledListItem = styled.li`
  cursor: pointer;
`;

const ComboBtnWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const NotFoundInfo = styled.div`
  opacity: ${({ isNotFoundVisible }) => (isNotFoundVisible ? 1 : 0)};
  display: ${({ isNotFoundVisible }) => (isNotFoundVisible ? 'auto' : 'none')};
`;

const ComboboxOrderMenu = ({ items, handleSetItemFn, handleResetItemFn }) => {
  const [inputItems, setInputItems] = useState(items);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);
  const [isResultArrEmpty, setIsResultArrEmpty] = useState(true);
  const itemToString = (item) =>
    item ? `${item.vat_number} - ${item.name}` : '';
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    selectedItem,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = items.filter((item) => {
        const searchResult = `${item.vat_number} - ${item.name}`;
        return (
          item.vat_number.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          searchResult.toLowerCase().match(inputValue.toLowerCase())
        );
      });
      setIsResultArrEmpty(filteredItems.length === 0);
      setIsNotFoundVisible(false);
      setInputItems(filteredItems);
      if (!filteredItems.length) {
        setIsNotFoundVisible(true);
      }
    },
  });

  const handleSearchClick = () => {
    handleSetItemFn(selectedItem);
  };

  const handleResetClick = () => {
    handleResetItemFn();
    selectItem(null);
  };

  return (
    <Wrapper data-testid='combobox-order-menu'>
      <label {...getLabelProps()}>Choose a Customer:</label>
      <div {...getComboboxProps()}>
        <ComboInput {...getInputProps()} placeholder='Type a Customer name..' />
        <ComboBtnWrapper>
          <ComboButton
            type='button'
            {...getToggleButtonProps()}
            aria-label='toggle menu'
          >
            {isOpen ? 'Hide' : 'Show'}
          </ComboButton>
          <ComboButton type='button' onClick={handleSearchClick}>
            Accept
          </ComboButton>
          <ComboButton type='button' onClick={handleResetClick}>
            Reset
          </ComboButton>
        </ComboBtnWrapper>
      </div>
      <ComboList
        isResultArrEmpty={isResultArrEmpty}
        isOpen={isOpen}
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <StyledListItem
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item.vat_number}`}
              {...getItemProps({ item, index })}
            >
              {`${item.vat_number} - ${item.name}`}
            </StyledListItem>
          ))}
        <NotFoundInfo isNotFoundVisible={isNotFoundVisible}>
          Nothing found...
        </NotFoundInfo>
      </ComboList>
    </Wrapper>
  );
};

ComboboxOrderMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSetItemFn: PropTypes.func.isRequired,
  handleResetItemFn: PropTypes.func.isRequired,
};

export default ComboboxOrderMenu;
