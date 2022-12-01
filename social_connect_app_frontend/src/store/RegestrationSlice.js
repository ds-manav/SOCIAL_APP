import { createSlice } from "@reduxjs/toolkit";

const RegestrationSlice = createSlice(
    {
        name:"regestraion",
        initialState:{userdata:{id:0,username:"",email:"",password:""}},
        // commentdata:{id:0,username:"",postid:10,comment:"",},
        // vcount:0},
        reducers:{
            setUsername(state,action){
                state.userdata.username = action.payload;
            },
            setUseremail(state,action){
                state.userdata.email = action.payload;
            },
            setUserPassword(state,action){
                state.userdata.password = action.payload;
            },
            setUserid(state,action){
                state.userdata.id = action.payload;
            },
            // setCommentId(state,action){
            //     state.commentdata['id'] = action.payload;
            // },
            // setCommentUsername(state,action){
            //     state.commentdata.username = action.payload;
            // },
            // setUserComment(state,action){
            //     state.commentdata.comment = action.payload;
            // },
            // setCommentPostid(state,action){
            //     state.commentdata.postid = action.payload;
            // },
            // setCount(state,action){
            //     state["vcount"] = state["vcount"] + 1;
            // },


        }
        
    }
)

export const regestrationActions = RegestrationSlice.actions;
export const resgestrationReducer = RegestrationSlice.reducer;
export const regSlice = RegestrationSlice;