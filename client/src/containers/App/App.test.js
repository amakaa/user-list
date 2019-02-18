import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

import App from './App';
import MenuContainer from '../MenuContainer/MenuContainer';
import UserList from '../UserList/UserList';
import { PrivateRoute } from '../../router/redirect.js';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders menu', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    const menu = <MenuContainer />;

    expect(wrapper.contains(menu)).toEqual(true);
  });

  it('redirect to users route', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute location="/" pathname="/users" component={UserList} />
      </MemoryRouter>
    );

    expect(wrapper.find('UserList').length).toEqual(0);
    expect(
      wrapper.find('Router').prop('history').location.pathname
    ).toEqual('/users');
  });
})
