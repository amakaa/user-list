import React from 'react';
import { Redirect } from 'react-router';
import { Switch } from 'react-router-dom';

export const PrivateRoute = ({ location, pathname }) => (
  <Switch>
    <Redirect to={{
      state: { from: location },
      pathname,
    }}
    />
  </Switch>
);