import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {NotesReducer} from "./components/notes/reducers/notesReducer";
import {CustomMessageAlertReducer} from "./components/messageAlert/reducers/CustomMessageAlertReducer";

const reducers = combineReducers({
    CustomMessageAlerReducer: CustomMessageAlertReducer,
    NotesReducer: NotesReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));