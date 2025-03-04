

import { createStore,combineReducers,applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import {composeWithDevTools} from '@redux-devtools/extension'
import {getPizzaByIdReducer, getAllPizzasReducer,addPizzaReducer, editPizzaReducer, getAllNonVegPizzasReducer, getAllVegPizzasReducer, getAllFruitPizzasReducer, getAllParathaPizzasReducer, getAllPaneerPizzasReducer, getAllMushroomPizzasReducer, getVegPizzaByIdReducer } from './reducers/pizzaReducers'
import { getAllUsersReducer, loginUserReducer, registerUserReducer } from './reducers/userReducer'
import { AddressUserReducer, DeliverOrderReducer, UserAddressReducer } from './reducers/orderReducer'
const finalReducer = combineReducers({
    getAllPizzasReducer : getAllPizzasReducer,
    cartReducer : cartReducer,
    registerUserReducer : registerUserReducer,
    loginUserReducer : loginUserReducer,
    addPizzaReducer : addPizzaReducer,
    getPizzaByIdReducer : getPizzaByIdReducer,
    editPizzaReducer : editPizzaReducer,
    getAllUsersReducer : getAllUsersReducer,
    getAllNonVegPizzasReducer : getAllNonVegPizzasReducer,
    getAllVegPizzasReducer : getAllVegPizzasReducer,
    getAllFruitPizzasReducer : getAllFruitPizzasReducer,
    getAllParathaPizzasReducer : getAllParathaPizzasReducer,
    getAllPaneerPizzasReducer : getAllPaneerPizzasReducer,
    getAllMushroomPizzasReducer : getAllMushroomPizzasReducer,
    AddressUserReducer : AddressUserReducer,
    getVegPizzaByIdReducer : getVegPizzaByIdReducer,
    UserAddressReducer : UserAddressReducer,
    DeliverOrderReducer : DeliverOrderReducer
})
const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null
const initialState = {
    cartReducer:{
    cartItems : cartItems
    },
    registerUserReducer : {
        currentUser : currentUser
    },
    loginUserReducer : {
        currentUser : currentUser
    }
}
const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store
