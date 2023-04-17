import { Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Cliente from "./Components/Cliente/Data";
import NouveauCommande from "./Components/Accueil/NouveauCommande/NouveauCommande";
import Main from "./Main";
import Accueil from "./Components/Accueil/Data"
import Livreur from "./Components/Livreur/Data"
import Vendeur from "./Components/Vendeurs/Data"
import Produits from "./Components/Produits/Data"
import Impression from "./Components/Impression";
import Logout from "./Components/Logout";
import Catergorie from "./Components/Categorie/Data"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjoutCommande from "./Components/Accueil/NouveauCommande/AjoutCommande";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/men" element={<Main />}>
          <Route path="/men/Cliente" element={<Cliente />} />
          <Route path="/men/Accueil" element={<Accueil />} />
          <Route path="/men/Vendeur" element={<Vendeur />} />
          <Route path="/men/Livreur" element={<Livreur />} />
          <Route path="/men/Impression" element={<Impression />} />
          <Route path="/men/Produit" element={<Produits />} />
          <Route path="/men/Logout" element={<Logout />} />
          <Route path="/men/Categorie" element={<Catergorie />} />
          <Route path="/men/commande/toutcommande" element={<NouveauCommande />} />
          <Route path="/men/NewCommande" element={<AjoutCommande />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
