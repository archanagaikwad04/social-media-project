import React from 'react';
import { Router, Route, Switch, Link, NavLink,Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import Home from '../components/Home/Home'
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Login} exact={true} />
        <PublicRoute path="/signup" component={SignUp} exact={true} />
        <PrivateRoute path="/new" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;