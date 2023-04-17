import Axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Formulaire from './FormulaireUpdateCategorie'

function ModalCategorieUpdate({closeModal, id,raffraichir}) {

    const [dataCategorie, setData] = useState({})
    const [showForm, setShowForm] = useState(false)
    // console.log(dataCategorie)
    useEffect( () => {
        const fetchData = async () =>{
            const reponse = await Axios(
                `http://localhost:3001/categorie/chaqueCategorie/${id}`
            )
            setData(reponse.data[0])
            setShowForm(true)
        }
        fetchData() 
    },[id])

  return (
    <Fragment>
    {
        showForm && (<Formulaire raffraichir = {raffraichir} closeModal={closeModal} id={id} dataCategorie = {dataCategorie} />)
    }
    </Fragment>
  )
}

export default ModalCategorieUpdate