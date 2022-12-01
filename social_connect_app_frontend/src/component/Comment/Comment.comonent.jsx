import { PostAddSharp } from "@material-ui/icons";
import axios from "axios";
import "./Comment.style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { commentActions } from "../../store/CommentSlice";
import SlideBar from "../SideBar/SlideBar.component";
import NavBar from "../NavBar/NavBar.component";




const Comment = (props) => {

  const location = useLocation();
  const state = location.state;
  console.log(state.username);

  const commentdetails = useSelector((state) => state.comment.commentdata)
  console.log(commentdetails);

  const [comment, setComment] = useState();
  const randomNumberInRange = (min, max) => {
    return Math.round(Math.random() * (max - min + 1)) + min;
  }
  const handleInput = (e) => {
    try {
      setComment(e.target.value)
      dispatch(commentActions.setUserComment(e.target.value));
    }
    catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit() {
    try {
      await dispatch(commentActions.setCommentId(randomNumberInRange(1, 100)));
      await dispatch(commentActions.setCommentPostid(state.postid));
      await dispatch(commentActions.setCommentUsername(state.username));
      const commenturl = `http://localhost:8000/api/comments/`;
      const commentdata1 = await axios.post(commenturl,commentdetails).then(response => {
        console.log(response.status);
      })
      alert("Success")
      window.location.reload(true);
    }
    catch (e) {
      console.log(e);
    }
  }
  const [post_get, set_Post_Get] = useState([]);


  useEffect(() => {
    async function getPost() {
      try {
        const posturl = `http://localhost:8000/api/posts/${state.postid}`;
        const postdata = await axios.get(posturl).then(response => {
          set_Post_Get(response.data);
        })
      }
      catch (e) {
        console.log(e);
      }
    }
    try {
      getPost();
    }
    catch (e) {
      console.log(e);
    }

  }, [])

  const dispatch = useDispatch();

  return (
    <div >
      <NavBar/>
      <div className="comment_section">
        <SlideBar/>
        <div>
          <div className="modal__question">
            <div>
              <h1>{post_get.feed}</h1>
            </div>
            <p>
              asked by{" "}
              <span className="name">
                {state.username ? state.username : state.email}
              </span>{" "}
              {""}
              on{" "}
              <span className="name">
                {new Date().getDate()}
              </span>
            </p>
          </div>
          <div className="modal__answer">
            <textarea
              value={commentdetails.comment}
              onChange={(e) => {
                dispatch(commentActions.setUserComment(e.target.value));
              }}
              placeholder="Enter Your Answer"
              type="text"
            />
            {/* {console.log(commentdetails)} */}
          </div>
          <div className="modal__button">
            <button className="cancle" onClick={() => { }}>
              Cancel
            </button>
            <button type="sumbit" onClick={handleSubmit} className="add">
              Add Comment

            </button>
          </div>
        </div>
      </div>
      </div>
      )
}
      export default Comment;