export const cartReducer = (state = { cartItems: [] }, action) => {
    const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItemIndex = cartItems.findIndex(
                item => item._id === action.payload._id
            );

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingItemIndex] = action.payload;

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...cartItems, action.payload],
                };
            }
        }
        case "DELETE_FROM_CART":
            return {
                ...state,
                cartItems: cartItems.filter(
                    item => item._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
};
