import { ActionType } from 'redux-promise-middleware';
import baseUrl from '../baseUrl';

const { Fulfilled, Rejected, Pending } = ActionType;

const initialState = {
   pokemon: [],
   loading: false,
   next: null,
   previous: null,
};

// create action types
const GET_POKEMON = 'GET_POKEMON';
const LOADING_POKEMON = 'LOADING_POKEMON';
const SEARCH = 'SEARCH';

// create the reducer
export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_POKEMON:
         return {
            ...state,
            pokemon: payload.results,
            previous: payload.previous,
            next: payload.next,
            loading: false,
         };
      case LOADING_POKEMON:
         return {
            ...state,
            loading: true,
            previous: null,
            next: null,
         };

      // Fulfilled/Pending/Rejected are added by redux-promise-middleware based on the fetch result
      case `${SEARCH}_${Fulfilled}`:
         return { ...state, pokemon: [payload], loading: false };
      case `${SEARCH}_${Pending}`:
         return {
            ...state,
            previous: null,
            next: null,
            loading: true,
         };
      case `${SEARCH}_${Rejected}`:
         return { ...state, pokemon: [], loading: false };

      default:
         return state;
   }
};

// create the actions

// this is a standard "thunk" action that you are used to from the nucamp project
export const getPokedex = (url = `${baseUrl}/pokemon`) => dispatch => {
   dispatch({ type: LOADING_POKEMON });

   return fetch(url)
      .then(response => response.json())
      .then(pokemonData => dispatch({
         type: GET_POKEMON,
         payload: pokemonData,
      }));
}

// searchPokedex uses redux-promise-middleware to create concise asynchronous actions
// we only need one action to handle successful/loading/error states of the fetch request
// redux-promise-middleware only kicks in when the payload is a Promise. If it is anything else (string, array, etc) your action will behave as noraml
export const searchPokedex = name => ({
   // We just use the SEARCH action type because the Fulfilled, Pending, and Rejected statuses are applied by redux-promise-middleware
   type: SEARCH,
   payload: fetch(`${baseUrl}/pokemon/${name}`).then(response => response.json()),
});
