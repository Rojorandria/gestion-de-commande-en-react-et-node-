import Axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Formulaire from './FormulaireUpdateClient'

function ModalClientUpdate({closeModal, id,raffraichir}) {

    const [dataClient, setData] = useState({})
    const [showForm, setShowForm] = useState(false)
    // console.log(dataClient)
    useEffect( () => {
        const fetchData = async () =>{
            const reponse = await Axios(
                `http://localhost:3001/client/chaqueClient/${id}`
            )
            setData(reponse.data[0])
            setShowForm(true)
        }
        fetchData() 
    },[id])

  return (
    <Fragment>
    {
        showForm && (<Formulaire raffraichir = {raffraichir} closeModal={closeModal} id={id} dataClient = {dataClient} />)
    }
    </Fragment>
  )
}

export default ModalClientUpdate