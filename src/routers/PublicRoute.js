import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/new" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: false
});

export default connect(mapStateToProps)(PublicRoute);