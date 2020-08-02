import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
   const [loadedUsers, setLoadedUsers] = useState();
   const { sendRequest } = useHttpClient();
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const responseData = await sendRequest(
               "http://localhost:5500/api/users"
            );
            setLoadedUsers(responseData.users);
         } catch (error) {
            console.log("User js ==> ", error);
         }
      };
      fetchUsers();
   }, [sendRequest]);
   return (
      <React.Fragment>
         {loadedUsers && <UsersList items={loadedUsers} />}
      </React.Fragment>
   );
};

export default Users;
