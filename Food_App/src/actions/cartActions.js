export const addToCart = (pizza,quantity,varient)=> (dispatch,getState)=>{

    var cartItem = {
        name : pizza.name,
        _id : pizza._id,
        varient : varient,
        quantity : quantity,
        prices : pizza.prices,
        price : pizza.prices[0][varient] * quantity,
        image : pizza.image
    }
    if(quantity>10){
        alert("You can not add more than 10 items in your carts")
    }else{
        if(cartItem.quantity<0){
            dispatch({type:"DELETE_FROM_CART",payload:pizza})
        }
        else{
            dispatch({type:"ADD_TO_CART",payload : cartItem})
        }
    }

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}

export const deleteFromCart = (pizza) => (dispatch,getState)=>{
    dispatch({type:"DELETE_FROM_CART",payload:pizza})
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
    
}
