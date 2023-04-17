import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableNouveauCommande from './TableNouveauCommande'


function Data() {
  const [dataNouveauCom, setDataNouveauCom] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }
  useEffect(() => {
    const fetchData = async() => {
      const reponse = await Axios("http://localhost:3001/nouveaux_commande/toutcommande")
      setDataNouveauCom(reponse.data)
      setShow(true)
    }
    fetchData()
  }, [raff])
  return (
    <div className='Contenu-distribution'>
        {
          show && (<TableNouveauCommande dataNouveauCom={dataNouveauCom} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;