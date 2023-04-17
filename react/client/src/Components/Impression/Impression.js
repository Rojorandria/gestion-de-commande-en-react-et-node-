
import Img from '../../Image/drapeau.png'
import './style.css'
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from "react-icons/fa";
import img from '../../Image/rado.png'
  import React, { Fragment, useRef, useState } from 'react';

function Impression({commande}) {

  const total = commande.qtecom*commande.prix;
  const pdf = useRef(null)
  const imprimer = useReactToPrint({
    content : () => pdf.current,
    documentTitle : 'emp-data',
});
  return(
    <div >
    <div ref={pdf} className='impression-cotenu'>
      <div className='img'>
        <img src={img} alt='' className='img_contenu' />
      </div>
      <div className='en-tete'>
        <div className='paragraph-entete'>
          <p>
            Fabrication de vetement et autre, de bonneterie <br />
            <span className='espace'>et commerce de textiles, habillemnt</span><br />
            tel +261 98 698 35/ +261 34 05 810 26<br/>
            <span className='espace'>Facebook Zébu Madagascar</span><br/>
            email: zebudemadagascar@gmail.com<br />
          </p>
        </div>
        <div>
          <p>NIF :2 003 312 501<br />
          N° STAT : 14302 11 2019 0 01924 <br />
          CIF ou CIS: 00 76 65 8/ DGI-G du 13/30/09
          </p>
        </div>
      </div>
      <div className='paragraph_suite'>
        <p>
          Numero client: {commande.numcli} <br />
          Au nom de : {commande.nomcli}
        </p>
      </div>
      <table className='contenu-table'>
        <thead>
          <tr>
            <th>Numero commande</th>
            <th>Nom produit</th>
            <th>Categorie</th>
            <th>taille</th>
            <th>quantité com</th>
            <th>Prix</th>
            <th>Total</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{commande.numcom}</td>
            <td>{commande.nomprod}</td>
            <td>{commande.nomcat}</td>
            <td>{commande.taille}</td>
            <td>{commande.qtecom}</td>
            <td>{commande.prix}</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
      <div className='date_sortis'>
        <p>Total payer {total}.</p>
      </div>
    </div>
      <button onClick={imprimer}><FaFilePdf /> Imprimer</button>
    </div>
  );
}
export default Impression;