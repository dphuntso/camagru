
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';
import authReducer from '../reducers/auth';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    // user: userReducer,
    auth: authReducer
});

function savetoSessionStorage(state) {
    try {
        const stateAsString = JSON.stringify(state);
        sessionStorage.setItem('state', stateAsString);
    } catch (e) {
        console.log('\n !!! error !!!')
        console.log(e);
    }
}

function loadFromSessionStorage() {
    try {
        const stateInsession = sessionStorage.getItem('state');
        if (stateInsession) {
            return JSON.parse(stateInsession);
        }
    }catch (e) {
        console.log('\n !!! error !!!')
        console.log(e);
    }
    return undefined;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromSessionStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => savetoSessionStorage(store.getState()));

export default store;