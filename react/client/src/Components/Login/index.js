import React, { useState, Fragment, useRef } from 'react';
import Logo from '../../Image/logoMen.jpg';
import './Login.css';
import { FaEyeSlash,FaEye } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from "react-toastify";


function Login(){

  const [showEye, setShowEye] = useState(true);
  const inputPassword = useRef(null);
  const [user, setUser] = useState({
    nom : '',
    motdepasse : '',
  });
  const navigate = useNavigate();

  Cookies.remove('nom');
  Cookies.remove('motdepasse');

  const handleClickIconEye = () => {
      setShowEye(!showEye);
      showEye ? inputPassword.current.attributes[0].nodeValue = 'text' : inputPassword.current.attributes[0].nodeValue = 'password';
  }
  const handleChange = (e) => {
  setUser({...user,[e.target.id]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const reponse = await axios.post("http://localhost:3001/login/users", user);
      Cookies.set('nom', reponse.data.session[0].nom);
      Cookies.set('motdepasse', reponse.data.session[0].password)
      if(reponse.data.message !== ''){
        toast.warning(reponse.data.message, {autoClose: false});
      }
      navigate("/men/Accueil")
    }catch(err){
      toast.error(err.response.data.message);
    }
    }


  return (
    <Fragment>
      <div className='login-container'>
          <div className="login">
              <div className="logo">
                <img src={Logo} alt="" />
              </div>
              <form autoComplete='Off' onSubmit={handleSubmit}>
                <div className="input-container">
                  <input type="text" required name='nom' id='nom' value={user.nom} onChange={handleChange} />
                  <span></span>
                  <label>Nom d'utilisateur</label>
                </div>

                <div className="input-container">
                  <input type="password" required ref={inputPassword} name='motdepasse' id='motdepasse' value={user.motdepasse} onChange={handleChange} />
                  <label>Mot de passe</label>
                  {
                    showEye ? <FaEyeSlash className='icon-eye' onClick={handleClickIconEye} /> :  <FaEye className='icon-eye' onClick={handleClickIconEye} />
                  }
                </div>
                <button className=' btn d-flex align-items-center justify-content-center' type="submit"><span  className='icon-btn'></span> Se connecter</button>
              </form>
          </div>
        </div>
    </Fragment>
  )
}

export default Login
