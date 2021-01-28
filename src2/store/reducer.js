import {combineReducers} from "redux"
import {reducer as registeReducer} from "../components/Reginste/store"

export default combineReducers({
    register: registeReducer
})