import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import Axios from 'axios'
import "./style.css"
import { toast } from 'react-toastify'
import Chart from "./Chart"

function TableProduit({commande, dataCat,dataCli, dataProd, raffraichir}){

  const dataClient = dataCli.length;
  const dataProduit = dataProd.length; 
  const dataCategorie = dataCat.length;



  return (
    <Fragment>
      <div className='card'>
        <div className='card-list'>
          <span>{dataClient}</span>
          <h3>Client</h3>
        </div>
        <div className='card-list'>
          <span>{dataProduit}</span>
          <h3>Produit</h3>
        </div>
        <div className='card-list'>
          <span>{dataCategorie}</span>
          <h3>Categorie</h3>
        </div>
      </div>
      <div className='card-commande'>
        <Chart commande={commande} />
      </div>
    </Fragment>
  )
}

export default TableProduit;