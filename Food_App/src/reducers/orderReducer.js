const initialState = {
    Address: [], // Holds the address data
    loading: false, // Tracks the loading state
    error: null // Stores any error messages
};

export const AddressUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_ADDRESS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors when starting a new request
            };

        case "USER_ADDRESS_SUCCESS":
            return {
                ...state,
                loading: false,
                Address: action.payload, // Update the address with the payload
                error: null // Clear errors on success
            };

        case "USER_ADDRESS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload // Store the error message
            };

        default:
            return state;
    }
};
const initialStates = {
    Useraddress: [], // Holds the address data
    loading: false, // Tracks the loading state
    error: null // Stores any error messages
};
export const UserAddressReducer = (state = initialStates, action) => {
    switch (action.type) {
        case "GET_USER_ADDRESS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors when starting a new request
            };

        case "GET_USER_ADDRESS_SUCCESS":
            return {
                ...state,
                loading: false,
                Useraddress: action.payload, // Update the address with the payload
                error: null // Clear errors on success
            };

        case "GET_USER_ADDRESS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload // Store the error message
            };

        default:
            return state;
    }
};
export const DeliverOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case "DELIVER_ORDER_REQUEST":
        return { loading: true };
      case "DELIVER_ORDER_SUCCESS":
        return { loading: false, success: true };
      case "DELIVER_ORDER_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
