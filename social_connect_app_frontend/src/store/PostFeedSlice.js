import { createSlice } from "@reduxjs/toolkit";

const PostFeedSlice = createSlice(
    {
        name:"post",
        initialState:{postdata:{id:0,username:"",feed:"",userid:0}},
        reducers:{
            setPostId(state,action){
                state.postdata['id'] = action.payload;
            },
            setPostUsername(state,action){
                state.postdata.username = action.payload;
            },
            setFeed(state,action){
                state.postdata.feed = action.payload;
            },
            setPostUserId(state,action){
                state.postdata.userid = action.payload;
            },


        }
        
    }
)

export const postActions = PostFeedSlice.actions
export const postReducer = PostFeedSlice.reducer;