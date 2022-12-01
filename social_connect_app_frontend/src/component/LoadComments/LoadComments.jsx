import axios from "axios";
import { useEffect, useState } from "react";
import "./LoadComment.css"

const LoadComments = (props) => {

    const [listComment, setListComment] = useState([]);


    useEffect(() => {

        async function getComments() {
            try {
                const posturl = `http://localhost:8000/api/cmts/${props.postid}`;
                const postdata = await axios.get(posturl).then(response => {
                    setListComment(response.data);
                })
            }
            catch (e) {
                console.log(e);
            }
        }
        try {
            getComments();
        }
        catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <div className="outer_comment">
            {
                listComment.map((list) => {
                    return (
                        <div key={list.id} className="comments_list">
                            <div>
                            <p key={props.postid} ></p>
                            </div>
                            <div className="contents">
                                <h4 style={{ color: "white",marginTop:"2px",marginBottom:"-5px",borderRadius:"11px",marginLeft:"-80px",padding:"2px 2px 5px 2px" ,backgroundColor:"black"}}>
                                            {list.username}:
                                </h4>
                                <h3 style={{marginTop:"2px",marginLeft:"5px",marginBottom:"-5px",fontFamily:"inherit"}}>{list.comment}</h3>
                                
                            </div>


                        </div>
                    )
                })}
        </div>
    )
}
export default LoadComments;