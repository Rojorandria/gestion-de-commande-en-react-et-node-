import Axios from 'axios'
import { useState, useEffect } from 'react';
import TableClient from './tableClient'

function Data() {
  const [dataClient, setDataClient] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }


  useEffect(() => {

    const fetchData = async () => {
      const reponse = await Axios("http://localhost:3001/client/toutclient")
      setDataClient(reponse.data)
      setShow(true)
    }
    fetchData()
  }, [raff])

  return (
    <div className='Contenu-etablisement'>
        {
          show && (<TableClient dataCli={dataClient} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;