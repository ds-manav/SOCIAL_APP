import { combineReducers, configureStore,createSlice, createStore } from "@reduxjs/toolkit";
import { resgestrationReducer } from "./RegestrationSlice";
import { commentReducer } from "./CommentSlice";
import { postReducer } from "./PostFeedSlice";

const reducer = combineReducers({
    rege:resgestrationReducer,
    comment:commentReducer,
    post:postReducer,
})

export const store = configureStore({
    reducer:reducer,
})





