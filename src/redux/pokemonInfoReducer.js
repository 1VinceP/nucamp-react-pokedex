import { ActionType } from 'redux-promise-middleware';
import baseUrl from '../baseUrl';

const initialState = {
   pokemon: {},
   loading: false,
};

// create the action types
const GET_POKEMON = 'GET_POKEMON';
const CLEAR_POKEMON = 'CLEAR_POKEMON';

// create the reducer
export default (state = initialState, { type, payload }) => {
   switch (type) {
      case `${GET_POKEMON}_${ActionType.Fulfilled}`:
         return { ...state, pokemon: payload, loading: false };
      case `${GET_POKEMON}_${ActionType.Pending}`:
         return { ...state, pokemon: {}, loading: true };
      case `${GET_POKEMON}_${ActionType.Rejected}`:
         return { ...state, pokemon: {}, loading: false };

      case CLEAR_POKEMON:
         return { ...state, pokemon: {} };

      default:
         return state;
   }
};

// create the actions

/**
 * this action is pretty much identical to the searchPokemon action in pokedexReducer.js
 * there is certainly a more optimized approach to doing this so we aren't repeating ourselves,
 * but the purpose of this activity is to show how to use separate reducers
 */
export const getPokemon = name => ({
   type: GET_POKEMON,
   payload: fetch(`${baseUrl}/pokemon/${name}`).then(response => response.json()),
});

// redux-promise-middleware ignores this action because there is no Promise included
export const clearPokemon = () => ({
   type: CLEAR_POKEMON,
});
