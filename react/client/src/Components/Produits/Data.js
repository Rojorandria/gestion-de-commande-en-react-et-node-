import Axios from 'axios'
import { useState, useEffect } from 'react';
import TableProduit from './tableProduit'

function Data() {
  const [dataProduit, setDataProduit] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }


  useEffect(() => {

    const fetchData = async () => {
      const reponse = await Axios("http://localhost:3001/produits/toutProduits")
      setDataProduit(reponse.data)
      setShow(true)
    }
    fetchData()
  }, [raff])

  return (
    <div className='Contenu-etablisement'>
        {
          show && (<TableProduit dataProd={dataProduit} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;