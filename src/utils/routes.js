import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from 'store/slices/auth-slice/auth-slice';

import App from 'views/app/app';
import Home from 'views/home';
import Login from 'views/login';
import Register from 'views/register';
import Invoices from 'views/app/invoices';
import Orders from 'views/app/orders';
import Payments from 'views/app/payments';
import Customers from 'views/app/customers';
import Helpdesk from 'views/app/helpdesk';
import Settings from 'views/app/settings';

export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  app: '/app',
  appInvoices: '/app/invoices',
  appPayments: '/app/payments',
  appOrders: '/app/orders',
  appCustomers: '/app/customers',
  appHelp: '/app/help',
  appSettings: '/app/settings',
};

export const AppRouter = () => {
  const userInfo = useSelector(getUserData);

  return (
    <Router>
      <Switch>
        <Route exact path={routes.home}>
          {userInfo.uuid.length > 0 ? <Redirect to={routes.app} /> : <Home />}
        </Route>
        <Route exact path={routes.app}>
          {userInfo.uuid.length === 0 ? <Redirect to={routes.home} /> : <App />}
        </Route>
        <Route exact path={routes.appInvoices}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Invoices />
          )}
        </Route>
        <Route exact path={routes.appPayments}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Payments />
          )}
        </Route>
        <Route exact path={routes.appOrders}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Orders />
          )}
        </Route>
        <Route exact path={routes.appCustomers}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Customers />
          )}
        </Route>
        <Route exact path={routes.appHelp}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Helpdesk />
          )}
        </Route>
        <Route exact path={routes.appSettings}>
          {userInfo.uuid.length === 0 ? (
            <Redirect to={routes.home} />
          ) : (
            <Settings />
          )}
        </Route>
        <Route path={routes.login}>
          {userInfo.uuid.length > 0 ? <Redirect to={routes.app} /> : <Login />}
        </Route>
        <Route path={routes.register}>
          {userInfo.uuid.length > 0 ? (
            <Redirect to={routes.app} />
          ) : (
            <Register />
          )}
        </Route>
      </Switch>
    </Router>
  );
};
