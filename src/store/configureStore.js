import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createDebounce from 'redux-debounced';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    createDebounce(),
    thunkMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
