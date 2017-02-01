import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
