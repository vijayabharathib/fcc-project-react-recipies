import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './scripts/reducers/IndexReducers';
import App from './scripts/components/App';
import './styles/css/index.css';
import {loadState,saveState} from './scripts/reducers/PersistState';

let persistedState=loadState();
let store = createStore(reducer,persistedState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.log(store.getState());
store.subscribe(()=>{
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
