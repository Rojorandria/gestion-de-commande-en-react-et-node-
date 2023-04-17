import React, { useState,useEffect } from 'react'
import ModalVendeur from './ModalVendeur'
import ModalVendeurUpdate from './ModalVendeurUpdate';
import "./style.css"
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import { toast } from 'react-toastify'
import Axios from 'axios'

function TableVendeur({dataVend, raffraichir}){

  const [dataVendreur, setDataVendeur] = useState(dataVend)
  const [currentData, setCurrentData] = useState(1)
  const [dataPage, setDataPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(null)
  const [showId, setShowId] = useState(false)

  const pageNumber = []
  const totalData = dataVendreur.length

  useEffect(() => {
    setDataVendeur(dataVend)
  }, [raffraichir])

  //console.log(data)
  //copie nouveau donnee
  const indexOfLastData = currentData * dataPage
  const indexOfFirstData = indexOfLastData - dataPage
  const newDataVendeur = dataVendreur.slice(indexOfFirstData,indexOfLastData)

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
    let datas = dataVend.filter(query => query.nomvend.toLowerCase().includes(req.toLowerCase()) ||
                                          query.prenomvend.toLowerCase().includes(req.toLowerCase()))
    setDataVendeur(datas);
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
  const handleDelete = async(id) => {
    try{
      const reponse = await Axios.delete(`http://localhost:3001/vendeur/deleteVendeur/${id}`)
      const newData = dataVend.filter(index => index.numvend !== id);
      setDataVendeur(newData);
      toast.success(reponse.data.message)
    }catch(err){
      // toast.error(err.response.data.message)
      console.log(err.response.data.message)
    }
  }
  const handleUpdateData = (id) => {
    setId(id)
    setShowId(true)
  }
  const modalUpdate = showId && (<ModalVendeurUpdate raffraichir = {raffraichir} closeModal = {handleCloseModal} id = {id} />)
  const modal = showModal && (<ModalVendeur raffraichir = {raffraichir} closeModal = {handleCloseModal} />)

  const dataTable = newDataVendeur.map(index=> (
    <tr key={index.numvend}>
      <td>{index.numvend}</td>
      <td>{index.nomvend}</td>
      <td>{index.prenomvend}</td>
      <td>{index.telephone}</td>
      <td className='btn-flex'>
        <span className='btn-edit' onClick={() => handleUpdateData(index.numvend)}><AiOutlineEdit /></span>
        <span className='btn-delete' onClick={() => handleDelete(index.numvend)}><MdDelete /></span>

      </td>
    </tr>
  ))

  return (
    <>
    <div className='style-modal'>
    { modal }
    { modalUpdate }
  </div>
      <div className='contenu-info'>
        <div className='contenu-info1'>
          <h2>Vendeur</h2>
          <p>Vendeur / <span className='liste'>liste</span></p>
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
              <th>Identifiant</th>
              <th>Nom vendeur</th>
              <th>prenom vendeur</th>
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
            <span>Total Vendeur : {dataVend.length}</span>
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

export default TableVendeur;