import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import pokedex from './pokedexReducer';
import pokemonInfo from './pokemonInfoReducer';

// combineReducers allows us to segment our code into multiple reducers for better organization
const reducers = combineReducers({
   pokedex,
   pokemonInfo,
});

// compose allows us to combine multiple store enhancers, such as middleware and the devtools browser extension
const composition = compose(
   applyMiddleware(promise, thunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default createStore(
   reducers,
   composition,
);
