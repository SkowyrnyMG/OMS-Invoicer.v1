import React, { useState } from 'react';
import styled from 'styled-components';
import { useCombobox } from 'downshift';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const StyledList = styled.ul`
  position: absolute;
  max-height: 25rem;
  padding: 2rem;
  list-style: none;
  overflow-y: auto;
  background: ${({ theme: { color } }) => color.bg};
  box-shadow: ${({ theme: { shadow } }) => shadow.bottom};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  z-index: 1000;
`;

const StyledListItem = styled.li`
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 3rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.ms};
`;

const ComboBtnWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledComboButton = styled.button`
  padding: 0.2rem;
  width: 5rem;
  height: 2rem;
  border: 2px solid ${({ theme: { color } }) => color.primary};
  background: none;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 2rem;
  }
`;

const NotFoundInfo = styled.div`
  opacity: ${({ isNotFoundVisible }) => (isNotFoundVisible ? 1 : 0)};
  display: ${({ isNotFoundVisible }) => (isNotFoundVisible ? 'auto' : 'none')};
`;

const ComboboxMenu = ({ items, handleSetItemFn, handleResetItemFn }) => {
  const [inputItems, setInputItems] = useState(items);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);
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

      setIsNotFoundVisible(false);
      setInputItems(filteredItems);
      if (!filteredItems.length) {
        setIsNotFoundVisible(true);
      }
    },
  });

  const handleSearchClick = () => {
    handleSetItemFn(selectedItem);
    console.log(selectedItem);
  };

  return (
    <Wrapper>
      <label {...getLabelProps()}>Choose a Customer:</label>
      <div {...getComboboxProps()}>
        <StyledInput {...getInputProps()} />
        <ComboBtnWrapper>
          <StyledComboButton
            type='button'
            {...getToggleButtonProps()}
            aria-label='toggle menu'
          >
            {isOpen ? 'Hide' : 'Show'}
          </StyledComboButton>
          <StyledComboButton type='button' onClick={handleSearchClick}>
            Accept
          </StyledComboButton>
          <StyledComboButton type='button' onClick={handleResetItemFn}>
            Reset
          </StyledComboButton>
        </ComboBtnWrapper>
      </div>
      <StyledList isOpen={isOpen} {...getMenuProps()}>
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
      </StyledList>
    </Wrapper>
  );
};

export default ComboboxMenu;
