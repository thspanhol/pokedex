import { combineReducers } from "redux";
import pokemonreducer from "./pokemonreducer";
import userreducer from "./userreducer";

const rootReducer = combineReducers({
  pokemonreducer,
  userreducer,
});

export default rootReducer;
