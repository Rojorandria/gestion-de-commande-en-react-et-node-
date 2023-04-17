import React, { Fragment, useState } from 'react'
import Impression from './Impression'
import Axios from 'axios'
import { useEffect } from 'react';

function Index() {

    const [commande, setCommande] = useState({})
    const [find, setFind] = useState('')
    const handleClick = async() => {
            const reponse3 = await Axios(`http://localhost:3001/nouveaux_commande/toutcommande/${Number(find)}`)
            console.log(commande)
            setCommande(reponse3.data[0])
    }

  return (
    <div className='impression'>
            <div>
                <label>Facture commande</label>
                <input type="text" id='numclient' value={find} onChange={(e) => setFind(e.target.value)} />
                <button onClick={handleClick}>Enregistrer </button>
            </div>
            <Impression commande={commande} />
    </div>
  )
}

export default Index