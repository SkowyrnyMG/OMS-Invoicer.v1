import React, { useState } from 'react';
import { useCombobox } from 'downshift';

const ComboboxMenu = ({ items, handleSetItemFn }) => {
  const [inputItems, setInputItems] = useState(items);
  const itemToString = (item) =>
    item ? `${item.name} ${item.vat_number}` : '';
  const {
    isOpen,
    inputValue: input,
    openMenu,
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
      setInputItems(
        items.filter(
          (item) =>
            item.vat_number.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  const handleSearchClick = () => {
    handleSetItemFn(selectedItem);
    console.log(selectedItem);
  };

  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            onFocus: () => {
              if (!isOpen) {
                openMenu();
              }
            },
          })}
        />
        <button
          type='button'
          {...getToggleButtonProps()}
          aria-label='toggle menu'
        >
          {isOpen ? 'hide' : 'show'}
        </button>
        <button type='button' onClick={handleSearchClick}>
          Action
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item.vat_number}`}
              {...getItemProps({ item, index })}
            >
              {item.vat_number + item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ComboboxMenu;
