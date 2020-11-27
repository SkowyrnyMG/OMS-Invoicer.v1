import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from 'store/slices/auth-slice/auth-slice';

import App from 'views/app';
import Home from 'views/home';
import Login from 'views/login';
import Register from 'views/register';

export const routes = {
  home: '/',
  app: '/app',
  login: '/login',
  register: '/register',
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
