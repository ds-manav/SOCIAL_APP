import React, { useEffect, useState } from "react";
import FeedBox from "./FeedBox";
import "./Feed.style.css";
import Post from "../Post/Post.component";
import axios from "axios";


function Feed(props) {
  const [listposts, setListPosts] = useState([]);
  const data =JSON.parse(localStorage.getItem("users"));
  console.log(data);
    

  useEffect(() => {
    async function handlePosts() {
      try {
        const posturl = `http://localhost:8000/api/posts/`;
        const postdata = await axios.get(posturl).then(response => {
          setListPosts(response.data);
        })
      }
      catch (e) {
        console.log(e);
      }
    }
    try {
      handlePosts();
    }
    catch (e) {
      console.log(e);
    }

  },[])

  return (
    <div className="feed">
      <FeedBox/>
      {listposts ?
      <div>
      { 
      listposts.map((post) => (
        <div key = {post.id}>
        <Post
          key={post.id}
          userid={post.userid}
          postid={post.id}
          username={post.username}
          feed = {post.feed}

        />
        </div>

      ))}
      </div>
      :
      <div>
      <h1>Create a Post</h1>
      </div>}
    </div>
  );
}

export default Feed;
