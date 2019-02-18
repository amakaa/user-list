import '@babel/polyfill';

const LOAD = 'LOAD';
const LOAD_FULFILLED = 'LOAD_FULFILLED';
const LOAD_REJECTED = 'LOAD_REJECTED';
const CREATE = 'CREATE';
const CREATE_FULFILLED = 'CREATE_FULFILLED';
const CREATE_REJECTED = 'CREATE_REJECTED';
const EDIT = 'EDIT';
const EDIT_FULFILLED = 'EDIT_FULFILLED';
const EDIT_REJECTED = 'EDIT_REJECTED';
const DELETE = 'DELETE';
const DELETE_FULFILLED = 'DELETE_FULFILLED';
const DELETE_REJECTED = 'DELETE_REJECTED';

const initialState = {
  loaded: false,
  loading: false,
  users: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
    case CREATE:
    case EDIT:
    case DELETE:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_FULFILLED:
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload
      };
    case CREATE_FULFILLED:
      return {
        ...state,
        loading: false,
        loaded: true,
        users: [...state.users, (action.payload || [])]
      };
    case EDIT_FULFILLED:
    case DELETE_FULFILLED:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case LOAD_REJECTED:
    case CREATE_REJECTED:
    case EDIT_REJECTED:
    case DELETE_REJECTED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}

export function isLoading(globalState) {
  return globalState.users && globalState.users.loading;
}

export function getUsers(globalState) {
  return globalState && globalState.users;
}

export function createUser(params) {
  return {
    type: CREATE,
    payload: async () => {
      return await fetch('http://localhost:3000/api/users', {
        method: "POST",
        body: JSON.stringify(params), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .catch(error => {
        return error;
      })
    }
  }
}

export function loadUsers() {
  return {
    type: LOAD,
    payload: async () => {
      return await fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .catch(error => error)
    }
  }
}

export function editUser(params, id) {
  return {
    type: EDIT,
    payload: async () => {
      return await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(params), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .catch(error => error)
    }
  }
}

export function deleteUser(id) {
  return {
    type: DELETE,
    payload: async () => {
      return await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .catch(error => error)
    }
  }
}
