import React, { Fragment, useEffect, useState } from 'react'
import ModalEtab from './ModalEtab'
import ModalClientUpdate from './ModalClientUpdate';
// import { FaPlus } from "react-icons/fa"
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md"
import Axios from 'axios'
import "./style.css"
import { toast } from 'react-toastify'

function TableClient({dataCli, raffraichir}){

  const [dataClient, setDataClient] = useState(dataCli)
  const [currentData, setCurrentData] = useState(1)
  const [dataPage, setDataPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(null)
  const [showId, setShowId] = useState(false)
  const pageNumber = []
  const totalData = dataClient.length

  useEffect(() => {
    setDataClient(dataCli)
  }, [raffraichir])

  //copie nouveau donnee
  const indexOfLastData = currentData * dataPage
  const indexOfFirstData = indexOfLastData - dataPage
  const newdataClient = dataClient.slice(indexOfFirstData,indexOfLastData)

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
    let datas = dataCli.filter(query => query.nomcli.toLowerCase().includes(req.toLowerCase()) ||
                                     query.prenomcli.toLowerCase().includes(req.toLowerCase()) ||
                                     query.adresse.toLowerCase().includes(req.toLowerCase()))
    setDataClient(datas);
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
  const modalUpdate = showId && (<ModalClientUpdate raffraichir = {raffraichir} closeModal = {handleCloseModal} id = {id} />)

  const modal = showModal && (<ModalEtab raffraichir = {raffraichir} closeModal = {handleCloseModal} />)

  const handleDelete = async(id) => {
    try{
      const reponse = await Axios.delete(`http://localhost:3001/client/deleteClient/${id}`)

      const newData = dataClient.filter(index => Number(index.numcli) !== id);
      setDataClient(newData);
      console.log(id)
      toast.success(reponse.data.message)
    }catch(err){
      // toast.error(err.response.data.message)
      console.log(err.response.data.message)
    }
}

  const dataTable = newdataClient.map(index=> (
    <tr key={index.numcli}>
      <td>{index.numcli}</td>
      <td>{index.nomcli}</td>
      <td>{index.prenomcli}</td>
      <td>{index.adresse}</td>
      <td>{index.telephone}</td>
      <td className='btn-flex'>
        <span className='btn-edit' onClick={() => handleUpdateData(index.numcli)}><AiOutlineEdit /></span>
        <span className='btn-delete' onClick={() => handleDelete(index.numcli)}><MdDelete /></span>

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
          <h2>Client</h2>
          <p>Client / <span className='liste'>liste</span></p>
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
              <th>Nom</th>
              <th>prenom</th>
              <th>adresse</th>
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
            <span>Total Client : {dataCli.length}</span>
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

export default TableClient;