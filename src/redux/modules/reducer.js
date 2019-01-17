
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import jokes from './jokes';

import {reducer as form} from 'redux-form';

const reducers = {
  routing: routerReducer,
  auth,
  jokes,
  form
};

export default reducers;