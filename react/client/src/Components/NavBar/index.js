import './style.css'
import Logo from '../../Image/rado.png'
import { NavLink } from 'react-router-dom'
import { IoBarChartSharp,IoListSharp,IoSaveOutline,IoLogOut } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { BsDistributeVertical,BsFillBookFill } from "react-icons/bs";
import { IoIosKeypad } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import { ImPrinter } from "react-icons/im";
import { AiOutlineLogin } from "react-icons/ai";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className='logo'>
        <img src={Logo} alt="" />
        <hr />
      </div>
      <div className='navbar-nav'>
        <ul>
          <div className='dropdown'>
            <span className='btn-dropdwon'><span className='react-icon'><IoIosKeypad /></span>Menu</span>
            <div className='dropdown-content'>
              <li><NavLink className='dropdown-list' to={'/men/Cliente'}><span className='react-icon1'><IoIosPersonAdd /></span> Client</NavLink></li>
              <li><NavLink className='dropdown-list' to={'/men/Vendeur'}><span className='react-icon1'><MdAccountCircle/></span> Vendeur</NavLink></li>
              <li><NavLink className='dropdown-list' to={'/men/Livreur'}><span className='react-icon1'><MdDeliveryDining /></span> Livreur</NavLink></li>
              <li><NavLink className='dropdown-list' to={'/men/Categorie'}><span className='react-icon1'><BiCategory /></span> Categorie</NavLink></li>
              <li><NavLink className='dropdown-list' to={'/men/Produit'}><span className='react-icon1'><MdOutlineProductionQuantityLimits /></span> Produit</NavLink></li>
            </div>
          </div>
          <li><NavLink className='list' to={'/men/Accueil'}><AiOutlineHome /> Accueil</NavLink></li>
          <li><NavLink className='list' to={'/men/commande/toutcommande'}><SlNotebook /> Commande</NavLink></li>
          <li><NavLink className='list' to={'/men/Impression'}><span className='react-icon1'><ImPrinter/></span> Impression</NavLink></li>
          <li className='logout'><NavLink className='list' to={'/men/Logout'}><span className='react-icon2 '><AiOutlineLogin /></span>Logout</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar