import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCombobox } from 'downshift';

import ComboButton from 'components/atoms/combo-button/combo-button';
import ComboList from 'components/atoms/combo-list/combo-list';
import ComboInput from 'components/atoms/combo-input/combo-input';

const Wrapper = styled.div`
  grid-column: 1 / -1 !important;
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

const ComboboxInvoiceMenu = ({ items, handleSetItemFn, handleResetItemFn }) => {
  const [inputItems, setInputItems] = useState(items);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);
  const itemToString = (item) =>
    item
      ? `${item.order_number} - ${item.price} ${item.currency} - ${item.customer_name}`
      : '';
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
      console.log(items);
      if (items) {
        const filteredItems = items.filter((item) => {
          const searchResult = `${item.order_number} - ${item.price} ${item.currency} - ${item.customer_name}`;
          return (
            item.customer_vat
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            item.customer_name
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            item.order_number
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            searchResult.toLowerCase().match(inputValue.toLowerCase()) ||
            inputValue === ''
          );
        });

        setIsNotFoundVisible(false);
        setInputItems(filteredItems);
      }
      if (!items.length || (!items.length && inputValue === '')) {
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
    <Wrapper data-testid='combobox-invoice-menu'>
      <label {...getLabelProps()}>Choose a finished order:</label>
      <div {...getComboboxProps()}>
        <ComboInput
          {...getInputProps()}
          placeholder='Provide order number or company name'
        />
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
      <ComboList isOpen={isOpen} {...getMenuProps()}>
        {inputItems.map((item, index) => (
          <StyledListItem
            style={
              highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
            }
            key={`${item.order_number}`}
            {...getItemProps({ item, index })}
          >
            {`${item.order_number} - ${item.price} ${item.currency} - ${item.customer_name}`}
          </StyledListItem>
        ))}
        <NotFoundInfo isNotFoundVisible={isNotFoundVisible}>
          Nothing found...
        </NotFoundInfo>
      </ComboList>
    </Wrapper>
  );
};

ComboboxInvoiceMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSetItemFn: PropTypes.func.isRequired,
  handleResetItemFn: PropTypes.func.isRequired,
};

export default ComboboxInvoiceMenu;
