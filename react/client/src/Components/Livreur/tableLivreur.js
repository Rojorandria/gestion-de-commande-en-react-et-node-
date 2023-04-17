import React, { useState,useEffect } from 'react'
import ModalDistribution from './ModalDistribution'
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import Axios from 'axios'
import "./style.css"
import { toast } from 'react-toastify'
import ModalLivreurUpdate from './ModalLivreurUpdate'

function TableLivreur({dataLiv, raffraichir}){
  const [dataLivreur, setDataLivreur] = useState(dataLiv)
  const [currentData, setCurrentData] = useState(1)
  const [dataPage, setDataPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(null)
  const [showId, setShowId] = useState(false)


  useEffect(() => {
    setDataLivreur(dataLiv)
  }, [raffraichir])

  const pageNumber = []
  const totalData = dataLivreur.length

  //console.log(data)
  //copie nouveau donnee
  const indexOfLastData = currentData * dataPage
  const indexOfFirstData = indexOfLastData - dataPage
  const newDataDistribution = dataLivreur.slice(indexOfFirstData,indexOfLastData)

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
    let datas = dataLiv.filter(query => query.nomlivr.toLowerCase().includes(req.toLowerCase())||
                                       query.prenomlivr.toLowerCase().includes(req.toLowerCase()))
    setDataLivreur(datas);
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

  const handleDelete = async(id) => {
    try{
      const reponse = await Axios.delete(`http://localhost:3001/livreur/deleteLivreur/${id}`)
      const newData = dataLivreur.filter(index => index.numlivr !== id);
      setDataLivreur(newData);
      toast.success(reponse.data.message)
    }catch(err){
      toast.error(err.response.data.message)
    }
  }
  const modalUpdate = showId && (<ModalLivreurUpdate raffraichir = {raffraichir} closeModal = {handleCloseModal} id = {id} />)
  const modal = showModal && (<ModalDistribution closeModal = {handleCloseModal} raffraichir = {raffraichir} />)

  const dataTable = newDataDistribution.map(index=> (
    <tr key={index.numlivr}>
      <td>{index.numlivr}</td>
      <td>{index.nomlivr}</td>
      <td>{index.prenomlivr}</td>
      <td>{index.telephone}</td>
      <td className='btn-flex'>
        <span className='btn-edit' onClick={() => handleUpdateData(index.numlivr)}><AiOutlineEdit /></span>
        <span className='btn-delete' onClick={() => handleDelete(index.numlivr)}><MdDelete /></span>

      </td>
    </tr>
  ))

  return (
    <>
    <div className='style-modal'>
    { modal }
    {modalUpdate}
  </div>
      <div className='contenu-info'>
        <div className='contenu-info1'>
          <h2>Livreur</h2>
          <p>Livreur / <span className='liste'>liste</span></p>
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
              <th>Nom Livreur</th>
              <th>prenom Livreur</th>
              <th>telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { dataTable }
          </tbody>
        </table>

        <div className='table-info'>
          <div className='table-info1'>
            <span>Total Livreur : {dataLiv.length}</span>
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
    </>
  )
}

export default TableLivreur;