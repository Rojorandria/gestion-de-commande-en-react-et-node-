import React from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function Logout() {
    Cookies.remove("nom");
    Cookies.remove("motdepasse");
    
  return (
    <Navigate to="/" />
  )
}

export default Logout