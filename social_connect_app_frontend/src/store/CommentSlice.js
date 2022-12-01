import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice(
    {
        name:"comment",
        initialState:{commentdata:{id:0,username:"",postid:0,comment:""},
        vcount:0},
        reducers:{
            setCommentId(state,action){
                state.commentdata['id'] = action.payload;
            },
            setCommentUsername(state,action){
                state.commentdata.username = action.payload;
            },
            setUserComment(state,action){
                state.commentdata.comment = action.payload;
            },
            setCommentPostid(state,action){
                state.commentdata.postid = action.payload;
            },
            setCount(state,action){
                state["vcount"] = state["vcount"] + 1;
            },


        }
        
    }
)

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;