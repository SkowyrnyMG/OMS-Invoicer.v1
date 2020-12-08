import React from 'react';
import styled from 'styled-components';
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useBlockLayout,
  useResizeColumns,
} from 'react-table';

import AppBodyContainer from 'components/atoms/app-body-container/app-body-container';
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';
import { ReactComponent as LeftArrow } from 'assets/svg/larr-icon.svg';
import { ReactComponent as RightArrow } from 'assets/svg/rarr-icon.svg';

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
    position: relative;
    cursor: pointer;
  }

  td {
    padding: 0.3rem 1rem !important;
    overflow-x: hidden;
  }

  tbody * {
    border-bottom: 1px solid ${({ theme: { color } }) => color.devider} !important;
  }
`;

const PaginatonNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-self: center;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  :disabled {
    pointer-events: none;
  }

  svg {
    padding: 0 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme: { color } }) => color.transparentMain};
    transition: 0.25s all;
  }

  :hover svg {
    fill: ${({ theme: { color } }) => color.primary};
  }

  :active svg {
    transform: translateY(2px);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.25rem;
  border: 1px solid ${({ theme: { color } }) => color.transparentMain};
  border-radius: 0.5rem;
  transition: 0.25s all;

  ::after {
    content: '';
    position: absolute;
    display: block;
    right: 5%;
    top: 50%;
    width: 1rem;
    height: 1rem;
    background: ${({ theme: { color } }) => color.transparentMain};
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    transform: translateY(-50%);
    z-index: 300;
    transition: 0.25s all;
  }

  :hover {
    border-color: ${({ theme: { color } }) => color.primary};
    ::after {
      background: ${({ theme: { color } }) => color.primary};
    }
  }

  :active ::after {
    background: #000;
  }
`;

const StyledSelect = styled.select`
  padding: 0.1rem;
  width: 100%;
  appearance: none;
  background: none;
  border: none;
  outline: none;

  option * {
    width: 100%;
  }
`;

const Resizer = styled.div`
  position: absolute;
  display: block;
  width: 30px;
  height: 100%;
  top: 0;
  right: 0;
  transform: translateX(50%);
  z-index: 5000 !important;
`;

const AppTableBody = ({ columns, data, defaultColumn }) => {
  const initialState = React.useMemo(
    () => ({
      pageSize: 25,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected,
    toggleAllRowsSelected,
    state,
    setGlobalFilter,
    page,
    setPageSize,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState,
      defaultColumn,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useBlockLayout,
    useResizeColumns
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const pageSizeOptions = [25, 50, 100];

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
                    <Resizer
                      {...column.getResizerProps({
                        onClick(ev) {
                          ev.stopPropagation();
                        },
                      })}
                    />
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
            {page.map((row) => {
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
                    <td
                      {...cell.getCellProps()}
                      key={`${cell.column.id}-${cell.row.id}`}
                    >
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
      <PaginatonNavWrapper>
        <div>
          <StyledButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <LeftArrow />
          </StyledButton>
          <span>
            <strong>
              {` ${pageSize * (pageIndex + 1)} / ${
                pageOptions.length * pageSize
              } `}
            </strong>
          </span>
          <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>
            <RightArrow />
          </StyledButton>
        </div>
        <SelectWrapper>
          <StyledSelect
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((pageSizeSetter) => (
              <option value={pageSizeSetter} key={pageSizeSetter}>
                {pageSizeSetter}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>
      </PaginatonNavWrapper>
    </Wrapper>
  );
};

export default AppTableBody;
