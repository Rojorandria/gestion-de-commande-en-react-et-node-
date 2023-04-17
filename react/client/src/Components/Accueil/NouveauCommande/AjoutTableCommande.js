import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Axios from 'axios'

function AjoutTableCommande({dataCat, dataCli}) {
  const dataCategorie = dataCat.slice(0,5)
  const dataClient = dataCli.slice(0,5)

  const [data, setData] = useState({
    numcli: '',
    refprod: '',
    refcat: '',
    qtecom: '',
    datecom: ''
  })
  const handleChangeData = (e) => {
    setData({...data, [e.target.id]: e.target.value})
  }
  const handleSendData = async(e) => {
    e.preventDefault();
    try{
        const reponse = await Axios.post("http://localhost:3001/nouveaux_commande/addCommande",{...data})
        console.log({...data})
        toast.success(reponse.data.message)
    }
    catch(err){
        toast.error(err.response.data.message)
    }
  }

  const dataTableClient = dataClient.map(index => (
    <tr key={index.numcli}>
      <td>{index.numcli}</td>
      <td>{index.nomcli}</td>
      <td>{index.prenomcli}</td>
      <td>{index.adresse}</td>
      <td>{index.telephone}</td>
    </tr>
  ))
  const dataTableCategorie = dataCategorie.map(index => (
    <tr key={index.refcat}>
      <td>{index.refcat}</td>
      <td>{index.refprod}</td>
      <td>{index.nomprod}</td>
      <td>{index.nomcat}</td>
    </tr>
  ))

  return (
    <div>
    <div className='flex-commande'>
    <div>
        <table className='contenu-table'>
        <thead>
        <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>prenom</th>
            <th>adresse</th>
            <th>telephone</th>
        </tr>
        </thead>
        <tbody>
        { dataTableClient }
        </tbody>
    </table>
    </div>
    <div>
        <table className='contenu-table'>
        <thead>
            <tr>
            <th>Refcat</th>
            <th>refprod</th>
            <th>Produit</th>
            <th>Categorie</th>
            </tr>
        </thead>
        <tbody>
            { dataTableCategorie }
        </tbody>
        </table>
    </div>
    </div>
    <div>
    <h2>commande</h2>
    <form className='send-commande' onSubmit={handleSendData} autoComplete='off'>
        <div className="constenu-modals">
            <label>Numero client<span style={{color: 'red'}}>*</span></label><br />
            <input type="text" className='input-eng' id='numcli' value={data.numcli} onChange={handleChangeData} />
        </div>
        <div className="constenu-modals">
            <label>réference produits<span style={{color: 'red'}}>*</span></label><br />
            <input type="text" className='input-eng' id='refprod' value={data.refprod} onChange={handleChangeData} />
        </div>
        <div className="constenu-modals">
            <label>réference categorie<span style={{color: 'red'}}>*</span></label><br />
            <input type="text" className='input-eng' id='refcat' value={data.refcat} onChange={handleChangeData} />
        </div>
        <div className="constenu-modals">
            <label>Quantités produits<span style={{color: 'red'}}>*</span></label><br />
            <input type="text" className='input-eng' id='qtecom' value={data.qtecom} onChange={handleChangeData} />
        </div>
        <div className="constenu-modals">
            <label>date commande<span style={{color: 'red'}}>*</span></label><br />
            <input type="date" className='input-eng' id='datecom' value={data.datecom} onChange={handleChangeData} />
        </div>
        <div className="constenu-modals">
            <button type='submit' className='eng'>Enregistrer</button>
        </div>
    </form>
    </div>
    </div>
  )
}

export default AjoutTableCommande