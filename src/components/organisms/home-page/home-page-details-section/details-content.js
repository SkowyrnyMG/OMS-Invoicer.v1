import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OkIcon } from 'assets/svg/ok-icon.svg';
import { ReactComponent as CashIcon } from 'assets/svg/cash-icon.svg';
import { ReactComponent as DashboardIcon } from 'assets/svg/dashboard-icon.svg';
import ViesVerificationImg from 'assets/images/homepage-body-1.jpg';
import DashboardImg from 'assets/images/homepage-body-2.jpg';

const StyledList = styled.ol`
  padding: 1rem;
  margin-left: 5rem;
  margin-bottom: 5rem;
`;

export const detailsContent = [
  {
    title: 'Customers details in one place',
    icon: ClientsIcon,
    body: (
      <p>
        Keep your customers details in one place. Address, VAT number, e-mail
        address and many more can be stored directly in customer cards!
        <br />
        <br />
        No matter how many customers your database will contain.
        <br />
        <b> Quick search </b>
        in customer module gives you possibility to find any of them within a
        few seconds!
      </p>
    ),
  },
  {
    title: 'Take control over your orders',
    icon: OrdersIcon,
    body: (
      <p>
        Keep all of your
        <b> orders under control! </b>
        <br />
        <br />
        You can now create orders for customers present in your database.
        Statuses will help with tracking progress on each individual order.
      </p>
    ),
  },
  {
    title: 'Easy invoicing',
    icon: InvoiceIcon,
    body: (
      <p>
        Invoicing has
        <b> never been that easy!</b>
        <br />
        <br />
        Issue new invoice with just few mouse clicks. OMS invoicer will take all
        of neccesary data from orders and provide them on your bill! One thing
        that user has to do by himself is just to accept draft and print the
        invoice!
      </p>
    ),
  },
  {
    title: 'Instant VIES verification',
    icon: OkIcon,
    image: ViesVerificationImg,
    body: (
      <>
        <p>
          Adding new customer by hand is just a relic of the past. With OMS you
          can fetch most important details about your customers directly from
          VIES database. To do that you just have to provide country prefix and
          new customer VAT EU number into invoices modal.
          <br />
          <b>What benefints do you have using VIES autofil?</b>
        </p>
        <StyledList>
          <li>Save your time!</li>
          <li>Avoid mistakes!</li>
          <li>
            You will be always sure that your new customer have active VAT
            number
          </li>
          <li>It is just easier to do!</li>
        </StyledList>
        <span>Do not wait! Try it on your own!</span>
      </>
    ),
  },
  {
    title: 'Keep your payments under control',
    icon: CashIcon,
    body: (
      <p>
        Who did not have a problem with
        <b> untracked delayed payments? </b>
        <br />
        <br />
        Thanks to invoice module you can mark which invoices are paid! By using
        search field you can also quickly filter all unpaid invoices to start
        collect your liabilities!
      </p>
    ),
  },
  {
    title: 'Useful dashboard notifications',
    image: DashboardImg,
    icon: DashboardIcon,
    body: (
      <>
        <p>
          To wrap everyting in one place our dashbord will display most
          important informations. For example
        </p>
        <StyledList>
          <li>Unpaid invoices</li>
          <li>Finished orders without invoice</li>
          <li>Pending orders</li>
          <li>Quick app nav</li>
        </StyledList>
        <p>.. and much more!</p>
      </>
    ),
  },
];
