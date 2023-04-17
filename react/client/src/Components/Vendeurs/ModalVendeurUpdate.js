import Axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Formulaire from './FormulaireUpdateVendeur'

function ModalVendeurUpdate({closeModal, id,raffraichir}) {

    const [dataVend, setDataVend] = useState({})
    const [showForm, setShowForm] = useState(false)
    // console.log(dataClient)
    useEffect( () => {
        const fetchData = async () =>{
            const reponse = await Axios(
                `http://localhost:3001/vendeur/chaqueVendeur/${id}`
            )
            setDataVend(reponse.data[0])
            setShowForm(true)
        }
        fetchData() 
    },[id])

  return (
    <Fragment>
    {
        showForm && (<Formulaire raffraichir = {raffraichir} closeModal={closeModal} id={id} dataVend = {dataVend} />)
    }
    </Fragment>
  )
}

export default ModalVendeurUpdate