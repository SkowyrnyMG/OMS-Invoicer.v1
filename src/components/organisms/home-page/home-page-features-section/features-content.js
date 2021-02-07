import React from 'react';

import { ReactComponent as ClientsIcon } from 'assets/svg/clients-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/svg/orders-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/svg/invoice-icon.svg';
import { ReactComponent as OkIcon } from 'assets/svg/ok-icon.svg';
import { ReactComponent as CashIcon } from 'assets/svg/cash-icon.svg';
import { ReactComponent as DashboardIcon } from 'assets/svg/dashboard-icon.svg';

export const featuresContent = [
  {
    title: 'Customers details in one place',
    icon: <ClientsIcon />,
  },
  {
    title: 'Take control over your orders',
    icon: <OrdersIcon />,
  },
  {
    title: 'Easy invoicing',
    icon: <InvoiceIcon />,
  },
  {
    title: 'Instant VIES verification',
    icon: <OkIcon />,
  },
  {
    title: 'Keep your payments under control',
    icon: <CashIcon />,
  },
  {
    title: 'Useful dashboard notifications',
    icon: <DashboardIcon />,
  },
];
