import Axios from 'axios'
import { useState, useEffect } from 'react';
import TableCategorie from './tableCategorie'

function Data() {
  const [dataCategorie, setDataCategorie] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }


  useEffect(() => {

    const fetchData = async () => {
      const reponse = await Axios("http://localhost:3001/categorie/toutcategorie")
      setDataCategorie(reponse.data)
      setShow(true)
    }
    fetchData()
  }, [raff])

  return (
    <div className='Contenu-etablisement'>
        {
          show && (<TableCategorie dataCat={dataCategorie} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;