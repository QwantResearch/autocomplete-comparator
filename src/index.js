import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { loadState, saveState } from './localStorage';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

const persistedState = loadState();
const store = configureStore(persistedState);
store.subscribe(() => saveState(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
