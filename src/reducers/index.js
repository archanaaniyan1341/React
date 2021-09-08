import loggedReducer from "./isLogged";
import gridDefaultsReducer from "./gridDefaultsReducer";
import setParamsReducer from "./setParmsReducer";
import setSelectedInfoReducer from "./setSelectedInfoReducer";
import setExaminationQuestionReducer from "./setExaminationQuestionReducer"
import { combineReducers } from "redux";
import { applyMiddleware, createStore, compose } from "redux";
import apiMiddleware from "../middleware/api";

const rootReducer = combineReducers({
    "user": loggedReducer,
    "grid": gridDefaultsReducer,
    "params": setParamsReducer,
    "selectedInfo": setSelectedInfoReducer,
    "setExaminationQuestion": setExaminationQuestionReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(apiMiddleware)),
);

export default rootReducer;