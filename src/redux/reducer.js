import { combineReducers } from "redux";

const userReducer = (state = [], action) => {
    switch(action.type) {
        case "CURRENT_USER":
            return action.payload
        case "SIGN_OUT":
            return action.payload
        default:
            return state;
    }
}

const cuReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_ALL_CU':
            return action.payload
        case 'ADD_NEW_CU':
            return [...state, action.payload]
        case 'DELETE_CU':
            let filtered = [...state].filter(cu => cu.id !== action.payload.id)
            return filtered
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    cuData: cuReducer
})

export default rootReducer;