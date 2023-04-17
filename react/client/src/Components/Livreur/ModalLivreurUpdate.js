import Axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Formulaire from './FormulaireUpdateLivreur'

function ModalLivreurUpdate({closeModal, id,raffraichir}) {

    const [dataLivreur, setDataLivreur] = useState({})
    const [showForm, setShowForm] = useState(false)
    // console.log(dataClient)
    useEffect( () => {
        const fetchData = async () =>{
            const reponse = await Axios(
                `http://localhost:3001/livreur/chaqueLivreur/${id}`
            )
            setDataLivreur(reponse.data[0])
            setShowForm(true)
        }
        fetchData() 
    },[id])

  return (
    <Fragment>
    {
        showForm && (<Formulaire raffraichir = {raffraichir} closeModal={closeModal} id={id} dataLivreur = {dataLivreur} />)
    }
    </Fragment>
  )
}

export default ModalLivreurUpdate