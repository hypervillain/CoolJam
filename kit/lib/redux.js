/*
  Custom Redux store,
  in case you need to store state outside of Apollo
*/

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

export default function createNewStore(apolloClient) {
  const store = createStore(
    // Add your own reducer here :
    combineReducers({
      apollo: apolloClient.reducer(),
    }),
    !SERVER ? window.__STATE__ : {},
    compose(
        applyMiddleware(apolloClient.middleware()),
        // eslint-disable-next-line no-underscore-dangle
        (!SERVER && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  )
  return store
}
