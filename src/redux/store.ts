import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, compose( applyMiddleware(thunk) ) )
    return store
}