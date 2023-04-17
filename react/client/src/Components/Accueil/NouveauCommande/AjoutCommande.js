import React,{useState,useEffect} from 'react'
import AjoutTableCommande from './AjoutTableCommande'
import Axios from 'axios'

function AjoutCommande() {

    const [dataClient, setDataClient] = useState([])
    const [dataCat, setDataCat] = useState([])
    const [show, setShow] = useState(false)
    const [raff, setRaff] = useState(false)
  
    const raffraichir = () => {
      setRaff(!raff)
    }
  
  
    useEffect(() => {
  
      const fetchData = async () => {
        const reponse = await Axios("http://localhost:3001/client/toutclient/limit")
        setDataClient(reponse.data)
        const reponse1 = await Axios("http://localhost:3001/categorie/toutcategorie")
        setDataCat(reponse1.data)
        setShow(true)
      }
      fetchData()
    }, [raff])
  
  return (
    <div className='Contenu-etablisement'>
    {
        show && (<AjoutTableCommande dataCat={dataCat} dataCli={dataClient} raffraichir = {raffraichir} />)
      }
    </div>
  )
}

export default AjoutCommande