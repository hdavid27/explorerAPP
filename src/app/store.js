import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reducers';

const initialState = {};

const middleware = [
    thunk
];

// const appStore = createStore(
//     rootReducer, 
//     initialState, 
//     applyMiddleware(...middleware)
// );

const appStore = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware)

);
    

export default appStore;