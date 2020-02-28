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

const ptpReducer = (state = [], action) => {
    switch(action.type){
        case "FETCHED_PTP_DATA":
            return action.payload
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    ptpData: ptpReducer,
})

export default rootReducer;