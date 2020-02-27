import { combineReducers } from "redux";

const userReducer = (state = [], action) => {
    switch(action.type) {
        case "CURRENT_USER":
            return action.payload
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer
})

export default rootReducer;