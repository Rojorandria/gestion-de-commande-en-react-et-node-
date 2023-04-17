import Axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function ModalCat({closeModal, raffraichir}) {
    // console.log(closeModal)

    const [data, setData] = useState({
        nomcat: '',
        taille: '',
        prix: '',
        refproduit:'',
        
    })
    const handleChangeData = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    }
    const handleSendData = async(e) => {
        e.preventDefault()
        
        try{
            const reponse = await Axios.post("http://localhost:3001/categorie/addCategorie",{...data})
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
                <h2>Nouvelle Categorie</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSendData} autoComplete='off'>
                    <div className="constenu-modal">
                        <label>Nom categorie<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='nomcat' value={data.nomcat} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>taille<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='taille' value={data.taille} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>Prix<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='prix' value={data.prix} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>Reference produits<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='refproduit' value={data.refproduit} onChange={handleChangeData} />
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

export default ModalCat