import React from 'react';
import { Route, Redirect } from 'react-router';


const ConditionalRoute = ({ condition, redirect, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      condition
        ? <Component {...props} />
        : <Redirect to={redirect} />
    )}
  />
);

export default ConditionalRoute;
