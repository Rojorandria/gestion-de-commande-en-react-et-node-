import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableVendeur from './tableVendeur'

function Data() {
    const [dataVend, setDataVend] = useState([])
    const [show, setShow] = useState(false)
    const [raff, setRaff] = useState(false)
  
    const raffraichir = () => {
      setRaff(!raff)
    }

    useEffect(() => {
      const fetchData = async() => {
        const reponse = await Axios("http://localhost:3001/vendeur/toutVendeur")
        setDataVend(reponse.data)
        setShow(true)
      }
      fetchData()
    }, [raff])

  return (
    <div className='Contenu-materiel'>
        {
          show && (<TableVendeur dataVend={dataVend} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;