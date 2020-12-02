import React from 'react';
import styled from 'styled-components';

import ShortcutBox from 'components/modules/shortcut-box/shortcut-box';
import { ReactComponent as NewInvoiceIcon } from 'assets/svg/new-invoice-icon.svg';
import { ReactComponent as NewOrderIcon } from 'assets/svg/new-order-icon.svg';
import { ReactComponent as NewCustomerIcon } from 'assets/svg/new-client-icon.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;

  > *:not(:last-child) {
    margin-right: 7.5rem;
  }
`;

const shortcutDetails = [
  {
    title: 'NEW INVOICE',
    desc: 'issue invoice from order or create custom one',
    comp: <NewInvoiceIcon />,
  },
  {
    title: 'NEW ORDER',
    desc: 'create new order and keep an eye on it’s progress',
    comp: <NewOrderIcon />,
  },
  {
    title: 'NEW CUSTOMER',
    desc: 'add new customer details from VIES or fill the form manualy',
    comp: <NewCustomerIcon />,
  },
];

const QuickNavigation = () => (
  <Wrapper>
    {shortcutDetails.map(({ title, desc, comp }) => (
      <ShortcutBox title={title} description={desc} key={title}>
        {comp}
      </ShortcutBox>
    ))}
  </Wrapper>
);

export default QuickNavigation;
