import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";

const Card = ({ name, username, id }) => {

  const {state, dispatch} = useContext(ContextGlobal);

  const [addToFavOverlay, setAddToFavOverlay] = useState(false);
  const [removeFromFavOverlay, setRemoveFromFavOverlay] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isDentistInFavs = state.favs.some((dentist) => dentist.id === id);
  
  const addFav = () => {
    let updatedFavs;
    if (isDentistInFavs) {
      updatedFavs = state.favs;
      handleShowErrorMessage("El dentista ya se encuentra en favoritos.");
    } else {
      handleAddToFavOverlay();
      const dentistToAdd = state.data.find((dentist) => dentist.id === id);
      updatedFavs = [...state.favs, dentistToAdd];
    }
    dispatch({ type: "favListUpdate", payload: updatedFavs });
  };

  const removeFav = () => {
    let updatedFavs;
    if (isDentistInFavs) {
      handleRemoveFromFavOverlay();
      updatedFavs = state.favs.filter((dentist) => dentist.id !== id);
    } else {
      updatedFavs = state.favs;
      handleShowErrorMessage("El dentista no puede ser removido, ya que no se encuentra en favoritos.");
    }
    dispatch({ type: "favListUpdate", payload: updatedFavs });
  }

  const handleShowErrorMessage = (value) => {
    setShowErrorMessage(true);
    setErrorMessage(value);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  }

  const handleAddToFavOverlay = () => {
    setAddToFavOverlay(true);

    setTimeout(() => {
      setAddToFavOverlay(false);
    }, 1000);
  };

  const handleRemoveFromFavOverlay = () => {
    setRemoveFromFavOverlay(true);

    setTimeout(() => {
      setRemoveFromFavOverlay(false);
    }, 1000);
  };

  const addToFavOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height:  addToFavOverlay ? '100%' : 0,
    backgroundColor: '#3bb143',
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    zIndex: 1,
    transition: 'all 0.2s ease'
  };

  const removeFromFavOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: removeFromFavOverlay ? '100%' : 0,
    backgroundColor: '#800000',
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    zIndex: 1,
    transition: 'all 0.2s ease'
  };

  const errorMessageStyle = {
    position: 'absolute',
    margin: 'auto',
    width: '100%',
    height: 'auto',
    padding: '15px 0',
    opacity:  showErrorMessage ? 1 : 0,
    backgroundColor: '#ffc107',
    zIndex: 1,
    textAlign: "center",
    transition: 'all 0.2s ease'
  }

  return (
    <div className="card">
      <Link to={`/dentist/${id}`}>    
          <img src="/images/doctor.jpg" alt="doctors pic" />
          <p>{name}</p>
          <p>{username}</p>
      </Link>
      <div className="button-container">
        <button onClick={addFav} className="add-to-fav-button favButton">
          <img className="icon" src="/images/star-add-icon.svg" alt="add to fav icon"/>
        </button>
        <button onClick={removeFav} className="remove-from-fav-button favButton">
          <img className="icon" src="/images/star-remove-icon.svg" alt="remove from fav icon"/>
          </button>
      </div>
      
      <div style={errorMessageStyle} className="error-message-overlay">
        {showErrorMessage && <p >{errorMessage}</p>}
      </div>

      <div style={addToFavOverlayStyle} className="add-to-fav-overlay">
        {addToFavOverlay && <p>Agregado a favoritos con éxito</p>}
      </div>
      <div style={removeFromFavOverlayStyle} className="remove-from-fav-overlay">
        {removeFromFavOverlay && <p>Quitado de favoritos con éxito</p>}
      </div>
      

    </div>
  );
};

export default Card;
