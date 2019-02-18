import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import MenuContainer, { CustomButton } from './MenuContainer';

configure({ adapter: new Adapter() });

describe('<MenuContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <MenuContainer />
      </MemoryRouter>
    );
  })

  it('renders without crashing', () => {
    shallow(<MenuContainer />);
  });

  it('renders menu with links', () => {
    expect(wrapper.render().find('button#users')).toHaveLength(1);
    expect(wrapper.render().find('button#add-user')).toHaveLength(1);
  });

  it('tests click event on add user button', () => {
    const mockCallBack = jest.fn();
    const button = mount(
      <MemoryRouter>
        <CustomButton link='/sign-up' title='Add User' onClick={mockCallBack} />
      </MemoryRouter>
    );

    button.simulate('click', mockCallBack)

    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
})
