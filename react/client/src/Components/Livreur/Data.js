import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableLivreur from './tableLivreur'


function Data() {
  const [dataLivreur, setDataLivreur] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }
  useEffect(() => {
    const fetchData = async() => {
      const reponse = await Axios("http://localhost:3001/livreur/toutLivreur")
      setDataLivreur(reponse.data)
      setShow(true)
    }
    fetchData()
  }, [raff])
  return (
    <div className='Contenu-distribution'>
        {
          show && (<TableLivreur dataLiv={dataLivreur} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;