import { combineReducers } from "redux";
import selectcolorreducer from "./selectcolorreducer";
import userreducer from "./userreducer";

const rootReducer = combineReducers({
    selectcolorreducer,
    userreducer,
});

export default rootReducer;