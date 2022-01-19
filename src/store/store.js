import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
import { msgReducer } from './msg.reducer.js'

const rootReducer = combineReducers({
    stayModule : stayReducer,
    userModule : userReducer,
    msgModule: msgReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
