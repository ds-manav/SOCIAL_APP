import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.style.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import axios, { Axios } from "axios";
import { commentActions } from "../../store/CommentSlice";
import Comment from "../Comment/Comment.comonent";
import { useNavigate } from "react-router-dom";
import LoadComments from "../LoadComments/LoadComments";

const Post = (props) => {
  const navigate = useNavigate();
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const postid = props.postid
  const username = props.username;
  const [loadComments,setLoadComments] = useState(false);
  const [like,setLike] = useState(0);

  //   for c, i in session.query(Customer, Invoice).filter(Customer.id == Invoice.custid).all():
  //  print ("ID: {} Name: {} Invoice No: {} Amount: {}".format(c.id,c.name, i.invno, i.amount))

  return (
    <div className="post">
      

      <div className="post__info">
      <h3>{props.postid}</h3>
        <Avatar
          src={
            "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
          }
        />
        <h4>{props.username ? props.username : props.email}</h4>
        <small>{new Date().getDate()}</small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{props.feed}</p>
          <button style={{position:"static"}}
            onClick={() => {
              navigate('/comment', { state: { postid: postid, username: username, email: props.email } });
            }}

            className="post__btnAnswer"
          >
            Comment
          </button>
          <div style={{marginTop:"10px"}}>
            { loadComments ?
          <LoadComments postid={postid}/>
          :
          <></>}
          </div> 
        </div>
        

        {/* </div>  */}
        {/* <img src={imageUrl} alt="" /> */}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlinedIcon onClick={()=>{
            setLike(like+1);
          }} />
          <span>{like}</span>
          <ArrowDownwardOutlinedIcon  onClick={()=>{
            setLike(like-1);
          }} />
        </div>

        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon onClick={()=>{
          setLoadComments(currentState => !currentState);
        }} />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>

    </div>
    
      );
}

export default Post;
