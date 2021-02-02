import React, { useState } from 'react';
import styled from 'styled-components';

import ShortcutBox from 'components/modules/shortcut-box/shortcut-box';
import { ReactComponent as NewInvoiceIcon } from 'assets/svg/new-invoice-icon.svg';
import { ReactComponent as NewOrderIcon } from 'assets/svg/new-order-icon.svg';
import { ReactComponent as NewCustomerIcon } from 'assets/svg/new-client-icon.svg';

import OrderControlModal from 'components/organisms/order-control-modal/order-control-modal';
import InvoiceControlModal from 'components/organisms/invoice-control-modal/invoice-control-modal';
import CustomerControlModal from 'components/organisms/customer-control-modal/customer-control-modal';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;

  > *:not(:last-child) {
    margin-right: 7.5rem;
  }
`;

const QuickNavigation = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  return (
    <Wrapper>
      {isOrderModalOpen && (
        <OrderControlModal
          closeModal={() => setIsOrderModalOpen(false)}
          currentOrder={null}
        />
      )}
      {isCustomerModalOpen && (
        <CustomerControlModal
          closeModal={() => setIsCustomerModalOpen(false)}
          currentCustomer={null}
        />
      )}
      {isInvoiceModalOpen && (
        <InvoiceControlModal
          closeModal={() => setIsInvoiceModalOpen(false)}
          currentInvoice={null}
        />
      )}
      <ShortcutBox
        title='NEW CUSTOMER'
        description='add new customer details from VIES or fill the form manualy'
        openOrderModal={() => setIsCustomerModalOpen(true)}
      >
        <NewCustomerIcon />
      </ShortcutBox>
      <ShortcutBox
        title='NEW ORDER'
        description='create new order and keep an eye on it’s progress'
        openOrderModal={() => setIsOrderModalOpen(true)}
      >
        <NewOrderIcon />
      </ShortcutBox>
      <ShortcutBox
        title='NEW INVOICE'
        description='issue invoice from order or create custom one'
        openOrderModal={() => setIsInvoiceModalOpen(true)}
      >
        <NewInvoiceIcon />
      </ShortcutBox>
      {/* {shortcutDetails.map(({ title, desc, comp }) => (
        <ShortcutBox title={title} description={desc} key={title}>
          {comp}
        </ShortcutBox>
      ))} */}
    </Wrapper>
  );
};

export default QuickNavigation;
