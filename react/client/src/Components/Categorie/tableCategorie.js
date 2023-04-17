import React, { Fragment, useEffect, useState } from 'react'
import ModalCat from './ModalCat'
import ModalCategorieUpdate from './ModalCategorieUpdate';
// import { FaPlus } from "react-icons/fa"
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import Axios from 'axios'
import "./style.css"
import { toast } from 'react-toastify'

function TableCategorie({dataCat, raffraichir}){
  const [dataCategorie, setDataCategorie] = useState(dataCat)
  const [currentData, setCurrentData] = useState(1)
  const [dataPage, setDataPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(null)
  const [showId, setShowId] = useState(false)
  const pageNumber = []
  const totalData = dataCategorie.length

  useEffect(() => {
    setDataCategorie(dataCat)
  }, [raffraichir])

  //copie nouveau donnee
  const indexOfLastData = currentData * dataPage
  const indexOfFirstData = indexOfLastData - dataPage
  const newdataCategorie = dataCategorie.slice(indexOfFirstData,indexOfLastData)

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
    let datas = dataCat.filter(query => query.nomcat.toLowerCase().includes(req.toLowerCase()) ||
                                     query.taille.toLowerCase().includes(req.toLowerCase()) ||
                                     query.prix.toLowerCase().includes(req.toLowerCase()))
    setDataCategorie(datas);
  }

  const handleChangeView = (e) => {
    setCurrentData(1)
    e.target.value === "Tous" ? setDataPage(totalData) : setDataPage(e.target.value)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setShowId(false)
  }

  const handleUpdateData = (id) => {
    setId(id)
    setShowId(true)
  }
  const modalUpdate = showId && (<ModalCategorieUpdate raffraichir = {raffraichir} closeModal = {handleCloseModal} id = {id} />)

  const modal = showModal && (<ModalCat raffraichir = {raffraichir} closeModal = {handleCloseModal} />)

  const handleDelete = async(id) => {
    try{
      const reponse = await Axios.delete(`http://localhost:3001/categorie/deleteCategorie/${id}`)

      const newData = dataCategorie.filter(index => Number(index.refcat) !== id);
      setDataCategorie(newData);
      console.log(id)
      toast.success(reponse.data.message)
    }catch(err){
      // toast.error(err.response.data.message)
      console.log(err.response.data.message)
    }
}

  const dataTable = newdataCategorie.map(index=> (
    <tr key={index.refcat}>
      <td>{index.refcat}</td>
      <td>{index.refprod}</td>
      <td>{index.nomprod}</td>
      <td>{index.nomcat}</td>
      <td>{index.taille}</td>
      <td>{index.prix}</td>
      
      <td className='btn-flex'>
        <span className='btn-edit' onClick={() => handleUpdateData(index.refcat)}><AiOutlineEdit /></span>
        <span className='btn-delete' onClick={() => handleDelete(index.refcat)}><MdDelete /></span>

      </td>
    </tr>
  ))

  return (
    <Fragment>
      <div className='style-modal'>
      { modal }
      { modalUpdate }
      </div>
      <div className='contenu-info'>
        <div className='contenu-info1'>
          <h2>Categorie</h2>
          <p>Categorie / <span className='liste'>liste</span></p>
        </div>
        <div className='contenu-info2'>
          <input type='text' className='input-recherche' placeholder='Recherche....' id='recherche' name='recherche' onChange={filterData} />
          <span className='btn-ajout' onClick={handleShowModal}>Ajout</span>
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
              <th>N°</th>
              <th>refproduit</th>
              <th>Nom produits</th>
              <th>Nom</th>
              <th>taille</th>
              <th>prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { dataTable }
          </tbody>
        </table>

        <div className='table-info'>
          <div className='table-info1'>
            <span>Total Categorie : {dataCat.length}</span>
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
    </Fragment>
  )
}

export default TableCategorie;