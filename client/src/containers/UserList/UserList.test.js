import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { shallow, configure, mount } from 'enzyme';
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from 'react-router-dom';
import {
  Table,
  TableBody,
  Dialog,
} from '@material-ui/core';

import UserList, { UserItem } from './UserList';

configure({ adapter: new Adapter() });

const fetchUsers = async (method = 'GET', id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method,
  });

  return response;
}
let mockData = {
  id: '1',
  name: 'amaka',
  email: 'email@email.com',
  gender: 'Female',
  phone: '1234567'
};
const mockStore = configureMockStore();
const store = mockStore({});
let wrapper;

describe.only('<UserList />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}><UserList /></Provider>
    );
  });

  it('gets user information from api', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
    
    const fetchSpy = jest.spyOn(global, 'fetch');

    fetchUsers().then(response => {
      expect(response).toContainEqual(mockResponse)
      expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/api/users');
    })
    .catch(error => error);
  });

  it('populates user list', () => {
    const list = mount(
      <MemoryRouter>
        <Table>
          <TableBody>
            <UserItem user={mockData} />
          </TableBody>
        </Table>    
      </MemoryRouter>
    );
    const rows = list.render().find('tr');
    const firstRowColumns = rows.first().find('td');
    const columnData = firstRowColumns.map((i, column) => column.children[0].data);

    expect(rows.length).toBe(1);

    expect(columnData[0]).toEqual('amaka');
    expect(columnData[1]).toEqual('email@email.com');
    expect(columnData[2]).toEqual('Female');
    expect(columnData[3]).toEqual('1234567');
  });

  it('deletes item from user list', async () => {
    const list = shallow(
      <UserItem user={mockData} />
    );
    const deleteButton = list.find('#delete-button');
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({}));
    
    const fetchSpy = jest.spyOn(global, 'fetch');

    await fetchUsers('DELETE', mockData.id).then(response => {
      mockData = {};
      expect(response).toContainEqual({})
      expect(fetchSpy).toHaveBeenCalledWith(`http://localhost:3000/api/users/${mockData.id}`);
    })
    .catch(error => error);

    deleteButton.simulate('click', global.fetch);
    list.setProps({ user: mockData });
    list.update();

    expect(list.render().find('tr').children().length).toEqual(0);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls.length).toEqual(1);
  });
});
