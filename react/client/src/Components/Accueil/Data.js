import Axios from 'axios'
import { useState, useEffect } from 'react';
import Commande from './commande'

function Data() {
  const [dataCli, setDataCli] = useState([])
  const [dataProd, setDataProd] = useState([])
  const [dataCat, setDataCat] = useState([])
  const [commande, setCommande] = useState([])
  const [show, setShow] = useState(false)
  const [raff, setRaff] = useState(false)

  const raffraichir = () => {
    setRaff(!raff)
  }


  useEffect(() => {

    const fetchData = async () => {
      const reponse = await Axios("http://localhost:3001/client/toutclient")
      setDataCli(reponse.data)

      const reponse1 = await Axios("http://localhost:3001/produits/toutProduits")
      setDataProd(reponse1.data)

      const reponse2 = await Axios("http://localhost:3001/categorie/toutcategorie")
      setDataCat(reponse2.data)
      const reponse3 = await Axios("http://localhost:3001/nouveaux_commande/toutcommande")
      setCommande(reponse3.data)
      setShow(true)
    }

    fetchData()
  }, [raff])

  return (
    <div className='Contenu-etablisement'>
        {
          show && (<Commande commande={commande} dataCat={dataCat} dataCli={dataCli} dataProd={dataProd} raffraichir = {raffraichir} />)
        }
    </div>
  )
}

export default Data;