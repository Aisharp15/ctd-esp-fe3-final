import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";
import '../Styles/card.css';

const Card = ({ name, username, id }) => {

  const {state, dispatch} = useContext(ContextGlobal);

  const [addToFavOverlay, setAddToFavOverlay] = useState(false);
  const [removeFromFavOverlay, setRemoveFromFavOverlay] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCardHovered, setIsCardHovered] = useState(false);

  const isDentistInFavs = state.favs.some((dentist) => dentist.id === id);
  let delayShowDetails;

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
      handleShowErrorMessage("El dentista no se encuentra en favoritos.");
    }
    dispatch({ type: "favListUpdate", payload: updatedFavs });
  }

  const handleShowErrorMessage = (value) => {
    setErrorMessage(value);
    setShowErrorMessage(true);
    
    setAddToFavOverlay(false);
    setRemoveFromFavOverlay(false);
    setIsCardHovered(false);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 1500);
  }

  const handleAddToFavOverlay = () => {
    setAddToFavOverlay(true);

    setRemoveFromFavOverlay(false);
    setShowErrorMessage(false);
    setIsCardHovered(false);

    setTimeout(() => {
      setAddToFavOverlay(false);
    }, 1500);
  };

  const handleRemoveFromFavOverlay = () => {
    setRemoveFromFavOverlay(true);

    setAddToFavOverlay(false);
    setShowErrorMessage(false);
    setIsCardHovered(false);

    setTimeout(() => {
      setRemoveFromFavOverlay(false);
    }, 1500);
  };

  const handleMouseEnter = () => {
    delayShowDetails = setTimeout(() => {
      setIsCardHovered(true);

      setAddToFavOverlay(false)
      setRemoveFromFavOverlay(false);
      setShowErrorMessage(false);
    }, 700)

  }
  const handleMouseLeave = () => {
    clearTimeout(delayShowDetails);
    setIsCardHovered(false);
  }

  useEffect(() => {
    return () => clearTimeout(delayShowDetails)
  }, []);

  const addToFavOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: addToFavOverlay ? '100%' : 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    background: "rgba(59, 177, 67, 0.7)",
    backdropFilter: "blur(9px)",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const removeFromFavOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: removeFromFavOverlay ? '100%' : 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    background: "rgba(128, 0, 0, 0.7)",
    backdropFilter: "blur(9px)",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const seeDetailsOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: isCardHovered ? '100%' : 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(9px)",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const errorMessageStyle = {
    position: 'absolute',
    margin: 'auto',
    width: '100%',
    height: 'auto',
    padding: showErrorMessage ? '15px 0' : 0,
    textAlign: "center",
    opacity:  showErrorMessage ? 1 : 0,
    background: "rgba(255, 193, 7, 0.7)",
    backdropFilter: "blur(9px)",
    transition: 'all 0.2s ease'
  }

  return (
    <div className="card">
      <div className="card-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={`/dentist/${id}`}>    
          <img src="/images/doctor.jpg" alt="doctors pic" />
          <p>{name}</p>
          <p>{username}</p>
          <div style={seeDetailsOverlayStyle} className="see-details-overlay">
            {isCardHovered && <p>Ver detalles</p>}
          </div>
        </Link>
        <div style={addToFavOverlayStyle} className="add-to-fav-overlay">
          {addToFavOverlay && <p>Agregado a favoritos con éxito</p>}
        </div>
        <div style={removeFromFavOverlayStyle} className="remove-from-fav-overlay">
          {removeFromFavOverlay && <p>Quitado de favoritos con éxito</p>}
        </div>
      </div>
      <div className="card-button-container">
        <button onClick={addFav} className="add-to-fav-button favButton">
          <img className="icon" src="/images/star-add-icon.svg" alt="add to fav icon"/>
        </button>
        <button onClick={removeFav} className="remove-from-fav-button favButton">
          <img className="icon" src="/images/star-remove-icon.svg" alt="remove from fav icon"/>
          </button>
      </div>
      <div style={errorMessageStyle} className="error-message-overlay">
        {showErrorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Card;
