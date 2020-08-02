import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { validatorRequire } from "../../shared/util/validators";
import { useFrom } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./NewPost.css";

const NewPost = () => {
   const auth = useContext(AuthContext);
   const { sendRequest } = useHttpClient();
   const [formState, inputHandler] = useFrom(
      {
         title: {
            value: "",
            isValid: false,
         },
         description: {
            value: "",
            isValid: false,
         },
      },
      false
   );
   const history = useHistory();
   const postSubmitHandler = async (event) => {
      event.preventDefault();
      try {
         await sendRequest(
            "http://localhost:5500/api/posts",
            "POST",
            JSON.stringify({
               title: formState.inputs.title.value,
               description: formState.inputs.description.value,
               creator: auth.userId,
            }),
            {
               "Content-Type": "application/json",
            }
         );
         history.push("/");
      } catch (error) {
         console.log("New Post js ==> ", error);
      }
   };
   return (
      <div className="center main post">
         <form onSubmit={postSubmitHandler}>
            <Input
               id="title"
               element="input"
               type="text"
               placeholder="عنوان"
               errorText="لطفا عنوان معتبر وارد کنید."
               validators={[validatorRequire()]}
               onInput={inputHandler}
            />
            <Input
               id="description"
               element="textarea"
               placeholder="توضیح"
               errorText="لطفا توضیح معتبر وارد کنید."
               validators={[validatorRequire()]}
               onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
               افزودن
            </Button>
         </form>
      </div>
   );
};

export default NewPost;
