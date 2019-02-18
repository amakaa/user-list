import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './redux/create';
import getRoutes from './routes';

import './index.css';

const store = createStore();

export const Main = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        {getRoutes(store)}
      </Switch>
    </BrowserRouter>
  </Fragment>
)

ReactDOM.render(<Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));
