import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { shallow, configure, mount } from 'enzyme';
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from 'react-router-dom';

import SignUp, { CustomTextField, SubmitButton } from './SignUp';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe('<SignUp />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}><SignUp /></Provider>
    );
  })

  it('renders all form elements', () => {
    expect(wrapper.render().find('#standard-name')).toHaveLength(1);
    expect(wrapper.render().find('#standard-email')).toHaveLength(1);
    expect(wrapper.render().find('#standard-phone')).toHaveLength(1);
    expect(wrapper.render().find('#standard-street')).toHaveLength(1);
    expect(wrapper.render().find('#standard-number')).toHaveLength(1);
    expect(wrapper.render().find('#standard-city')).toHaveLength(1);
    expect(wrapper.render().find('#standard-zipcode')).toHaveLength(1);
  });

  it('tests change event on text field', () => {
    const mockCallBack = jest.fn();
    const input = mount(
      <MemoryRouter>
        <CustomTextField onChange={mockCallBack} />
      </MemoryRouter>
    );
    const event = { target: { value: "change" } };

    jest.resetAllMocks();

    expect(input.find("input").simulate("change", event));
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('tests click event on submit button', () => {
    const mockCallBack = jest.fn();
    const button = shallow(
      <SubmitButton handleSubmit={mockCallBack} />
    );

    expect(button.simulate("click", mockCallBack));
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
})
