import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { cartReducer } from './reducers/cartReducer';
import { 
    getPizzaByIdReducer, 
    getAllPizzasReducer, 
    addPizzaReducer, 
    editPizzaReducer
} from './reducers/pizzaReducers';

import { getAllUsersReducer, loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { AddressUserReducer, DeliverOrderReducer, UserAddressReducer } from './reducers/orderReducer';

const finalReducer = combineReducers({
    getAllPizzasReducer,
    cartReducer,
    registerUserReducer,
    loginUserReducer,
    addPizzaReducer,
    getPizzaByIdReducer,
    editPizzaReducer,
    getAllUsersReducer,
    AddressUserReducer,
    UserAddressReducer,
    DeliverOrderReducer
});

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

const initialState = {
    cartReducer: { cartItems },
    registerUserReducer: { currentUser },
    loginUserReducer: { currentUser }
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
