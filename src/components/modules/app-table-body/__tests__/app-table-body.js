import React from 'react';

import {
  renderWithReduxRouter,
  screen,
  fireEvent,
  leftClick,
  cleanup,
} from 'utils/tests/test-helper';
import AppTableBody from '../app-table-body';

const TEST_COLUMNS = [
  {
    Header: 'TEST1',
    accessor: 'test1',
  },
  {
    Header: 'TEST2',
    accessor: 'test2',
  },
  {
    Header: 'TEST3',
    accessor: 'test3',
  },
];

const TEST_DATA = [
  {
    test1: 'test1 value',
    test2: 'test2 value',
    test3: 'test3 value',
  },
];

const TEST_DEFAULT_COLUMN = {
  minWidth: 20,
  width: 20,
  maxWidth: 20,
};

const sortArrowCheck = (
  tableHeader,
  upArrowNode,
  downArrowNode,
  upArrowSvg,
  downArrowSvg,
) => {
  let upArrowNodeClone = upArrowNode;
  let downArrowNodeClone = downArrowNode;

  expect(upArrowNodeClone).toBeNull();
  expect(downArrowNodeClone).toBeNull();

  fireEvent.click(tableHeader, leftClick);
  upArrowNodeClone = screen.queryByText(upArrowSvg);
  downArrowNodeClone = screen.queryByText(downArrowSvg);
  expect(upArrowNodeClone).toBeInTheDocument();
  expect(downArrowNodeClone).toBeNull();

  fireEvent.click(tableHeader, leftClick);
  upArrowNodeClone = screen.queryByText(upArrowSvg);
  downArrowNodeClone = screen.queryByText(downArrowSvg);
  expect(downArrowNodeClone).toBeInTheDocument();
  expect(upArrowNodeClone).toBeNull();

  fireEvent.click(tableHeader, leftClick);
  upArrowNodeClone = screen.queryByText(upArrowSvg);
  downArrowNodeClone = screen.queryByText(downArrowSvg);
  expect(downArrowNodeClone).toBeNull();
  expect(upArrowNodeClone).toBeNull();
};

describe('AppTableBody', () => {
  test('should display in the document with correct styles and correct data in columns', () => {
    renderWithReduxRouter(
      <AppTableBody
        columns={TEST_COLUMNS}
        data={TEST_DATA}
        defaultColumn={TEST_DEFAULT_COLUMN}
        setCurrentPosValues={(row) => console.log(row)}
      />,
    );

    const AppTableBodyComponent = screen.getByTestId('app-table-body');
    const TableBody = screen.getByRole('row', {
      name: 'test1 value test2 value test3 value',
    });

    expect(AppTableBodyComponent).toBeInTheDocument();
    expect(AppTableBodyComponent).toMatchSnapshot();
    expect(TableBody).toBeInTheDocument();
  });

  test('should not display any table rows when data is not provided', () => {
    renderWithReduxRouter(
      <AppTableBody
        columns={TEST_COLUMNS}
        data={[]}
        defaultColumn={TEST_DEFAULT_COLUMN}
        setCurrentPosValues={(row) => console.log(row)}
      />,
    );

    const TableBody = screen.queryByRole('row', {
      name: 'test1 value test2 value test3 value',
    });

    expect(TableBody).toBeNull();
  });

  test('should conditionaly display sort arrows next to th name when clicked', () => {
    renderWithReduxRouter(
      <AppTableBody
        columns={TEST_COLUMNS}
        data={TEST_DATA}
        defaultColumn={TEST_DEFAULT_COLUMN}
        setCurrentPosValues={(row) => console.log(row)}
      />,
    );
    const firstTableHeader = screen.getByText('TEST1');
    const secondTableHeader = screen.getByText('TEST2');
    const thirdTableHeader = screen.getByText('TEST3');
    const upArrow = screen.queryByText('up-arrow-icon.svg');
    const downArrow = screen.queryByText('down-arrow-icon.svg');

    sortArrowCheck(
      firstTableHeader,
      upArrow,
      downArrow,
      'up-arrow-icon.svg',
      'down-arrow-icon.svg',
    );

    sortArrowCheck(
      secondTableHeader,
      upArrow,
      downArrow,
      'up-arrow-icon.svg',
      'down-arrow-icon.svg',
    );

    sortArrowCheck(
      thirdTableHeader,
      upArrow,
      downArrow,
      'up-arrow-icon.svg',
      'down-arrow-icon.svg',
    );
    cleanup();
  });
});
