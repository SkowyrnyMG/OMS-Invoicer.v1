import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from 'views/app';
import Home from 'views/home';
import Login from 'views/login';
import Register from 'views/register';

export const routes = {
  home: '/',
  app: '/app',
  login: '/app/login',
  register: '/app/register',
};

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path={routes.home}>
        <Home />
      </Route>
      <Route exact path={routes.app}>
        <App />
      </Route>
      <Route path={routes.login}>
        <Login />
      </Route>
      <Route path={routes.register}>
        <Register />
      </Route>
    </Switch>
  </Router>
);
