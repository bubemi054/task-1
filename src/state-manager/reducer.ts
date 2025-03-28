import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import cityReducer from "./citySlice";


const rootReducer = combineReducers({
  ui: uiReducer,
  city: cityReducer,
});

export default rootReducer