import Axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
function ModalMateriel({closeModal, raffraichir}) {

    const [data, setData] = useState({
        nomvend: '',
        prenomvend: '',
        telephone: ''
    })

    const handleChangeData = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    }
    const handleSendData = async(e) => {
        e.preventDefault()
        
        try{
            const reponse = await Axios.post("http://localhost:3001/vendeur/addVendeur",{...data})
            toast.success(reponse.data.message)

        console.log({...data})
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
                <h2>Nouvelle Vendeur</h2>
            </div>
            <div className="modal-body">
                <form autoComplete='off' onSubmit={handleSendData}>
                    <div className="constenu-modal">
                        <label>Nom vendeur<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='nomvend' value={data.nomvend} onChange={handleChangeData} />
                    </div>
                    <div className="constenu-modal">
                        <label>Prenom vend<span style={{color: 'red'}}>*</span></label><br />
                        <input type="text" id='prenomvend' value={data.prenomvend} onChange={handleChangeData}/>
                    </div>
                    <div className="constenu-modal">
                        <label>telephone<span style={{color: 'red'}}>*</span></label><br />
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

export default ModalMateriel