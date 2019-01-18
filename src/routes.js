import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App/App.js';
import Login from './containers/Login/Login.jsx';
import FavoritesList from './containers/FavoritesList/FavoritesList.jsx';
import JokesList from './containers/JokesList/JokesList.jsx';
import NotFound from './containers/NotFound/NotFound.js';

export default (store) => {
  const PrivateRoute = ({component: Component, path }) => {
    const { auth } = store.getState();
    return !auth.user ? (
      <Redirect to="/login/"/>
    ) : ( <Route path={path} component={Component} /> )
  }

  return (
    <div>
      <Route path="/" component={App} />
      <Route path="/login/" component={Login} />
      <PrivateRoute path="/jokes/" component={JokesList} />
      <PrivateRoute path="/favorites/" component={FavoritesList} />
      <Route path="/not_found/" component={NotFound} status={404} />
    </div>
  );
};