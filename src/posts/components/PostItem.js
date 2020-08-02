import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PostItem.css";

const PostItem = (props) => {
   const { sendRequest } = useHttpClient();
   const auth = useContext(AuthContext);
   const deleteHandler = async () => {
      try {
         await sendRequest(
            `http://localhost:5500/api/posts/${props.id}`,
            "DELETE"
         );
         props.onDelete(props.id);
      } catch (error) {
         console.log("Post item jsw ==> ", error);
      }
   };
   return (
      <li className="li-for-post-item">
         <div>
            <img src={props.image} alt={props.title} />
         </div>
         <div>
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
         </div>
         <div>
            {auth.isLoggedIn && <Button onClick={deleteHandler}>حذف</Button>}
         </div>
      </li>
   );
};

export default PostItem;
