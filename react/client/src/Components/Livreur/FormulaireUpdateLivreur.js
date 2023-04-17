import Axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Formulaire({closeModal, dataLivreur, id, raffraichir}) {

    console.log(dataLivreur)
    const [data, setData] = useState({
        nomlivr: dataLivreur.nomlivr,
        prenomlivr: dataLivreur.prenomlivr,
        telephone: dataLivreur.telephone
    })
    const handleChangeData = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    }
    const handleSendData = async(e) => {
        e.preventDefault()
        try{
            const reponse = await Axios.put(`http://localhost:3001/livreur/updateLivreur/${id}`,{...data})
            toast.success(reponse.data.message)
            raffraichir()
            closeModal()
        }
        catch(err){
            toast.error(err.response.data.message)
        }

    }
  return (
    <div className="modal">
        <div className="paragraph">
            <div className="style-icon">
                <span className="icons" onClick={closeModal}>X</span>
            </div>
            <div className="modal-titre">
                <h2>Nouvelle Client</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSendData} autoComplete='off' required>
                    <div className="constenu-modal">
                        <label>Nom livrent<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='nomlivr' value={data.nomlivr} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>Prénom livrent<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='prenomlivr' value={data.prenomlivr} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>Télephone<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='telephone' value={data.telephone} onChange={handleChangeData} />
                    </div>

                    <div className="modal-footer">
                        <button className="btn-modal cancel" onClick={closeModal}>Annuler</button>
                        <button type='submit' className="btn-modal valide">valider</button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default Formulaire