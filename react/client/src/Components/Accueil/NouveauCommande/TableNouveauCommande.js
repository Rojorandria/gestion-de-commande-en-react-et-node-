import React, { useState,useEffect, Fragment } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import "./style.css"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

function TableNouveauCommande({dataNouveauCom, raffraichir}){

  const [dataNouveauCommande, setDataNouveauCommande] = useState(dataNouveauCom)
  const [currentData, setCurrentData] = useState(1)
  const [dataPage, setDataPage] = useState(5)

  const pageNumber = []
  const totalData = dataNouveauCommande.length

  //console.log(data)
  //copie nouveau donnee
  const indexOfLastData = currentData * dataPage
  const indexOfFirstData = indexOfLastData - dataPage
  const newDataDistribution = dataNouveauCommande.slice(indexOfFirstData,indexOfLastData)

  //pour avoir acceder au pagination
  const pagination = (totalData,dataPage) => {
    for(let i=1; i <= Math.ceil(totalData / dataPage) ; i++){
      pageNumber.push(i)
    }
  }
  pagination(totalData,dataPage)

  // pagination
  const handleClickPageleft = () => {
    setCurrentData(currentData-1)
    // console.log("currentData():"+currentData)
    if(currentData === 1){
      setCurrentData(1)
    }
      
  }
  const handleClickPageright = () => {
    setCurrentData(currentData+1);
    // console.log("currentData():"+currentData)
    if(currentData === pageNumber.length){
      setCurrentData(pageNumber.length)
    }
  }
  const handleClickPagination = (n) => {
    // console.log("pagination:"+n)
    setCurrentData(n)
  }

  const filterData = (e) => {
    let req = e.target.value
    let datas = dataNouveauCom.filter(query => query.nom.toLowerCase().includes(req.toLowerCase()))
    setDataNouveauCommande(datas);
  }

  const handleChangeView = (e) => {
    setCurrentData(1)
    e.target.value === "Tous" ? setDataPage(totalData) : setDataPage(e.target.value)
  }
  const dataTable = newDataDistribution.map(index=> (
    <tr key={index.numcom}>
      <td>{index.numcom}</td>
      <td>{index.nomcli}</td>
      <td>{index.prenomcli}</td>
      <td>{index.adresse}</td>
      <td>{index.telephone}</td>
      <td>{index.nomprod}</td>
      <td>{index.nomcat}</td>
      <td>{index.qtecom}</td>
    </tr>
  ))

  return (
    <Fragment>
    <div className='style-modal'>
      <div className='contenu-info'>
        <div className='contenu-info1'>
          <h2>Commande</h2>
          <p>Commande / <span className='liste'>liste</span></p>
        </div>
        <div className='contenu-info2'>
          <input type='text' className='input-recherche' placeholder='Recherche....' id='recherche' name='recherche' onChange={filterData} />
          <Link className='link-commande' to={'/men/NewCommande'}><span className='btn-ajout' >Ajout</span></Link>
        </div>
      </div>

      <div className='table'>

        <div className='table-view'>
          <label>Afficher: </label>
          <select onChange={handleChangeView}>
            <option value="5">5personnes</option>
            <option value="10">10personnes</option>
            <option value="Tous">Tous</option>
          </select>
        </div>

        <table className='contenu-table'>
          <thead>
            <tr>
              <th>N° commande</th>
              <th>Nom client</th>
              <th>prenom client</th>
              <th>telephone</th>
              <th>adresse</th>
              <th>produit</th>
              <th>categorie</th>
              <th>quantité commande</th>
            </tr>
          </thead>
          <tbody>
            { dataTable }
          </tbody>
        </table>

        <div className='table-info'>
          <div className='table-info1'>
            <span>Total Livreur : {dataNouveauCom.length}</span>
          </div>
          <div className='table-info2'>
            <ul>
              <li onClick={handleClickPageleft} className='icon btn-left'>&laquo;</li>
              {
                pageNumber.map((n,index)=>(
                  <li key={index} className='N-icon' onClick={()=>handleClickPagination(n)}>{n}</li>
                ))
              }
              <li className='icon btn-right' onClick={handleClickPageright}>&raquo;</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TableNouveauCommande;