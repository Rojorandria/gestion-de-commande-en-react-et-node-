import Axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function ModalEtab({closeModal, raffraichir}) {
    // console.log(closeModal)

    const [data, setData] = useState({
        nomprod: ''
    })
    const handleChangeData = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    }
    const handleSendData = async(e) => {
        e.preventDefault()
        
        try{
            const reponse = await Axios.post("http://localhost:3001/produits/addProduits",{...data})
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
                <span className="icons" onClick={closeModal}>button</span>
            </div>
            <div className="modal-titre">
                <h2>Nouvelle Produits</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSendData} autoComplete='off'>
                    <div className="constenu-modal">
                        <label>Nom produit<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='nomprod' value={data.nomprod} onChange={handleChangeData} />
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

export default ModalEtab