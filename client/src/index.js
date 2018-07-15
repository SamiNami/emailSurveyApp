// no need to specify a relative pack, webpack asumes trying to import a module
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

// first arguement to create store is all the reducer inside our App
// 2nd argument is the inital state of the app
// 3rd argument is for applyMiddleware
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
