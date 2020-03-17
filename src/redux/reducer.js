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
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    cuData: cuReducer
})

export default rootReducer;