import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import chatReducer from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(chatReducer, composeEnhancers(middleware));
