import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import recipies from './scripts/reducers/RecipieReducers';
import RecipieBox from './scripts/components/RecipieBox';
import './index.css';

let store = createStore(recipies,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <Provider store={store}>
    <RecipieBox />
  </Provider>,
  document.getElementById('root')
);
