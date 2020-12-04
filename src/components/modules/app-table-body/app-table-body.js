import React from 'react';
import styled from 'styled-components';
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useSortBy,
} from 'react-table';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  height: 5rem;
  background: ${({ theme: { color } }) => color.bgSecondary};
  border-radius: 0.5rem;
  box-shadow: ${({ theme: { shadow } }) => shadow.around};
`;

const StyledSearchIcon = styled(SearchIcon)`
  margin-left: 2.5rem;
  height: 2rem;
  fill: ${({ theme: { color } }) => color.secondaryFont};
`;

const StyledSearchInput = styled.input`
  margin-left: 1rem;
  width: 50%;
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  outline: none;
  border: none;
  border-bottom: 2px solid ${({ theme: { color } }) => color.devider};
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;

  thead {
    background: ${({ theme: { color } }) => color.primary};
    color: ${({ theme: { color } }) => color.tertiaryFont};
    border: none;
  }

  td:not(:last-child),
  thead tr th:not(:last-child) {
    padding: 0.2rem;
    border-right: 1px solid ${({ theme: { color } }) => color.devider};
  }

  td,
  th {
    cursor: pointer;
  }

  td {
    padding: 0.3rem 1rem !important;
  }

  tbody * {
    border-bottom: 1px solid ${({ theme: { color } }) => color.devider} !important;
  }
`;

const AppTableBody = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected,
    toggleAllRowsSelected,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );

  const { globalFilter } = state;

  const handleClick = (rowId) => {
    toggleAllRowsSelected(false);
    toggleRowSelected(rowId);
  };
  return (
    <Wrapper>
      <SearchBox>
        <StyledSearchIcon />
        <StyledSearchInput
          type='text'
          placeholder='Search'
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </SearchBox>
      <AppBodyContainer>
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key='Headers'>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ⬇️'
                          : ' ⬆️'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr
                  key='rows'
                  {...row.getRowProps({
                    style: {
                      backgroundColor: row.isSelected ? '#446DF644' : '',
                      color: row.isSelected ? '#000' : '',
                    },
                  })}
                  onClick={() => {
                    handleClick(row.id);
                  }}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
        <span>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            0
          )}
        </span>
      </AppBodyContainer>
    </Wrapper>
  );
};

export default AppTableBody;
