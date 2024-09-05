import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { counterReducer } from "../counterReducer";

const reducers = combineReducers({
  counter: counterReducer,
});

export const store = createStore(reducers, composeWithDevTools());
