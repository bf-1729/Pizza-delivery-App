const initialstate = {
    pizzas:[]
}
export const getAllPizzasReducer = (state = initialstate, action)=>{
    switch(action.type){
        case "GET_PIZZAS_REQUEST" : return{
            ...state
        }
        case "GET_PIZZAS_SUCCESS" : return{
            pizzas : action.payload
        }
        case "GET_PIZZAS_FAILED" : return{
            error : action.payload
        }
        default : return state
    }
}

const initialstates = {
    loading:false,
    nonvegpizzas:[],
    error:null
}

export const getAllNonVegPizzasReducer = (state = initialstates, action)=>{
    switch(action.type){
        case "GET_NONVEG_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_NONVEG_PIZZAS_SUCCESS" : return{
            loading:false,
            nonvegpizzas : action.payload
        }
        case "GET_NONVEG_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

const veginitialstates = {
    loading:false,
    vegpizzas:[],
    error:null
}

export const getAllVegPizzasReducer = (state = veginitialstates, action)=>{
    switch(action.type){
        case "GET_VEG_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_VEG_PIZZAS_SUCCESS" : return{
            loading:false,
            vegpizzas : action.payload
        }
        case "GET_VEG_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

const fruitinitialstates = {
    loading:false,
    fruitpizzas:[],
    error:null
}

export const getAllFruitPizzasReducer = (state = fruitinitialstates, action)=>{
    switch(action.type){
        case "GET_FRUIT_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_FRUIT_PIZZAS_SUCCESS" : return{
            loading:false,
            fruitpizzas : action.payload
        }
        case "GET_FRUIT_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

const parathainitialstates = {
    loading:false,
    parathapizzas:[],
    error:null
}

export const getAllParathaPizzasReducer = (state = parathainitialstates, action)=>{
    switch(action.type){
        case "GET_PARATHA_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_PARATHA_PIZZAS_SUCCESS" : return{
            loading:false,
            parathapizzas : action.payload
        }
        case "GET_PARATHA_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

const paneerinitialstates = {
    loading:false,
    paneerpizzas:[],
    error:null
}

export const getAllPaneerPizzasReducer = (state = paneerinitialstates, action)=>{
    switch(action.type){
        case "GET_PANEER_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_PANEER_PIZZAS_SUCCESS" : return{
            loading:false,
            paneerpizzas : action.payload
        }
        case "GET_PANEER_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

const mushroominitialstates = {
    loading:false,
    mushroompizzas:[],
    error:null
}

export const getAllMushroomPizzasReducer = (state = mushroominitialstates, action)=>{
    switch(action.type){
        case "GET_MUSHROOM_PIZZAS_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_MUSHROOM_PIZZAS_SUCCESS" : return{
            loading:false,
            mushroompizzas : action.payload
        }
        case "GET_MUSHROOM_PIZZAS_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}
export const getPizzaByIdReducer = (state = {}, action)=>{
    switch(action.type){
        case "GET_PIZZABYID_REQUEST" : return{
            loading:true,
            ...state
        }
        case "GET_PIZZABYID_SUCCESS" : return{
            loading:false,
            pizza : action.payload
        }
        case "GET_PIZZABYID_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}

export const addPizzaReducer = (state = {}, action)=>{
    switch(action.type){
        case "ADD_PIZZA_REQUEST" : return{
            loading:true,
            ...state
        }
        case "ADD_PIZZA_SUCCESS" : return{
            loading:false,
            success : true
        }
        case "ADD_PIZZA_FAILED" : return{
            error : action.payload,
            loading:false
        }
        default : return state
    }
}


export const editPizzaReducer = (state = {}, action)=>{
    switch(action.type){
        case "EDIT_PIZZA_REQUEST" : return{
            editloading:true,
            ...state
        }
        case "EDIT_PIZZA_SUCCESS" : return{
            editloading:false,
            editsuccess : true
        }
        case "EDIT_PIZZA_FAILED" : return{
            editerror : action.payload,
            editloading:false
        }
        default : return state
    }
}