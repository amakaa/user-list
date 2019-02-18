import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App/App.js';
import SignUp from './containers/SignUp/SignUp.jsx';
import UserList from './containers/UserList/UserList.jsx';

export default () => {
  return (
    <Fragment>
      <Route path="/" component={App} />
      <Route path="/users/" component={UserList} />
      <Route path="/new/" component={SignUp} />
    </Fragment>
  );
};