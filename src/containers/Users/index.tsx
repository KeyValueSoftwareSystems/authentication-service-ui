import React from "react";
import { useParams } from "react-router-dom";
import AddUser from "./AddUser";
import EditUser from "./EditUser";


const Users: React.FC = () => {
  const{id}=useParams();
  return(
  id? <EditUser/> : <AddUser/>
  )
};

export default Users;
