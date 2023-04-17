
import Sidebar from "./Components/SideBar";
import NavBar from "./Components/NavBar"
// import Etablisement from "./Components/Etablisement";
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import "./Main.css"
import { toast } from "react-toastify";

function Main() {

  if(Cookies.get('nom') !== undefined){
    toast.success(`Bienvenue`);
    return (
      <div className="main-flex">
          <NavBar />
          <div className="main">
              <Sidebar />
              {}
              <Outlet />
          </div>
      </div>
    )
  }else{
    return <Navigate to="/" />
  }
}
export default Main