import {legacy_createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer as tour } from "../redux/tour/reducer";
import {reducer as auth} from "../redux/auth/reducer";

const rootReducer=combineReducers({
    tour,auth
})


export const store=legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))