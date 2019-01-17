const LOAD = '/auth/LOAD';
const LOAD_SUCCESS = '/auth/LOAD_SUCCESS';
const LOAD_FAIL = '/auth/LOAD_FAIL';
const LOGIN = '/auth/LOGIN';
const LOGOUT = '/auth/LOGOUT';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        user: {
          ...state.user,
          name: action.result.name,
          password: action.result.password,
        }
      }
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
        user: action.result
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function login(name, password) {
  return {
    type: LOGIN,
    result: { name, password },
  };
}

export function logout() {
  return {
    type: LOGOUT,
    result: null
  };
}