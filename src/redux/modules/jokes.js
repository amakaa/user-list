const LOAD = 'jokes/LOAD';
const LOAD_SUCCESS = 'jokes/LOAD_SUCCESS';
const LOAD_FAIL = 'jokes/LOAD_FAIL';

const REMOVE_FAVORITE = 'jokes/REMOVE_FAVORITE';
const ADD_FAVORITE = 'jokes/ADD_FAVORITE';

const initialState = {
  loaded: false,
  loading: false,
  favorites: [],
  error: '',
  jokes: [],
};
const FAVORITES_MAX = 10;

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FAVORITE: {
      if  (state.favorites.length >= FAVORITES_MAX) {
        return {
          ...state,
          error: [
            ...state.error,
            'Number of favorites cannot exceed 10'
          ],
        }
      }

      return {
        ...state,
        error: '',
        favorites: [...state.favorites, action.result],
      }
    }
    case REMOVE_FAVORITE:
      return {
        ...state,
        error: '',
        favorites: [
          ...state.favorites.filter(c => { 
            return parseInt(c.id, 10) !== parseInt(action.result.id, 10)
          })
        ],
      }
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: '',
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        jokes: action.result.value,
        error: '',
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export function isLoading(state) {
  return state & state.loading;
}

export function getFavorites(state) {
  return state && state.jokes.favorites;
}

export function addFavorite(joke, id) {
  return {
    type: ADD_FAVORITE,
    result: { 
      joke,
      id,
    }
  }
}

export function removeFavorite(id) {
  console.log(id)
  return {
    type: REMOVE_FAVORITE,
    result: { id },
  }
}

export function loadJokes() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.get('http://api.icndb.com/jokes/random/10', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
  };
}

export function getJokes(state) {
  return state && state.jokes;
}
