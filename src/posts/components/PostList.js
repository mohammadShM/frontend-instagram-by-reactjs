import React from "react";

import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
   if (props.items.length > 0) {
      for (let index = 0; index < props.items.length; index++) {
         if (index % 2 === 0) {
            props.items[index].image = "/images/post-image.jpg";
         }
         if (index % 2 === 1) {
            props.items[index].image = "/images/images3.jpg";
         }
      }
   }
   if (props.items.length === 0) {
      return (
         <div className="main-not-found">
            <h2>پست وجود ندارد.</h2>
         </div>
      );
   }
   return (
      <div className="center main post">
         <ul>
            {props.items.map((post) => {
               return (
                  <PostItem
                     key={post.id}
                     id={post.id}
                     image={post.image}
                     title={post.title}
                     description={post.description}
                     creatorId={post.creator}
                     onDelete={props.onDeletedPost}
                  />
               );
            })}
         </ul>
      </div>
   );
};

export default PostList;
